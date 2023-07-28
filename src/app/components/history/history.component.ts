import { Component, OnInit } from '@angular/core';
import { AnalyzerService } from 'src/app/shared/analyzer.service';
import { DatePipe } from '@angular/common';
import { GetAnalysisResponse } from 'src/app/models/get-analysis-response';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  items: GetAnalysisResponse[] = [];

  constructor(public analyzerService: AnalyzerService){}

  ngOnInit(): void {
    this.analyzerService.getAnalisys().subscribe((data: any) =>{
      const datePipe = new DatePipe('en-US');
      this.analyzerService.items = data.map(item => ({
        ...item,
        createdAt: datePipe.transform(item.createdAt, 'dd/MM/yyyy HH:mm')
      }));
    })
  }


  getAnalysis(url:string):void{
    this.analyzerService.postAnalysis(url).subscribe((data: any) => {
      this.analyzerService.analysis = {...data};
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
