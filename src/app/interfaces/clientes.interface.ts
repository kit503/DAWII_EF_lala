import { Base } from './base.interface';
import { Persona } from './persona.interface';
import { Ninos } from './ninos.interface';

export interface Clientes extends Base {
  persona: Persona;
  nino: Ninos;
}