import { Base } from './base.interface';
import { Persona } from './persona.interface';

export interface Empleado extends Base {
  persona: Persona;
}