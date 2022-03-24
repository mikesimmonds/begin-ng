import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './core/page-not-found.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  {
    path: 'layout',
    component: AppLayoutComponent,
    children: [{ path: ':id', component: AppComponent }],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
