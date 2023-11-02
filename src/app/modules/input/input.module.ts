import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { InputRoutingModule } from './input-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from '@app/shared/components/bread-crumb/breadcrumb.module';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    InputRoutingModule,
    ReactiveFormsModule,
    BreadcrumbModule
  ]
})
export class InputModule { }
