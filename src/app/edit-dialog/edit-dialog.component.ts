import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ClientesService } from '../services/clientes.service';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../models/cliente.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {

  editForm!: FormGroup;
  respuestaClientes!: Cliente[];
  dataSource!: MatTableDataSource<Cliente>;
  userId!: number;
  userDetails!: Cliente;
  private userIdToUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clienteServicio: ClientesService,
    private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente,
  ) {
    this.userDetails = data;
    console.log(`CONSO ${JSON.stringify(this.userDetails)}`);
  }
  
  ngOnInit() {
    // this.consultarClientes();
    this.editForm = this.fb.group({
      tipo_identificacion: [this.userDetails.tipo_identificacion_id],
      numero_identificacion: [this.userDetails.numero_identificacion],
      nombre: [this.userDetails.nombre],
      genero: [this.userDetails.genero_id],
    });
    
    this.editForm.get('tipo_identificacion')?.setValue(this.userDetails.tipo_identificacion_id);
    
    this.activatedRoute.params.subscribe(val => {
      this.userIdToUpdate = val['id'];
      if (this.userIdToUpdate) {
        this.isUpdateActive = true;
        this.clienteServicio.buscarCliente(this.userIdToUpdate)
        .subscribe({
          next: (res) => {
            this.fillFormToUpdate(res[0]);
          },
          error: (err) => {
              console.log(err);
            }
          })
        }
      })
    }
    
    fillFormToUpdate(user: Cliente) {
      this.editForm.setValue({
        tipo_identificacion: user.tipo_identificacion_id,
        numero_identificacion: user.numero_identificacion,
        nombre: user.nombre,
        genero: user.genero_id,
      })
    }
    
  submit(id: number) {
    this.editForm.value.tipo_identificacion = Number(this.editForm.value.tipo_identificacion)
    this.editForm.value.genero = Number(this.editForm.value.genero)
    console.log(this.editForm);
    this.clienteServicio.update(id, this.editForm.value)
      .subscribe(res => {
        console.log(JSON.stringify(res))
        this.editForm.reset();
        location. reload();
      });
  }
}
