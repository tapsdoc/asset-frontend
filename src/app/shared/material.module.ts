import {MatFormFieldModule} from "@angular/material/form-field";
import {NgModule} from "@angular/core";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";

const modules: any = [
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatSnackBarModule
]

@NgModule({
  imports: [modules],
  exports: [modules]
})
export class MaterialModule { }
