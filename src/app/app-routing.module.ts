import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PajacyzmyComponent} from './components/pajacyzmy/pajacyzmy.component';
import {MemyComponent} from './components/memy/memy.component';
import {JugoComponent} from './components/jugo/jugo.component';
import {SoundboardComponent} from './components/soundboard/soundboard.component';
import {PajacyzmComponent} from './components/pajacyzmy/pajacyzm/pajacyzm.component';
import {MemComponent} from './components/memy/mem/mem.component';
import {DeptComponent} from "./components/dept/dept.component";
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { DeptAccountComponent } from './components/dept/dept-account/dept-account.component';
import { CalendarComponent } from './components/calendar/calendar.component';

const routes: Routes = [
    { path: 'pajacyzmy', component: PajacyzmyComponent},
    { path: 'pajacyzm/:pajacyzmId', component: PajacyzmComponent, pathMatch: 'full'},
    { path: 'memy', component: MemyComponent },
    { path: 'mem/:memId', component: MemComponent, pathMatch: 'full' },
    { path: 'jugo', component: JugoComponent },
    { path: 'soundboard', component: SoundboardComponent },
    { path: 'dept', component: DeptComponent },
    { path: 'dept-account/:accountId', component: DeptAccountComponent, pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'calendar', component: CalendarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
