import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { PajacyzmyComponent } from './components/pajacyzmy/pajacyzmy.component';
import { MemyComponent } from './components/memy/memy.component';
import { JugoComponent } from './components/jugo/jugo.component';
import { SoundboardComponent } from './components/soundboard/soundboard.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAddressInterceptor } from './components/utils/interceptors/http-address-interceptor';
import { ErrorModalComponent } from './components/utils/error-modal/error-modal.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { PajacyzmComponent } from './components/pajacyzmy/pajacyzm/pajacyzm.component';
import { MemComponent } from './components/memy/mem/mem.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddMemeComponent } from './components/memy/add-meme/add-meme.component';
import { AddSoundboardComponent } from './components/soundboard/add-soundboard/add-soundboard.component';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { NgxCaptchaModule } from 'ngx-captcha';
import { Timer27Component } from './components/navigation-bar/timer27/timer27.component';
import { DeptComponent } from './components/dept/dept.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { NavBarService } from './services/comp/nav-bar.service';
import { AddDeptComponent } from './components/dept/add-dept/add-dept.component';
import { DeptAccountComponent } from './components/dept/dept-account/dept-account.component';
import { AddStatementComponent } from './components/dept/dept-account/add-statement/add-statement.component';
import { ConfirmDialogComponent } from './models/dialogs/confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent } from './models/dialogs/info-dialog/info-dialog.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { UserService } from './services/user/user.service';
import { CalendarService } from './services/comp/calendar.service';
import { DeptService } from './services/comp/dept.service';
import { JugoService } from './services/comp/jugo.service';
import { MemeService } from './services/comp/meme.service';
import { PajacyzmService } from './services/comp/pajacyzm.service';
import { SoundboardService } from './services/comp/soundboard.service';
import { LoadingDialogComponent } from './models/dialogs/loading-dialog/loading-dialog.component';
import { SnowComponent } from './components/navigation-bar/snow/snow.component';

@NgModule({
    declarations: [
        AppComponent,
        NavigationBarComponent,
        PajacyzmyComponent,
        MemyComponent,
        JugoComponent,
        SoundboardComponent,
        ErrorModalComponent,
        PajacyzmComponent,
        MemComponent,
        AddMemeComponent,
        AddSoundboardComponent,
        Timer27Component,
        DeptComponent,
        LoginComponent,
        RegisterComponent,
        AddDeptComponent,
        DeptAccountComponent,
        AddStatementComponent,
        ConfirmDialogComponent,
        InfoDialogComponent,
        CalendarComponent,
        LoadingDialogComponent,
        SnowComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        NgxPaginationModule,
        NgxAudioPlayerModule,
        ReactiveFormsModule,
        NgxCaptchaModule,
    ],
    providers: [
      UserService,
      PajacyzmService,
      MemeService,
      JugoService,
      SoundboardService,
      DeptService,
      CalendarService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpAddressInterceptor, multi: true },
        NavBarService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
