import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SolicitudAfiliacion,
  Cliente,
} from '../models';
import {SolicitudAfiliacionRepository} from '../repositories';

export class SolicitudAfiliacionClienteController {
  constructor(
    @repository(SolicitudAfiliacionRepository)
    public solicitudAfiliacionRepository: SolicitudAfiliacionRepository,
  ) { }

  @get('/solicitud-afiliacions/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to SolicitudAfiliacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof SolicitudAfiliacion.prototype.id,
  ): Promise<Cliente> {
    return this.solicitudAfiliacionRepository.cliente(id);
  }
}
