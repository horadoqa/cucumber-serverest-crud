# language: pt

Funcionalidade: CRUD de usuários - ServeRest
  Como consumidor da API ServeRest
  Quero gerenciar usuários
  Para validar as operações de cadastro, consulta, autenticação, atualização e exclusão

  Cenário: 1. Cadastrar usuário
    Dado que possuo os dados de um usuário válido
    Quando cadastro o usuário na API
    Então a resposta deve ter status 201
    E a mensagem deve ser "Cadastro realizado com sucesso"
    E o ID do usuário deve ser retornado

  Cenário: 2. Consultar usuário cadastrado
    Dado que existe um usuário cadastrado
    Quando consulto o usuário pelo ID
    Então a resposta deve ter status 200
    E os dados do usuário devem corresponder aos dados cadastrados

  Cenário: 3. Autenticar usuário
    Dado que existe um usuário cadastrado
    Quando realizo login com o email e senha do usuário
    Então a resposta deve ter status 200
    E a mensagem deve ser "Login realizado com sucesso"
    E o token de autorização deve ser retornado

  Cenário: 4. Atualizar nome do usuário
    Dado que existe um usuário cadastrado
    Quando atualizo o nome do usuário para "Hora do QA Atualizado"
    Então a resposta deve ter status 200
    E a mensagem deve ser "Registro alterado com sucesso"
    E o nome atualizado deve ser persistido na API

  Cenário: 5. Excluir usuário cadastrado
    Dado que existe um usuário cadastrado
    Quando excluo o usuário pelo ID
    Então a resposta deve ter status 200
    E a mensagem deve ser "Registro excluído com sucesso"
    E o usuário não deve mais existir na API