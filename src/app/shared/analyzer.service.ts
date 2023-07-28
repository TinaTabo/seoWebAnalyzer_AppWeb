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

  //-- Variable que almacena el último analisis recibido.
  analysis: PostAnalysisResponse = new PostAnalysisResponse(0,'','','',[],{},false,0,'',false);
  //-- Variable que almacena el historial de análisis.
  items: GetAnalysisResponse[] = [];


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

  //-- DELETE
  deleteAnalysis(id: number): Observable<Object>{
    return this.http.request('delete', this.url + "/" + id);
  }
}
