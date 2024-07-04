import { Base } from './base.interface';
import { Reservas } from './reservas.interface';
import { Tarifa } from './tarifa.interface';

export interface DetalleReserva extends Base {
  reserva: Reservas;
  tarifa: Tarifa;
}