import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { TopicComponent } from './topic.component';

const routes: Routes = [
  {
    path: '',
    component: TopicComponent,
    children: [{ path: 'list', component: ListComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicRoutingModule {}
