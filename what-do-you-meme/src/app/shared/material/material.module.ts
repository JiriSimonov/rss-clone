import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [],
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatDialogModule],
  exports: [MatInputModule, MatFormFieldModule, MatButtonModule, MatRadioModule, MatDialogModule]
})
export class MaterialModule {}
