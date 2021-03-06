import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {DetallePedido} from './detalle-pedido.model';
import {Proveedor} from './proveedor.model';

//Se genera el modelo producto con sus respectivas propiedades

@model()
export class Producto extends Entity {
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
    type: 'number',
    required: true,
  })
  precioRegular: number;

  @property({
    type: 'number',
    required: true,
  })
  precioVenta: number;


  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  //Se crea las diferentes relaciones del moldelo producto con otros modelos
  @belongsTo(() => Proveedor)
  proveedorId: string;

  @hasMany(() => DetallePedido)
  detallePedidos: DetallePedido[];

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
