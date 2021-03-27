import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { PajacyzmyComponent } from './components/menu/pajacyzmy/pajacyzmy.component';
import { MemyComponent } from './components/menu/memy/memy.component';
import { JugoComponent } from './components/menu/jugo/jugo.component';
import { SoundboardComponent } from './components/menu/soundboard/soundboard.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PajacyzmyComponent,
    MemyComponent,
    JugoComponent,
    SoundboardComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
