import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { AnalysisState } from './states/analyzerStates';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserComponent } from './components/browser/browser.component';
import { HistoryComponent } from './components/history/history.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { DatePipe } from '@angular/common';
import { AnalysisPageComponent } from './pages/analysis-page/analysis-page.component';

@NgModule({
  declarations: [
    AppComponent,
    BrowserComponent,
    HistoryComponent,
    AnalysisComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ReportsComponent,
    AnalysisPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxsModule.forRoot([
      AnalysisState
    ])
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
