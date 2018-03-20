import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NewsComponent } from './components/news/news.component';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsPreviewComponent } from './components/news-preview/news-preview.component';
import { NewsFormComponent } from './components/news-form/news-form.component';
import { SpinLoaderComponent } from './components/spin-loader/spin-loader.component';
import { HoroscopeFormComponent } from './components/horoscope-form/horoscope-form.component';
import { NewsService } from './services/news.service';
import { HoroscopeService } from './services/horoscope.service';
import { HoroscopeComponent } from './components/horoscope/horoscope.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentComponent } from './components/comment/comment.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { CommentService } from './services/comment.service';
import { WeatherReportListComponent } from './components/weather-report-list/weather-report-list.component';
import { WeatherReportComponent } from './components/weather-report/weather-report.component';
import { WeatherReportFormComponent } from './components/weather-report-form/weather-report-form.component';
import { WeatherReportPreviewComponent } from './components/weather-report-preview/weather-report-preview.component';
import { WeatherReportService } from './services/weather-report.service';
import { ContactService } from './services/contact.service';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { ContactComponent } from './components/contact/contact.component';
import { MyAutofocusDirective } from './directives/my-autofocus.directive';
import { PicturesComponent } from './components/pictures/pictures.component';
import { VideosComponent } from './components/videos/videos.component';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DummyComponent } from './components/dummy/dummy.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'news', component: NewsListComponent },
  { path: 'news/:id', component: NewsComponent },
  { path: 'edit_news/:id', component: NewsFormComponent},
  { path: 'add_news', component: NewsFormComponent },
  { path: 'horoscope', component: HoroscopeComponent },
  { path: 'add_horoscope', component: HoroscopeFormComponent },
  { path: 'edit_horoscope/:id', component: HoroscopeFormComponent },
  { path: 'weather_report', component: WeatherReportListComponent },
  { path: 'weather_report/:id', component: WeatherReportComponent },
  { path: 'edit_weather_report/:id', component:  WeatherReportFormComponent },
  { path: 'add_weather_report', component:  WeatherReportFormComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'pictures', component: PicturesComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'dummy', component: DummyComponent },
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    NavbarComponent,
    NewsComponent,
    NewsListComponent,
    NewsPreviewComponent,
    NewsFormComponent,
    SpinLoaderComponent,
    HoroscopeFormComponent,
    HoroscopeComponent,
    CommentListComponent,
    CommentComponent,
    AddCommentComponent,
    WeatherReportListComponent,
    WeatherReportComponent,
    WeatherReportFormComponent,
    WeatherReportPreviewComponent,
    HomepageComponent,
    CommentFormComponent,
    ContactComponent,
    MyAutofocusDirective,
    PicturesComponent,
    VideosComponent,
    DummyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot(
      appRoutes
    ),
    ToastModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [ AuthService, NewsService, HoroscopeService, CommentService, WeatherReportService, ContactService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
