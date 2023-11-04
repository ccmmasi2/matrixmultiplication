import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: 'input',
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'view/:id',
        component: ViewComponent,
      },
      {
        path: 'create',
        component: CreateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputRoutingModule { }
