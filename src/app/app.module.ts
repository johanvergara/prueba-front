import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { RegistrationDialogComponent } from './registration-dialog/registration-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    RegistrationDialogComponent,
    EditDialogComponent,
  ],
  imports: [
    MatSelectModule,
    MatDialogModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  // entryComponents: [RegistrationDialogComponent],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent, ClientesComponent],
})
export class AppModule { }
