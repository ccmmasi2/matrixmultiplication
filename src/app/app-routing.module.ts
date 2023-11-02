import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [ 
  {
    path: 'input',
    loadChildren: () =>
      import('@modules/input/input.module').then((m) => m.InputModule),
  }, 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
