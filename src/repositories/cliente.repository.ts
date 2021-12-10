import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Pedido, Mascota, SolicitudAfiliacion} from '../models';
import {PedidoRepository} from './pedido.repository';
import {MascotaRepository} from './mascota.repository';
import {SolicitudAfiliacionRepository} from './solicitud-afiliacion.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Cliente.prototype.id>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Cliente.prototype.id>;

  public readonly solicitudAfiliacions: HasManyRepositoryFactory<SolicitudAfiliacion, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('SolicitudAfiliacionRepository') protected solicitudAfiliacionRepositoryGetter: Getter<SolicitudAfiliacionRepository>,
  ) {
    super(Cliente, dataSource);
    this.solicitudAfiliacions = this.createHasManyRepositoryFactoryFor('solicitudAfiliacions', solicitudAfiliacionRepositoryGetter,);
    this.registerInclusionResolver('solicitudAfiliacions', this.solicitudAfiliacions.inclusionResolver);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
