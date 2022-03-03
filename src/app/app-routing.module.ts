import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PajacyzmyComponent} from './components/pajacyzmy/pajacyzmy.component';
import {MemyComponent} from './components/memy/memy.component';
import {JugoComponent} from './components/jugo/jugo.component';
import {SoundboardComponent} from './components/soundboard/soundboard.component';
import {PajacyzmComponent} from './components/pajacyzmy/pajacyzm/pajacyzm.component';
import {MemComponent} from './components/memy/mem/mem.component';
import {DeptComponent} from "./components/dept/dept.component";

const routes: Routes = [
    { path: 'pajacyzmy', component: PajacyzmyComponent},
    { path: 'pajacyzm/:pajacyzmId', component: PajacyzmComponent, pathMatch: 'full'},
    { path: 'memy', component: MemyComponent },
    { path: 'mem/:memId', component: MemComponent, pathMatch: 'full' },
    { path: 'jugo', component: JugoComponent },
    { path: 'soundboard', component: SoundboardComponent },
    { path: 'dept', component: DeptComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
