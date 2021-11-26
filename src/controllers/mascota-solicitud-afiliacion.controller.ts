import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Mascota,
  SolicitudAfiliacion,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaSolicitudAfiliacionController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/solicitud-afiliacion', {
    responses: {
      '200': {
        description: 'Mascota has one SolicitudAfiliacion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SolicitudAfiliacion),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SolicitudAfiliacion>,
  ): Promise<SolicitudAfiliacion> {
    return this.mascotaRepository.solicitudAfiliacion(id).get(filter);
  }

  @post('/mascotas/{id}/solicitud-afiliacion', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudAfiliacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudAfiliacion, {
            title: 'NewSolicitudAfiliacionInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) solicitudAfiliacion: Omit<SolicitudAfiliacion, 'id'>,
  ): Promise<SolicitudAfiliacion> {
    return this.mascotaRepository.solicitudAfiliacion(id).create(solicitudAfiliacion);
  }

  @patch('/mascotas/{id}/solicitud-afiliacion', {
    responses: {
      '200': {
        description: 'Mascota.SolicitudAfiliacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudAfiliacion, {partial: true}),
        },
      },
    })
    solicitudAfiliacion: Partial<SolicitudAfiliacion>,
    @param.query.object('where', getWhereSchemaFor(SolicitudAfiliacion)) where?: Where<SolicitudAfiliacion>,
  ): Promise<Count> {
    return this.mascotaRepository.solicitudAfiliacion(id).patch(solicitudAfiliacion, where);
  }

  @del('/mascotas/{id}/solicitud-afiliacion', {
    responses: {
      '200': {
        description: 'Mascota.SolicitudAfiliacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudAfiliacion)) where?: Where<SolicitudAfiliacion>,
  ): Promise<Count> {
    return this.mascotaRepository.solicitudAfiliacion(id).delete(where);
  }
}
