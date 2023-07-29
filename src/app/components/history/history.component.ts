import { Component, OnInit } from '@angular/core';
import { AnalyzerService } from 'src/app/shared/analyzer.service';
import { DatePipe } from '@angular/common';
import { GetAnalysisResponse } from 'src/app/models/get-analysis-response';
import { PostAnalysisResponse } from 'src/app/models/post-analysis-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  items: GetAnalysisResponse[] = [];
  limit = 15;  //-- Valor por defecto

  constructor(public analyzerService: AnalyzerService, public router: Router){}

  ngOnInit(): void {
    this.updateLimit();
  }

  updateLimit(): void {
    this.analyzerService.getAnalisys(this.limit).subscribe((data: any) =>{
      const datePipe = new DatePipe('en-US');
      this.analyzerService.items = data.map(item => ({
        ...item,
        createdAt: datePipe.transform(item.createdAt, 'dd/MM/yyyy HH:mm')
      }));
    })
  }

  getAnalysis(url:string):void{
    this.analyzerService.postAnalysis(url).subscribe((data: PostAnalysisResponse) => {
      this.analyzerService.analysis = {...data};
      this.router.navigateByUrl('analisis');
    });
  }

  deleteAnalysis(id: number):void{
    this.analyzerService.deleteAnalysis(id).subscribe((data: any) => {
      if (data.code == 200) {
        //-- Eliminar el elemento del array de items.
        this.analyzerService.items = this.analyzerService.items.filter(item => item.id !== id);
      }
    })
  }
}

