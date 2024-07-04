import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clientes } from '../interfaces/clientes.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:9393/reserva-juegos-infantiles/api/v1/clientes';

  constructor(private http: HttpClient) { }

  getAllClientes(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(this.apiUrl);
  }

  getClienteById(id: number): Observable<Clientes> {
    return this.http.get<Clientes>(`${this.apiUrl}/${id}`);
  }

  createCliente(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(this.apiUrl, cliente);
  }

  updateCliente(cliente: Clientes): Observable<Clientes> {
    return this.http.put<Clientes>(`${this.apiUrl}/${cliente.id}`, cliente);
  }

  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Additional methods specific to clientes could be added here

  getClientesByNino(ninoId: number): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(`${this.apiUrl}/ninos/${ninoId}`);
  }
}