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

  //-- GET
  getAnalisys(limit: number = null): Observable<GetAnalysisResponse[]>{
    let getUrl = this.url;
    if(limit != null){
        getUrl += '?limit=' + limit;
    }
    return this.http.get<GetAnalysisResponse[]>(getUrl);
  }

  //-- POST
  postAnalysis(url: string): Observable<PostAnalysisResponse>{
    return this.http.post<PostAnalysisResponse>(this.url, { url })
  }
}
