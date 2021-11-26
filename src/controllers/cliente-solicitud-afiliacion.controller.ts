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
  Cliente,
  SolicitudAfiliacion,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteSolicitudAfiliacionController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/solicitud-afiliacions', {
    responses: {
      '200': {
        description: 'Array of Cliente has many SolicitudAfiliacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudAfiliacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SolicitudAfiliacion>,
  ): Promise<SolicitudAfiliacion[]> {
    return this.clienteRepository.solicitudAfiliacions(id).find(filter);
  }

  @post('/clientes/{id}/solicitud-afiliacions', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudAfiliacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudAfiliacion, {
            title: 'NewSolicitudAfiliacionInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) solicitudAfiliacion: Omit<SolicitudAfiliacion, 'id'>,
  ): Promise<SolicitudAfiliacion> {
    return this.clienteRepository.solicitudAfiliacions(id).create(solicitudAfiliacion);
  }

  @patch('/clientes/{id}/solicitud-afiliacions', {
    responses: {
      '200': {
        description: 'Cliente.SolicitudAfiliacion PATCH success count',
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
    return this.clienteRepository.solicitudAfiliacions(id).patch(solicitudAfiliacion, where);
  }

  @del('/clientes/{id}/solicitud-afiliacions', {
    responses: {
      '200': {
        description: 'Cliente.SolicitudAfiliacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudAfiliacion)) where?: Where<SolicitudAfiliacion>,
  ): Promise<Count> {
    return this.clienteRepository.solicitudAfiliacions(id).delete(where);
  }
}
