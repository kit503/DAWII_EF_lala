import { Base } from './base.interface';

export interface Persona extends Base {
  nombre: string;
  apellido: string;
  correo: string;
  direccion?: string;
  dni?: string;
  fechaNacimiento: Date;
  telefono: string;
}