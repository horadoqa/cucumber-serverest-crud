import {
  IWorldOptions,
  setWorldConstructor,
  World,
} from '@cucumber/cucumber';

import axios, { AxiosInstance, AxiosResponse } from 'axios';

export class UsuarioWorld extends World {
  api: AxiosInstance;

  response?: AxiosResponse;
  usuarioId?: string;

  usuario = {
    nome: 'Hora do QA',
    email: `horadoqa_${Date.now()}_${Math.random()
      .toString(36).slice(2, 8)}@qa.com.br`,
    password: '1q2w3e4r',
    administrador: 'true',
  };

  constructor(options: IWorldOptions) {
    super(options);

    this.api = axios.create({
      baseURL: 'https://serverest.dev',
      validateStatus: () => true,
    });
  }
}

setWorldConstructor(UsuarioWorld);