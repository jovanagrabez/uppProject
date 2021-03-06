import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { RepositoryService } from './services/repository/repository.service';
import { UserService } from './services/users/user.service';

import { RegistrationComponent } from './registration/registration.component';

import {Authorized} from './guard/authorized.guard';
import {Admin} from './guard/admin.guard';
import {Notauthorized} from './guard/notauthorized.guard';
import { NewMagazineComponent } from './new-magazine/new-magazine.component';
import { LoginComponent } from './login/login.component';
import {CanActivateServiceService} from './security/can-activate-service.service';
import {TokenInterceptorServiceService} from './security/token-interceptor-service.service';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { RegisterVerifyComponent } from './register-verify/register-verify.component';
import { TaskComponent } from './task/task.component';
import { DodajComponent } from './dodaj/dodaj.component';
import { CasopisListComponent } from './component/casopis-list/casopis-list.component';
import { DodavanjeRadaComponent } from './component/dodavanje-rada/dodavanje-rada.component';
import { TaskoviComponent } from './component/taskovi/taskovi.component';
import { ProvjeriRadComponent } from './component/provjeri-rad/provjeri-rad.component';
import { ProvjeriPdfComponent } from './component/provjeri-pdf/provjeri-pdf.component';
import { PrepravkaPodatakaComponent } from './component/prepravka-podataka/prepravka-podataka.component';
import { IzborRecenzenataComponent } from './component/izbor-recenzenata/izbor-recenzenata.component';

const ChildRoutes =
  [
  ]

  const RepositoryChildRoutes =
  [
    
  ]

const Routes = [
  {
    path: 'registrate',
    component: RegistrationComponent,
    canActivate: [Notauthorized]
  },
  {
    path: 'addNewMagazine',
    component: NewMagazineComponent,
    canActivate: [Notauthorized]
  }


]

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    NewMagazineComponent,
    LoginComponent,
    RegisterVerifyComponent,
    TaskComponent,
    DodajComponent,
    CasopisListComponent,
    DodavanjeRadaComponent,
    TaskoviComponent,
    ProvjeriRadComponent,
    ProvjeriPdfComponent,
    PrepravkaPodatakaComponent,
    IzborRecenzenataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(Routes),
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule,
    HttpModule
  ],
  providers:  [

    CanActivateServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorServiceService,
      multi: true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
