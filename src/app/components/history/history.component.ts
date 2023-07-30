import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { GetAnalysisResponse } from 'src/app/models/get-analysis-response';
import { PostAnalysisResponse } from 'src/app/models/post-analysis-response';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteHistory, GetHistory, HistoryState, SetAnalysis } from 'src/app/states/analyzerStates';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @Select(HistoryState) items$: Observable<GetAnalysisResponse[]>;
  limit = 15;  //-- Valor por defecto

  constructor(public store: Store, public router: Router){}

  ngOnInit(): void {
    this.updateLimit();
  }

  updateLimit(): void {
    this.store.dispatch(new GetHistory(this.limit));
  }

  getAnalysis(url:string):void{
    this.store.dispatch(new SetAnalysis(url)).subscribe(()=>{
      this.router.navigateByUrl('/analisis');
    });
  }

  deleteAnalysis(id: number):void{
    this.store.dispatch(new DeleteHistory(id));
  }
}

