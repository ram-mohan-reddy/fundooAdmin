import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthGuard as AuthGuardService } from './guards/auth.guard';
import { QuestionsComponent } from './components/questions/questions.component';

const routes: Routes = [
  { path: '',
    redirectTo: 'admin/login',
    pathMatch: 'full' 
  },
  { path: 'admin/login', component: AdminLoginComponent},
  { path: 'admin/home', component: AdminDashboardComponent,canActivate: [AuthGuardService]},
  { path: 'admin/approval', component: QuestionsComponent,canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
