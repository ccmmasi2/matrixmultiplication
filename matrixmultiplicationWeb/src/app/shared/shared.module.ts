import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { ActionsDialogComponent } from './components/actions-dialog/actions-dialog.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material/material/material.module';

@NgModule({
  declarations: [
    BreadCrumbComponent,
    ActionsDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    BreadCrumbComponent,
    ActionsDialogComponent
  ],
})
export class SharedModule { }
