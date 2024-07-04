import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Reservas } from '../interfaces/reservas.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrl = 'http://localhost:9393/reserva-juegos-infantiles/api/v1/reservas';

  constructor(private http: HttpClient) { }

  getAllReservas(): Observable<Reservas[]> {
    return this.http.get<Reservas[]>(this.apiUrl);
  }

  getReservaById(id: number): Observable<Reservas> {
    return this.http.get<Reservas>(`${this.apiUrl}/${id}`);
  }

/*   createReserva(reserva: Reservas): Observable<Reservas> {
    // Calculate duration before sending the request
    const reservaWithDuration = {
      ...reserva,
      duracionReserva: this.calculateDuration(reserva.horaInicio, reserva.horaFin)
    };
    return this.http.post<Reservas>(this.apiUrl, reservaWithDuration);
  } */

/*   createReserva(reserva: Reservas): Observable<Reservas> {
    const reservaWithDuration = {
      ...reserva,
      duracionReserva: this.calculateDuration(reserva.horaInicio, reserva.horaFin)
    };

    // Log the request payload
    console.log('Create Reserva Request Payload:', JSON.stringify(reservaWithDuration, null, 2));

    return this.http.post<Reservas>(this.apiUrl, reservaWithDuration).pipe(
      tap(response => console.log('Create Reserva Response:', response))
    );
  } */

  createReserva(reserva: Reservas): Observable<Reservas> {
    const reservaWithFormattedData = this.formatReservaData(reserva);

    console.log('Create Reserva Request Payload:', JSON.stringify(reservaWithFormattedData, null, 2));

    return this.http.post<Reservas>(this.apiUrl, reservaWithFormattedData).pipe(
      tap(response => console.log('Create Reserva Response:', response))
    );
  }


/* PARA DESPUÉS
   updateReserva(reserva: Reservas): Observable<Reservas> {
    const reservaWithFormattedData = this.formatReservaData(reserva);

    console.log('Update Reserva Request Payload:', JSON.stringify(reservaWithFormattedData, null, 2));

    return this.http.put<Reservas>(`${this.apiUrl}/${reserva.id}`, reservaWithFormattedData).pipe(
      tap(response => console.log('Update Reserva Response:', response))
    );
  } */

  updateReserva(reserva: Reservas): Observable<Reservas> {
    // Recalculate duration before updating
    const reservaWithDuration = {
      ...reserva,
      duracionReserva: this.calculateDuration(reserva.horaInicio, reserva.horaFin)
    };
    return this.http.put<Reservas>(`${this.apiUrl}/${reserva.id}`, reservaWithDuration);
  }

  deleteReserva(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // New method to calculate duration
  
  private formatReservaData(reserva: Reservas): Reservas {
    return {
      ...reserva,
      duracionReserva: this.formatTime(this.calculateDuration(reserva.horaInicio, reserva.horaFin)),
      horaInicio: this.formatTime(reserva.horaInicio),
      horaFin: this.formatTime(reserva.horaFin),
      tarifas: reserva.tarifas.filter(tarifa => tarifa !== null && typeof tarifa !== 'boolean')
    };
  }

  private calculateDuration(horaInicio: string, horaFin: string): string {
    const start = new Date(`1970-01-01T${horaInicio}`);
    const end = new Date(`1970-01-01T${horaFin}`);
    
    // If end time is before start time, assume it's the next day
    if (end < start) {
      end.setDate(end.getDate() + 1);
    }

    const diffMs = end.getTime() - start.getTime();
    const diffHrs = Math.floor(diffMs / 3600000); // hours
    const diffMins = Math.round((diffMs % 3600000) / 60000); // minutes

    return `${diffHrs.toString().padStart(2, '0')}:${diffMins.toString().padStart(2, '0')}`;
  }

  private formatTime(time: string): string {
    if (!time.includes(':')) return time;
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
  }

  // Additional methods specific to reservations could be added here

  getReservasByCliente(clienteId: number): Observable<Reservas[]> {
    return this.http.get<Reservas[]>(`${this.apiUrl}/clientes/${clienteId}`);
  }

  getReservasByEmpleado(empleadoId: number): Observable<Reservas[]> {
    return this.http.get<Reservas[]>(`${this.apiUrl}/empleados/${empleadoId}`);
  }

/*   getReservasByFecha(fecha: string): Observable<Reservas[]> {
    return this.http.get<Reservas[]>(`${this.apiUrl}/fecha/${fecha}`);
  } */
}