import {Entity, hasMany, model, property} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Pedido} from './pedido.model';
import {SolicitudAfiliacion} from './solicitud-afiliacion.model';

//Se genera el modelo cliente con cada una de sus propiedades
@model()
export class Cliente extends Entity {
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
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  rol: string;

//Se crea las diferentes relaciones del moldelo cliente con otros modelos

  @hasMany(() => Pedido)
  pedidos: Pedido[];

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  @hasMany(() => SolicitudAfiliacion)
  solicitudAfiliacions: SolicitudAfiliacion[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
