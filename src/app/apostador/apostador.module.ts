import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderModule } from '../app-header/app-header.module';
import { ApostadorSignupComponent } from './apostador-signup/apostador-signup.component';
import { ApostadorLoginComponent } from './apostador-login/apostador-login.component';
import { ApostadorComponent } from './apostador.component';
import { ApostadorCreateComponent } from './apostador-create/apostador-create.component';
import { ApostadorEditComponent } from './apostador-edit/apostador-edit.component';
import { ApostadorListComponent } from './apostador-list/apostador-list.component';
import { ApostadorDetailComponent } from './apostador-detail/apostador-detail.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule, AppHeaderModule, ReactiveFormsModule
  ],
  declarations: [ApostadorSignupComponent, ApostadorLoginComponent, ApostadorComponent, ApostadorCreateComponent, ApostadorEditComponent, ApostadorListComponent, ApostadorDetailComponent],
  exports: [ApostadorSignupComponent, ApostadorLoginComponent, ApostadorComponent, ApostadorCreateComponent, ApostadorEditComponent, ApostadorListComponent, ApostadorDetailComponent]
})
export class ApostadorModule { }
