import {belongsTo, Entity, hasMany, model, property, hasOne} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {ConsultaVeterinaria} from './consulta-veterinaria.model';
import {Empleado} from './empleado.model';
import {PagoPlanes} from './pago-planes.model';
import {SolicitudAfiliacion} from './solicitud-afiliacion.model';

//Se genera el modelo mascota con sus propiedades respectivas
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
    type: 'string',
    required: true,
  })
  estado: string;

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
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaSolicitud: string;

  //Se crea las diferentes relaciones del moldelo mascota con otros modelos
  @belongsTo(() => Empleado)
  empleadoId: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasMany(() => PagoPlanes)
  pagoPlanes: PagoPlanes[];

  @hasMany(() => ConsultaVeterinaria)
  consultaVeterinarias: ConsultaVeterinaria[];

  @hasOne(() => SolicitudAfiliacion)
  solicitudAfiliacion: SolicitudAfiliacion;

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
