import { Base } from './base.interface';
import { Persona } from './persona.interface';

export interface Ninos extends Base {
  persona: Persona;
  parentesco: string;
}