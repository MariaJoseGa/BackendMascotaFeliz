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
  Mascota,
} from '../models';
import {SolicitudAfiliacionRepository} from '../repositories';

export class SolicitudAfiliacionMascotaController {
  constructor(
    @repository(SolicitudAfiliacionRepository)
    public solicitudAfiliacionRepository: SolicitudAfiliacionRepository,
  ) { }

  @get('/solicitud-afiliacions/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to SolicitudAfiliacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof SolicitudAfiliacion.prototype.id,
  ): Promise<Mascota> {
    return this.solicitudAfiliacionRepository.mascota(id);
  }
}
