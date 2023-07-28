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

  constructor(private analyzerService: AnalyzerService){}

  ngOnInit(): void {
    this.getAnalysis();
  }

  getAnalysis():void{
    this.analyzerService.getAnalisys().subscribe((data: any) =>{
      const datePipe = new DatePipe('en-US');
      this.items = data.map(item => ({
        ...item,
        createdAt: datePipe.transform(item.createdAt, 'dd/MM/yyyy HH:mm')
      }));
    })
  }

  deleteAnalysis(id: number):void{
    this.analyzerService.deleteAnalysis(id).subscribe((data: any) => {
      console.log(data);
      if (data.code == 200) {
        //-- Eliminar el elemento del array de items.
        this.items = this.items.filter(item => item.id !== id);
      }
    })
  }
}
