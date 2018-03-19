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

const appRoutes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'news', component: NewsListComponent },
  { path: 'news/:id', component: NewsComponent },
  { path: 'edit_news/:id', component: NewsFormComponent},
  { path: 'add_news', component: NewsFormComponent },
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
    SpinLoaderComponent
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
  providers: [ AuthService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
