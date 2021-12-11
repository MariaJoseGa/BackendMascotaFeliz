import {Entity, model, property, hasMany} from '@loopback/repository';
import {PagoPlanes} from './pago-planes.model';

//Se genera el modelo plan con sus respectivas propiedades

@model()
export class Plan extends Entity {
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
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

 //Se crea las diferentes relaciones del moldelo plan con otros modelos
  @hasMany(() => PagoPlanes)
  pagoPlanes: PagoPlanes[];

  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;
