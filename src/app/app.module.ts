import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrainerPage } from './pages/trainer/trainer.page';
import { CataloguePage } from './pages/catalogue/catalogue.page';
import { LandingPage } from './pages/landing/landing.page';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    TrainerPage,
    CataloguePage,
    LandingPage,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: LandingPage },
      { path: 'trainer', component: TrainerPage},
      { path: 'catalogue', component: CataloguePage },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
