import {Entity, model, property, hasMany} from '@loopback/repository';
import {Producto} from './producto.model';
import {ConsultaVeterinaria} from './consulta-veterinaria.model';

//Se genera el modelo proveedor y sus respectivas propiedades

@model()
export class Proveedor extends Entity {
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
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

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

 //Se crea las diferentes relaciones del moldelo proveedor con otros modelos
  @hasMany(() => Producto)
  productos: Producto[];

  @hasMany(() => ConsultaVeterinaria)
  consultaVeterinarias: ConsultaVeterinaria[];

  constructor(data?: Partial<Proveedor>) {
    super(data);
  }
}

export interface ProveedorRelations {
  // describe navigational properties here
}

export type ProveedorWithRelations = Proveedor & ProveedorRelations;
