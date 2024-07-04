import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarifa } from '../interfaces/tarifa.interface';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {

  private apiUrl = 'http://localhost:9393/reserva-juegos-infantiles/api/v1/tarifas';

  constructor(private http: HttpClient) { }

  getAllTarifas(): Observable<Tarifa[]> {
    return this.http.get<Tarifa[]>(this.apiUrl);
  }

  getTarifaById(id: number): Observable<Tarifa> {
    return this.http.get<Tarifa>(`${this.apiUrl}/${id}`);
  }

  createTarifa(tarifa: Tarifa): Observable<Tarifa> {
    return this.http.post<Tarifa>(this.apiUrl, tarifa);
  }

  updateTarifa(tarifa: Tarifa): Observable<Tarifa> {
    return this.http.put<Tarifa>(`${this.apiUrl}/${tarifa.id}`, tarifa);
  }

  deleteTarifa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Additional methods specific to tarifas could be added here

  getTarifasByTipoEntrada(tipoEntrada: string): Observable<Tarifa[]> {
    return this.http.get<Tarifa[]>(`${this.apiUrl}/tipo-entrada/${tipoEntrada}`);
  }

  getTarifasByDiaSemana(diaSemana: string): Observable<Tarifa[]> {
    return this.http.get<Tarifa[]>(`${this.apiUrl}/dia-semana/${diaSemana}`);
  }
}