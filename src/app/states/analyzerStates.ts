import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store'; //-- Elemento clave de NGXS.
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PostAnalysisResponse } from '../models/post-analysis-response';
import { GetAnalysisResponse } from '../models/get-analysis-response';


//-- Estados del componente Browser --

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



//-- Estados del componente History

//-- Acción para obtener el historial
export class GetHistory{
    static readonly type = '[History] Get';
    constructor(public limit: number){}
}

//-- Acción para eliminar un análisis
export class DeleteHistory {
    static readonly type = '[History] Delete';
    constructor(public id: number) {}
}


//-- Estado
@State<GetAnalysisResponse[]>({
    name: 'history',
    defaults: []
})
@Injectable()

//-- Peticiones HTTP
export class HistoryState {
    private url = "http://localhost:8080/analisis";

    constructor(private http: HttpClient) {}

    @Action(GetHistory)
    getHistory(ctx: StateContext<GetAnalysisResponse[]>, action: GetHistory): Observable<any> {
        return this.http.get<GetAnalysisResponse[]>(`${this.url}?limit=${action.limit}`).pipe(
            tap((data: GetAnalysisResponse[]) => {
                ctx.setState(data);
            })
        );
    }

    @Action(DeleteHistory)
    deleteHistory(ctx: StateContext<GetAnalysisResponse[]>, action: DeleteHistory) {
        const state = ctx.getState();
        ctx.setState(state.filter(item => item.id !== action.id));
        return this.http.request('delete', this.url + "/" + action.id);
    }
}