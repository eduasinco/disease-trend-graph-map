import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './navbar/navbar.component';
import {PostComponent} from './post/post.component';
import {AppErrorHandler} from './common/app-error-handler';
import {DataService} from './services/data.service';
import {PostService} from './services/post/post.service';
import {PlotlyModule} from 'angular-plotly.js';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import {NouisliderModule} from 'ng2-nouislider';
import { MapComponent } from './post/map/map.component';

import { AgmCoreModule } from '@agm/core';
import {environment} from "../environments/environment.prod";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PostComponent,
    MapComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    PlotlyModule,
    NouisliderModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY,
      libraries: ['places']
    }),
    RouterModule.forRoot([
      {path: '', component: PostComponent},
    ]),
    FormsModule,
    NouisliderModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService,
    PostService,
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}