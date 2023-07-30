import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostAnalysisResponse } from 'src/app/models/post-analysis-response';
import { Observable } from 'rxjs';
import { AnalysisState, DeleteHistory } from 'src/app/states/analyzerStates';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {

  @Select(AnalysisState) analysis$: Observable<PostAnalysisResponse>;

  transformedTitles: any[] = [];
  currentAnalysis: PostAnalysisResponse;

  constructor(public store: Store, public router: Router) {}

  private transformObjectToArray(object: {[key: string]: number}): any[] {
    return Object.entries(object).map(([key, value]) => ({ key, value }));
  }

  ngOnInit(): void {
    this.analysis$.subscribe(analysis => {
      this.currentAnalysis = analysis;
      this.transformedTitles = this.transformObjectToArray(analysis.titles);
    });
  }

  deleteAnalysis(id: number): void {
    this.store.dispatch(new DeleteHistory(id)).subscribe(() => {
      this.router.navigateByUrl('/informes');
    });
  }
}
