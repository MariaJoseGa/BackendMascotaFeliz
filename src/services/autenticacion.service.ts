import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Cliente} from '../models';
import {ClienteRepository} from '../repositories';
import {Empleado} from '../models';
import {EmpleadoRepository} from '../repositories';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(ClienteRepository)
    public ClienteRepository: ClienteRepository,
    @repository(EmpleadoRepository)
    public EmpleadoRepository: EmpleadoRepository

  ) { }
  //Metodo para la generacion aleatoria de claves
  GenerarClave() {
    let clave = generador(8, false);
    return clave;
  }
  //Cifrado de claves
  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }
  //Cogigo para la autenticacion e identificacion del usuario cliente
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
//Cogigo para la autenticacion e identificacion del usuarios empleado
  IdentificarEmpleado(correo: string, clave: string) {
    try {
      let e = this.EmpleadoRepository.findOne({where: {email: correo, clave: clave}});
      if (e) {
        return e;
      }
      return false;
    }
    catch {
      return false;
    }
  }
// Codigo para generacion de Token para cliente
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

  // Codigo para generacion de Token para empleado
  GenerarTokenJWTEmpleado(empleado: Empleado) {
    let token = jwt.sign({
      data: {
        id: empleado.id,
        correo: empleado.email,
        nombres: empleado.nombre + " " + empleado.apellidos,
        rol: empleado.tipo
      }
    },
      Llaves.claveJWT);
    return token;
  }


  //Validacion de Token
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
