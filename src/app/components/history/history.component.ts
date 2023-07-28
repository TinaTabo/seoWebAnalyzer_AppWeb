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
    this.analyzerService.getAnalisys().subscribe((data: any) =>{
      const datePipe = new DatePipe('en-US');
      this.items = data.map(item => ({
        ...item,
        createdAt: datePipe.transform(item.createdAt, 'dd/MM/yyyy HH:mm')
      }));
    })
  }
}
