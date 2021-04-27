import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { PajacyzmyComponent } from './components/pajacyzmy/pajacyzmy.component';
import { MemyComponent } from './components/memy/memy.component';
import { JugoComponent } from './components/jugo/jugo.component';
import { SoundboardComponent } from './components/soundboard/soundboard.component';
import {RouterModule} from '@angular/router';
import { HttpService } from './services/http.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpAddressInterceptor} from './interceptors/http-address-interceptor';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { PajacyzmComponent } from './components/pajacyzmy/pajacyzm/pajacyzm.component';
import { MemComponent } from './components/memy/mem/mem.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddMemeComponent } from './components/memy/add-meme/add-meme.component';
import { SoundboardOneComponent } from './components/soundboard/soundboard-one/soundboard-one.component';
import { AddSoundboardComponent } from './components/soundboard/add-soundboard/add-soundboard.component';
import { NgxAudioPlayerModule } from 'ngx-audio-player';

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
    SoundboardOneComponent,
    AddSoundboardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgxPaginationModule,
    NgxAudioPlayerModule
    ],
  providers: [HttpService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpAddressInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddMemeComponent, AddSoundboardComponent]
})
export class AppModule { }
