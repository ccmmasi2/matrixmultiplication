import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home/home.component';

const routes: Routes = [ 
  {
    path: '',
    component: HomeComponent
  }, 
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
