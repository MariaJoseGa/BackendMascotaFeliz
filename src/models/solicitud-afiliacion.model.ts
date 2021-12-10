import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Cliente} from './cliente.model';

//Se genera el modelo solicitud-afiliacion y sus respectivas propiedades

@model()
export class SolicitudAfiliacion extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  petName: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  comentario: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

   //Se crea las diferentes relaciones del moldelo solicitud-afiliacion con otros modelos
  @belongsTo(() => Mascota)
  mascotaId: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  constructor(data?: Partial<SolicitudAfiliacion>) {
    super(data);
  }
}

export interface SolicitudAfiliacionRelations {
  // describe navigational properties here
}

export type SolicitudAfiliacionWithRelations = SolicitudAfiliacion & SolicitudAfiliacionRelations;
