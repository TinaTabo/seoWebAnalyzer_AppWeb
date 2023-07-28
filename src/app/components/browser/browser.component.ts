import { Component } from '@angular/core';
import { AnalyzerService } from 'src/app/shared/analyzer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent {
  //-- Variable para guardar la url de entrada.
  url: string = '';

  constructor(private analyzerService: AnalyzerService, public router: Router){}

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
    })
    this.router.navigateByUrl('/informes')
  }

}
