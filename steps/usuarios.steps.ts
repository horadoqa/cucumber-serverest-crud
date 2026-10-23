import {
  Given,
  When,
  Then,
} from '@cucumber/cucumber';

import assert from 'node:assert/strict';

import { UsuarioWorld } from '../support/world';

Given(
  'que possuo os dados de um usuário válido',
  async function (this: UsuarioWorld) {
    assert.ok(this.usuario.nome);
    assert.ok(this.usuario.email);
    assert.ok(this.usuario.password);
  },
);

Given(
  'que existe um usuário cadastrado',
  async function (this: UsuarioWorld) {
    const response = await this.api.post(
      '/usuarios',
      this.usuario,
    );

    assert.equal(response.status, 201);
    assert.ok(response.data._id);

    this.usuarioId = response.data._id;
  },
);

When(
  'cadastro o usuário na API',
  async function (this: UsuarioWorld) {
    this.response = await this.api.post(
      '/usuarios',
      this.usuario,
    );
  },
);

Then(
  'a resposta deve ter status {int}',
  function (this: UsuarioWorld, status: number) {
    assert.equal(this.response?.status, status);
  },
);

Then(
  'a mensagem deve ser {string}',
  function (this: UsuarioWorld, mensagem: string) {
    assert.equal(this.response?.data.message, mensagem);
  },
);

Then(
  'o ID do usuário deve ser retornado',
  function (this: UsuarioWorld) {
    const id = this.response?.data._id;

    assert.ok(id, 'O ID do usuário não foi retornado');

    this.usuarioId = id;
  },
);

When(
  'consulto o usuário pelo ID',
  async function (this: UsuarioWorld) {
    assert.ok(this.usuarioId);

    this.response = await this.api.get(
      `/usuarios/${this.usuarioId}`,
    );
  },
);

Then(
  'os dados do usuário devem corresponder aos dados cadastrados',
  function (this: UsuarioWorld) {
    const body = this.response?.data;

    assert.equal(body.nome, this.usuario.nome);
    assert.equal(body.email, this.usuario.email);
    assert.equal(body.password, this.usuario.password);
    assert.equal(
      body.administrador,
      this.usuario.administrador,
    );
  },
);

When(
  'realizo login com o email e senha do usuário',
  async function (this: UsuarioWorld) {
    this.response = await this.api.post('/login', {
      email: this.usuario.email,
      password: this.usuario.password,
    });
  },
);

Then(
  'o token de autorização deve ser retornado',
  function (this: UsuarioWorld) {
    const authorization = this.response?.data.authorization;

    assert.ok(authorization, 'Token não retornado');

    assert.match(
      authorization,
      /^Bearer\s+\S+/,
    );
  },
);

When(
  'atualizo o nome do usuário para {string}',
  async function (this: UsuarioWorld, novoNome: string) {
    assert.ok(this.usuarioId);

    this.response = await this.api.put(
      `/usuarios/${this.usuarioId}`,
      {
        ...this.usuario,
        nome: novoNome,
      },
    );
  },
);

Then(
  'o nome atualizado deve ser persistido na API',
  async function (this: UsuarioWorld) {
    assert.ok(this.usuarioId);

    const consulta = await this.api.get(
      `/usuarios/${this.usuarioId}`,
    );

    assert.equal(consulta.status, 200);
    assert.equal(
      consulta.data.nome,
      'Hora do QA Atualizado',
    );
  },
);

When(
  'excluo o usuário pelo ID',
  async function (this: UsuarioWorld) {
    assert.ok(this.usuarioId);

    this.response = await this.api.delete(
      `/usuarios/${this.usuarioId}`,
    );
  },
);

Then(
  'o usuário não deve mais existir na API',
  async function (this: UsuarioWorld) {
    assert.ok(this.usuarioId);

    const consulta = await this.api.get(
      `/usuarios/${this.usuarioId}`,
    );

    assert.equal(consulta.status, 400);

    assert.equal(
      consulta.data.message,
      'Usuário não encontrado',
    );
  },
);