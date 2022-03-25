import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './core/page-not-found.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/topic/list', pathMatch: 'full' },
  {
    path: 'layout',
    component: AppLayoutComponent,
    children: [{ path: ':id', component: AppComponent }],
  },
  {
    path: 'topic',
    loadChildren: () =>
      import('./topic/topic.module').then((m) => m.TopicModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
