import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAnalysisResponse } from '../models/get-analysis-response';
import { PostAnalysisResponse } from '../models/post-analysis-response';

@Injectable({
  providedIn: 'root'
})
export class AnalyzerService {

  //-- URL de la API REST
  private url = "http://localhost:8080/analisis";
  constructor(private http: HttpClient) {}

  //-- Métodos del servicio (Peticiones HTTP a la API REST)
  getAnalisys(limit: number = null): Observable<GetAnalysisResponse[]>{
    let getUrl = this.url;
    if(limit != null){
        getUrl += '?limit=' + limit;
    }
    return this.http.get<GetAnalysisResponse[]>(getUrl);
  }
}
