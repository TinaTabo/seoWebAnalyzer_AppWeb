import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {
  //-- Datos del analisis de prueba.
  analysisData: any = {
    id: 1,
    url: "http://webdeejemplo.com",
    title: "Titulo de ejemplo",
    description: "Ejemplo de descripción",
    keywords: ["uno", "dos", "tres"],
    titles: {
      h1: 2,
      h2: 3,
      h3: 5,
      h4: 9
    },
    html5: true,
    images: 8,
    createdAt: "2011-10-05T14:48:00.000Z"
  };

  constructor() {}

  ngOnInit(): void {
    // Convertimos 'titles' a una matriz
    this.analysisData.titles = Object.entries(this.analysisData.titles).map(([key, value]) => ({key, value}));
  }
}

