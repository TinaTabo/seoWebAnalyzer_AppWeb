import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store'; //-- Elemento clave de NGXS.
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PostAnalysisResponse } from '../models/post-analysis-response';

//-- Definición de acción, que será utilizada por NGXS para alterar el estado.
export class SetAnalysis {
    static readonly type = '[Analysis] Set'; //-- string que identifica la acción.
    constructor(public payload: string) {} //-- Datos que se transmiten mediante la acción, en este caso el resultado del análisis.
}


//-- Definición del estado en NGXS.
@State<PostAnalysisResponse>({
    name: 'analysis', //-- Nombre del estado.
    defaults: new PostAnalysisResponse(0, '', '', '', [], {}, false, 0, '', false) //-- valor predeterminado de los datos del estado.
})
@Injectable() //-- Marca la clase para que pueda utilizarse en otros componentes.

//-- Clase que inyecta el cliente HTTP de Angular para realizar peticiones HTTP.
export class AnalysisState {

    constructor(private http: HttpClient) {}

    private url = "http://localhost:8080/analisis";

    @Action(SetAnalysis) //-- Responder a la acción --> SetAnalysis.
    setAnalysis(ctx: StateContext<PostAnalysisResponse>, action: SetAnalysis): Observable<any> {
        //-- Realizar petición POST.
        return this.http.post<PostAnalysisResponse>(this.url, { url: action.payload }).pipe(
            //--  Con 'tap' se modifica el estado con la respuesta recibida.
            tap((data: PostAnalysisResponse) => {
                ctx.setState(data);
            })
        );
    }
}
