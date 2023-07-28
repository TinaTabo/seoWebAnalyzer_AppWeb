import { Component } from '@angular/core';
import { AnalyzerService } from 'src/app/shared/analyzer.service';
import { Router } from '@angular/router';
import { GetAnalysisResponse } from 'src/app/models/get-analysis-response';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent {
  //-- Variable para guardar la url de entrada.
  url: string = '';

  constructor(private analyzerService: AnalyzerService, public router: Router, private datePipe: DatePipe){}

  analyze():void{
    this.analyzerService.postAnalysis(this.url).subscribe((data: any)=>{
      this.analyzerService.analysis.id = data.id;
      this.analyzerService.analysis.url = data.url;
      this.analyzerService.analysis.title = data.title;
      this.analyzerService.analysis.description = data.description;
      this.analyzerService.analysis.keywords = data.keywords;
      this.analyzerService.analysis.titles = data.titles;
      this.analyzerService.analysis.html5 = data.html5;
      this.analyzerService.analysis.images = data.images;
      this.analyzerService.analysis.createdAt = data.createdAt;

      if (data.isNew == true) {
        let formattedDate = this.datePipe.transform(data.createdAt, 'dd/MM/yyyy HH:mm');
        let newAnalysis: GetAnalysisResponse = new GetAnalysisResponse(data.id,data.url,formattedDate);
        this.analyzerService.items.unshift(newAnalysis)
      }
    })
    this.router.navigateByUrl('/informes')
  }

}
