import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientesService } from '../services/clientes.service';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../models/cliente.model';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.css']
})
export class RegistrationDialogComponent implements OnInit {

  registrationForm!: FormGroup;
  respuestaClientes!: Cliente[];
  dataSource!: MatTableDataSource<Cliente>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegistrationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private clienteServicio: ClientesService,
  ) {}

  ngOnInit() {
    this.consultarClientes();
    this.registrationForm = this.fb.group({
      tipo_identificacion: [''],
      numero_identificacion: [''],
      nombre: [''],
      genero: [''],
    });
  }

  submit() {
    if (this.registrationForm.value.nombre == '' || this.registrationForm.value.numero_identificacion == '' || this.registrationForm.value.tipo_identificacion == '' || this.registrationForm.value.genero == '') {
      console.log(`eror`)
    } else {
      this.registrationForm.value.tipo_identificacion = Number(this.registrationForm.value.tipo_identificacion)
      this.registrationForm.value.genero = Number(this.registrationForm.value.genero)
      this.clienteServicio.registrarCliente(this.registrationForm.value)
        .subscribe(res => {
          console.log(res)
          this.registrationForm.reset();
          location. reload();
        });
    }
  }

  consultarClientes() {
    this.clienteServicio.buscarClientes().subscribe({
        next: (res) => {
          this.respuestaClientes = res;
          this.dataSource = new MatTableDataSource(this.respuestaClientes);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
}
