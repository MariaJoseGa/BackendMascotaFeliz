import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Empleado, Cliente, PagoPlanes, ConsultaVeterinaria, SolicitudAfiliacion} from '../models';
import {EmpleadoRepository} from './empleado.repository';
import {ClienteRepository} from './cliente.repository';
import {PagoPlanesRepository} from './pago-planes.repository';
import {ConsultaVeterinariaRepository} from './consulta-veterinaria.repository';
import {SolicitudAfiliacionRepository} from './solicitud-afiliacion.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly empleado: BelongsToAccessor<Empleado, typeof Mascota.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Mascota.prototype.id>;

  public readonly pagoPlanes: HasManyRepositoryFactory<PagoPlanes, typeof Mascota.prototype.id>;

  public readonly consultaVeterinarias: HasManyRepositoryFactory<ConsultaVeterinaria, typeof Mascota.prototype.id>;

  public readonly solicitudAfiliacion: HasOneRepositoryFactory<SolicitudAfiliacion, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('PagoPlanesRepository') protected pagoPlanesRepositoryGetter: Getter<PagoPlanesRepository>, @repository.getter('ConsultaVeterinariaRepository') protected consultaVeterinariaRepositoryGetter: Getter<ConsultaVeterinariaRepository>, @repository.getter('SolicitudAfiliacionRepository') protected solicitudAfiliacionRepositoryGetter: Getter<SolicitudAfiliacionRepository>,
  ) {
    super(Mascota, dataSource);
    this.solicitudAfiliacion = this.createHasOneRepositoryFactoryFor('solicitudAfiliacion', solicitudAfiliacionRepositoryGetter);
    this.registerInclusionResolver('solicitudAfiliacion', this.solicitudAfiliacion.inclusionResolver);
    this.consultaVeterinarias = this.createHasManyRepositoryFactoryFor('consultaVeterinarias', consultaVeterinariaRepositoryGetter,);
    this.registerInclusionResolver('consultaVeterinarias', this.consultaVeterinarias.inclusionResolver);
    this.pagoPlanes = this.createHasManyRepositoryFactoryFor('pagoPlanes', pagoPlanesRepositoryGetter,);
    this.registerInclusionResolver('pagoPlanes', this.pagoPlanes.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
  }
}
