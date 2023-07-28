import { Component } from '@angular/core';
import { AnalyzerService } from 'src/app/shared/analyzer.service';
import { Router } from '@angular/router';
import { GetAnalysisResponse } from 'src/app/models/get-analysis-response';
import { DatePipe } from '@angular/common';
import { PostAnalysisResponse } from 'src/app/models/post-analysis-response';

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
    this.analyzerService.postAnalysis(this.url).subscribe((data: PostAnalysisResponse)=>{
      this.analyzerService.analysis = {...data};

      if (data.isNew == true) {
        let formattedDate = this.datePipe.transform(data.createdAt, 'dd/MM/yyyy HH:mm');
        let newAnalysis: GetAnalysisResponse = new GetAnalysisResponse(data.id,data.url,formattedDate);
        this.analyzerService.items.unshift(newAnalysis);
      }
      this.router.navigateByUrl('/analisis');
    });
  }

}
