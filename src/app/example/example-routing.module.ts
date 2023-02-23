import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../core/page-not-found.component';
import { ExampleHomeComponent } from './example-home/example-home.component';
import { ExampleModalComponent } from './example-modal/example-modal.component';
import { ExampleComponent } from './example.component';

const routes: Routes = [
  { path: '', redirectTo: '/example', pathMatch: 'full' },
  {
    path: 'example',
    component: ExampleComponent,
    children: [
      { path: 'home', component: ExampleHomeComponent },
      { path: 'modal', component: ExampleModalComponent },

    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
