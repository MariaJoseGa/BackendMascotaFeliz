import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {SolicitudAfiliacion, SolicitudAfiliacionRelations, Mascota, Cliente} from '../models';
import {MascotaRepository} from './mascota.repository';
import {ClienteRepository} from './cliente.repository';

export class SolicitudAfiliacionRepository extends DefaultCrudRepository<
  SolicitudAfiliacion,
  typeof SolicitudAfiliacion.prototype.id,
  SolicitudAfiliacionRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof SolicitudAfiliacion.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof SolicitudAfiliacion.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(SolicitudAfiliacion, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}
