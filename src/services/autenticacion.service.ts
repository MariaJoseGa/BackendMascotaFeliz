import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Cliente} from '../models';
import {ClienteRepository} from '../repositories';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(ClienteRepository)
    public ClienteRepository: ClienteRepository

  ) { }

  GenerarClave() {
    let clave = generador(8, false);
    return clave;
  }
  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarPersona(correo: string, clave: string) {
    try {
      let p = this.ClienteRepository.findOne({where: {email: correo, clave: clave}});
      if (p) {
        return p;
      }
      return false;
    }
    catch {
      return false;
    }
  }

  GenerarTokenJWT(cliente: Cliente) {
    let token = jwt.sign({
      data: {
        id: cliente.id,
        correo: cliente.email,
        nombres: cliente.nombre + " " + cliente.apellidos,
        rol: cliente.rol
      }
    },
      Llaves.claveJWT);
    return token;
  }

  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    }
    catch {
      return false;
    }
  }

}
