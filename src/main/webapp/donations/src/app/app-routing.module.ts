import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MaintenanceComponent} from "./maintenance/maintenance.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'maintenance', component: MaintenanceComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}), CommonModule ],
  exports: [ RouterModule ],
  declarations: []
})

export class AppRoutingModule { }
