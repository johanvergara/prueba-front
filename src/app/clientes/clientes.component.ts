import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientesService } from '../services/clientes.service';
import { Cliente } from '../models/cliente.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

export interface Clientes {
  tipo_identificacion: number;
  numero_identificacion: string;
  nombre: string;
  genero: number;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {

  respuestaClientes!: Cliente[];
  dataSource!: MatTableDataSource<Cliente>;
  userId!: number;
  userDetails!: Cliente;

  displayedColumns: string[] = ['tipo_identificacion_id', 'numero_identificacion', 'nombre', 'genero_id', 'action'];

  constructor( 
    private clienteServicio: ClientesService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente,
  ) { }

  ngOnInit() {
    this.consultarClientes();
    
    this.activatedRoute.params.subscribe(val => {
      console.log(`ID ${JSON.stringify(val)}`)
      this.userId = val['id'];
      
    })
  }

  openDialog():void {
    const dialogRef = this.dialog.open(RegistrationDialogComponent, {
      data:'Creacion de Clientes'
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    })
  }

  openEditDialog(clienteId: number) {
    this.clienteServicio.buscarCliente(clienteId).subscribe({
      next: (res) => {
        this.userDetails = res[0];

        const dialogRef = this.dialog.open(EditDialogComponent, {
          data: this.userDetails
        });
        dialogRef.afterClosed().subscribe(res => {
          console.log(res);
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
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

  remove(clienteId: number) {
    let eliminado = 1
    
    Swal.fire({
      title: 'Estas seguro de eliminar el cliente?',
      text: "Estas eliminando el cliente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteServicio.remove(clienteId, eliminado).subscribe({
          next: (res) => {
            res
            location.reload();
          },
          error: (err) => {
            console.log(err);
          }
        });
        Swal.fire(
          'Eliminado!',
          'Tu cliente fue eliminado',
          'success'
        )
      }
    });


  }
}


function load(this: Window, ev: Event) {
  throw new Error('Function not implemented.');
}

