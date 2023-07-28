import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyzerService {

  //-- URL de la API REST
  private url = "http://localhost:8080/analisis";
  constructor(private http: HttpClient) {}

  //-- Métodos del servicio (Peticiones HTTP a la API REST)
  getAnalisys(limit: number = null): Observable<Object>{
    let getUrl = this.url;
    if(limit != null){
        getUrl += '?limit=' + limit;
    }
    return this.http.get(getUrl);
  }
}
