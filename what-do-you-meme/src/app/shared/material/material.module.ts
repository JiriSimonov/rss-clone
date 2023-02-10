import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  exports: [MatInputModule, MatFormFieldModule, MatButtonModule]
})
export class MaterialModule {}
