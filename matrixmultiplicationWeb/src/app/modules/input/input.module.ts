import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { InputRoutingModule } from './input-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { NumericInputDirective } from '@app/rules/numeric-input.directive';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    NumericInputDirective,
    ViewComponent
  ],
  imports: [
    CommonModule,
    InputRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    FormsModule,
  ],
})
export class InputModule { }
