import { Base } from './base.interface';
import { Clientes } from './clientes.interface';
import { Empleado } from './empleado.interface';
import { Tarifa } from './tarifa.interface';

export interface Reservas extends Base {
  cantidadAdultos: number;
  cantidadNinos: number;
  duracionReserva: string; // You might want to use a specific time library in Angular
  fecha: Date;
  horaFin: string; // You might want to use a specific time library in Angular
  horaInicio: string; // You might want to use a specific time library in Angular
  cliente: Clientes;
  empleado: Empleado;
  tarifas: Tarifa[];
}