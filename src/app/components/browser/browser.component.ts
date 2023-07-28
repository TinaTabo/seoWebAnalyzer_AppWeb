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
      console.log(data);
    })
    this.router.navigateByUrl('/informes')
  }

}
