import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MenuComponent} from './components/menu/menu.component';
import {PajacyzmyComponent} from './components/menu/pajacyzmy/pajacyzmy.component';
import {MemyComponent} from './components/menu/memy/memy.component';
import {JugoComponent} from './components/menu/jugo/jugo.component';
import {SoundboardComponent} from './components/menu/soundboard/soundboard.component';
import {PajacyzmComponent} from './components/menu/pajacyzmy/pajacyzm/pajacyzm.component';
import {MemComponent} from './components/menu/memy/mem/mem.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent, children: [
      { path: 'pajacyzmy', component: PajacyzmyComponent},
      { path: 'pajacyzm/:pajacyzmId', component: PajacyzmComponent, pathMatch: 'full'},
      { path: 'memy', component: MemyComponent },
      { path: 'mem/:memId', component: MemComponent, pathMatch: 'full' },
      { path: 'jugo', component: JugoComponent },
      { path: 'soundboard', component: SoundboardComponent },
    ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
