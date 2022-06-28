import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthComponent } from './auth.component';
import { TranslationModule } from '../i18n/translation.module';
import {RecaptchaModule } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { NgHcaptchaModule } from 'ng-hcaptcha';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    LogoutComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    RecaptchaModule,
    NgHcaptchaModule.forRoot({
      siteKey: '0be3d712-c7e8-4ffb-8045-7fd70e7ba3ed',
      languageCode: 'es' // optional, will default to browser language
  }),

  ],

})
export class AuthModule {}
