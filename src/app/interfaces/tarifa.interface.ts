import { Base } from './base.interface';

export interface Tarifa extends Base {
  diaSemana: string;
  duracion: number;
  precio: number;
  tipoEntrada: string;
}