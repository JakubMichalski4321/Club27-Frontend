import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { PajacyzmyComponent } from './components/menu/pajacyzmy/pajacyzmy.component';
import { MemyComponent } from './components/menu/memy/memy.component';
import { JugoComponent } from './components/menu/jugo/jugo.component';
import { SoundboardComponent } from './components/menu/soundboard/soundboard.component';
import {RouterModule} from '@angular/router';
import { HttpService } from './services/http.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpAddressInterceptor} from './interceptors/http-address-interceptor';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { PajacyzmComponent } from './components/menu/pajacyzmy/pajacyzm/pajacyzm.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PajacyzmyComponent,
    MemyComponent,
    JugoComponent,
    SoundboardComponent,
    ErrorModalComponent,
    PajacyzmComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [HttpService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpAddressInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
