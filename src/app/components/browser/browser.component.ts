import { Component } from '@angular/core';
import { AnalyzerService } from 'src/app/shared/analyzer.service';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent {
  //-- Variable para guardar la url de entrada.
  url: string = '';

  constructor(private analyzerService: AnalyzerService){}

  analyze():void{
    this.analyzerService.postAnalysis(this.url).subscribe((data: any)=>{
      console.log(data);
    })
  }

}
