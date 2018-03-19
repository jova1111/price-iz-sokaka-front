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

const appRoutes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'news', component: NewsListComponent },
  { path: 'news/:id', component: NewsComponent },
  { path: 'edit_news/:id', component: NewsFormComponent},
  { path: 'add_news', component: NewsFormComponent },
  { path: 'horoscope', component: HoroscopeComponent },
  { path: 'add_horoscope', component: HoroscopeFormComponent },
  { path: 'edit_horoscope/:id', component: HoroscopeFormComponent },
  { path: '',
    redirectTo: 'news',
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
    HoroscopeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [ AuthService, NewsService, HoroscopeService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
