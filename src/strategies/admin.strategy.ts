import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';

//Codigo de implementacion de la estrategia para identificar al usuario-Administrador
export class EstrategiaAdministrador implements AuthenticationStrategy {
  name: string = 'admin';

  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) { }

  //Metodo de autenticacion para ejecutar la estrategia de administrador
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request)
    if (token) {
      let datos = this.servicioAutenticacion.ValidarTokenJWT(token);
      if (datos) {
        let perfil: UserProfile = Object.assign({
          nombre: datos.data.nombres,
          rol: datos.data.rol
        });
        return perfil;
      }
      else {
        throw new HttpErrors[401]("El token incluido no es valido");
      }

    }
    else {
      throw new HttpErrors[401]("No se a incluido un token en la solicitud");
    }
  }
}

