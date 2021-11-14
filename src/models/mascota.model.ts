import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Empleado} from './empleado.model';
import {Cliente} from './cliente.model';
import {PagoPlanes} from './pago-planes.model';
import {ConsultaVeterinaria} from './consulta-veterinaria.model';

@model()
export class Mascota extends Entity {
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
    type: 'number',
    required: true,
  })
  estado: number;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  raza: string;

  @property({
    type: 'string',
    required: true,
  })
  sexo: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaNacimiento: string;

  @belongsTo(() => Empleado)
  empleadoId: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasMany(() => PagoPlanes)
  pagoPlanes: PagoPlanes[];

  @hasMany(() => ConsultaVeterinaria)
  consultaVeterinarias: ConsultaVeterinaria[];

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
