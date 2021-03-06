import {Entity, hasMany, model, property} from '@loopback/repository';
import {Mascota} from './mascota.model';

//Se genera el modelo empleado y sus respectivas propiedades
@model()
export class Empleado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;


  @property({
    type: 'string',
    required: false,
  })
  clave: string;


  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  //Se crea las diferentes relaciones del moldelo empleado con otros modelos
  //Solo se tiene una relacion que es de uno a muchos
  @hasMany(() => Mascota)
  mascotas: Mascota[];

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
