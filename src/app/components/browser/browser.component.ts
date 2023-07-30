import { Component } from '@angular/core';
import { AnalyzerService } from 'src/app/shared/analyzer.service';
import { Router } from '@angular/router';
import { GetAnalysisResponse } from 'src/app/models/get-analysis-response';
import { DatePipe } from '@angular/common';
import { PostAnalysisResponse } from 'src/app/models/post-analysis-response';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent {
  //-- Variable para guardar la url de entrada.
  url: string = '';
  //-- Variable para controlar si se está analizando una URL.
  isAnalyzing = false;
  //-- Variable para el mensaje si se produce un error.
  errorMessage: string | null = null;

  constructor(private analyzerService: AnalyzerService, public router: Router, private datePipe: DatePipe){}

  analyze():void{
    //-- Comienza el análisis.
    this.isAnalyzing = true;
    this.errorMessage = null;

    this.analyzerService.postAnalysis(this.url).pipe(
      catchError(error => {
        this.isAnalyzing = false;
        this.errorMessage = 'La URL proporcionada no es válida. ¡Prueba con otra!😉';
        return of(null); //-- Devuelve un observable nulo para finalizar la cadena.
      })
    ).subscribe((data: PostAnalysisResponse)=>{
      this.analyzerService.analysis = {...data};

      if (data.isNew == true) {
        let formattedDate = this.datePipe.transform(data.createdAt, 'dd/MM/yyyy HH:mm');
        let newAnalysis: GetAnalysisResponse = new GetAnalysisResponse(data.id,data.url,formattedDate);
        this.analyzerService.items.unshift(newAnalysis);
      }
      //-- Termina el análisis.
      this.isAnalyzing = false;
      this.router.navigateByUrl('/analisis');
    });
  }

}
