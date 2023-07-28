import { Component, OnInit } from '@angular/core';
import { PostAnalysisResponse } from 'src/app/models/post-analysis-response';
import { AnalyzerService } from 'src/app/shared/analyzer.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {

  //-- Variable para transformar el campo titles en un array iterable.
  transformedTitles: any[] = [];

  constructor(public analysisService: AnalyzerService) {}

  ngOnInit(): void {
    this.transformedTitles = this.transformObjectToArray(this.analysisService.analysis.titles);
  }

  private transformObjectToArray(object: {[key: string]: number}): any[] {
    return Object.entries(object).map(([key, value]) => ({ key, value }));
  }
}

