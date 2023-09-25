import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private clienteServicio = `${environment.server}/api/v1`;

  constructor( private http: HttpClient ) { }

  buscarClientes(){
    return this.http.get<Cliente[]>(`${ this.clienteServicio }/clientes`);
  }

  registrarCliente(registerObj: Cliente) {
    return this.http.post<Cliente>(`${this.clienteServicio}/clientes`, registerObj);
  }

  buscarCliente(clienteId: number) {
    return this.http.get<Cliente[]>(`${this.clienteServicio}/clientes/${clienteId}`);
  }

  update(clienteId: number, registerObj: Cliente) {
    return this.http.patch<Cliente[]>(`${this.clienteServicio}/clientes/${clienteId}`, registerObj);
  }

  remove(clienteId: number, estado:number) {
    return this.http.delete<Cliente[]>(`${this.clienteServicio}/clientes/${clienteId}/?eliminado=${estado}`);
  }

}
