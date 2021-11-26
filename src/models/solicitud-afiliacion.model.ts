import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Cliente} from './cliente.model';

@model()
export class SolicitudAfiliacion extends Entity {
  @property({
    type: 'date',
    required: true,
  })
  FechaSolicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  EstadoAfiliacion: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

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
