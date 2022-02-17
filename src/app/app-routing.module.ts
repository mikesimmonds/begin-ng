import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './core/page-not-found.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  {
    path: 'layout',
    component: LayoutComponent,
    children: [{ path: ':id', component: AppComponent }],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
