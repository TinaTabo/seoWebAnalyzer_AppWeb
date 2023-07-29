import { Component, OnInit } from '@angular/core';
import { AnalyzerService } from 'src/app/shared/analyzer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {

  //-- Variable para transformar el campo titles en un array iterable.
  transformedTitles: any[] = [];

  constructor(public analyzerService: AnalyzerService, public router: Router) {}

  ngOnInit(): void {
    this.transformedTitles = this.transformObjectToArray(this.analyzerService.analysis.titles);
  }

  private transformObjectToArray(object: {[key: string]: number}): any[] {
    return Object.entries(object).map(([key, value]) => ({ key, value }));
  }

  deleteAnalysis(id: number):void{
    this.analyzerService.deleteAnalysis(id).subscribe((data: any) => {
      if (data.code == 200) {
        console.log(data.message);
      }
      this.router.navigateByUrl('/informes')
    })
  }
}

