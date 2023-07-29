import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Store } from '@ngxs/store';
import { SetAnalysis } from 'src/app/states/analyzerStates';

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

  constructor(private store: Store, public router: Router, private datePipe: DatePipe) {}

  analyze(): void {
    //-- Comienza el análisis.
    this.isAnalyzing = true;

    //-- Suscripción al observable, una vez completada la acción, termina el analisis y navega a la ruta especificada.
    this.store.dispatch(new SetAnalysis(this.url)).subscribe(() => {
      //-- Termina el análisis.
      this.isAnalyzing = false;
      this.router.navigateByUrl('/analisis');
    });
  }
}
