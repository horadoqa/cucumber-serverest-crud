# Cucumber Serverest CRUD

Automação de testes de API utilizando **BDD (Behavior-Driven Development)** com Cucumber, TypeScript e Axios, validando as operações de gerenciamento de usuários da API [ServeRest](<https://serverest.dev/>).

O projeto demonstra como estruturar cenários de teste em **Gherkin**, implementar os passos com TypeScript e executar requisições HTTP sem utilizar ferramentas de automação de navegador.

## Objetivo

Implementar testes automatizados para validar as principais operações da API ServeRest, utilizando uma abordagem BDD para tornar os cenários mais legíveis, organizados e fáceis de manter.

## Tecnologias utilizadas

- **Node.js** — ambiente de execução JavaScript.
- **TypeScript** — tipagem estática e organização do código.
- **Cucumber** — execução dos cenários BDD escritos em Gherkin.
- **Axios** — realização de requisições HTTP à API.
- **Node.js Assert** — validação de status HTTP, mensagens e dados retornados.

## Cenários de teste

O projeto contempla cinco cenários principais:

| Operação | Descrição | Validações |
| --- | --- | --- |
| Create | Cadastrar usuário | Status HTTP 201, mensagem de sucesso e ID retornado |
| Read | Consultar usuário | Status HTTP 200 e correspondência dos dados |
| Login | Autenticar usuário | Status HTTP 200, mensagem de sucesso e token Bearer |
| Update | Atualizar nome do usuário | Status HTTP 200 e persistência da alteração |
| Delete | Excluir usuário | Status HTTP 200 e confirmação da exclusão |

Os cenários são descritos em Gherkin, utilizando palavras-chave em português, como `Dado`, `Quando`, `Então` e `E`.

## Estrutura do projeto

```
.
├── README.md
├── cucumber.js
├── 📁 features/
│   └── usuarios.feature
├── 📁 steps/
│   └── usuarios.steps.ts
├── 📁 support/
│   └── world.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

### Responsabilidade dos arquivos

- `features/usuarios.feature`: descreve os cenários de teste em Gherkin.
- `steps/usuarios.steps.ts`: implementa os passos e as validações dos cenários.
- `support/world.ts`: armazena os dados e o contexto de cada cenário.
- `cucumber.js`: configura a execução dos testes pelo Cucumber.
- `tsconfig.json`: define as configurações de compilação do TypeScript.
- `package.json`: declara as dependências e os comandos do projeto.

## Pré-requisitos

Antes de executar o projeto, instale:

- [Node.js](<https://nodejs.org/>)
- npm, incluído na instalação do Node.js.

## Instalação

1. Clone o repositório:

```bash
git clone [<URL_DO_REPOSITORIO>](https://github.com/horadoqa/cucumber-serverest-crud.git)
```

2. Entre na pasta do projeto:

```bash
cd cucumber-serverest-crud
```
3. Instale as dependências:

```bash
npm install
```

## Executando os testes

Para executar todos os cenários BDD, utilize:

```bash
npm run test:bdd
```

O Cucumber localizará os arquivos `.feature`, executará os passos definidos em TypeScript e apresentará o resultado no terminal.

### Resultado esperado

```bash

> cucumber-serverest-crud@1.0.0 test:bdd
> cucumber-js

........................

5 scenarios (5 passed)
24 steps (24 passed)
0m 2.550s (0m 2.483s executing your code)
```

O resultado acima representa uma execução em que todos os cinco cenários e seus 24 passos foram aprovados.

## Arquitetura da automação

O projeto está organizado em quatro componentes principais:

**1\. Feature — Gherkin**

Define o comportamento esperado da API em uma linguagem próxima à linguagem de negócio.

**2\. Step Definitions — TypeScript**

Relaciona os passos Gherkin às chamadas HTTP e às verificações automatizadas.

**3\. Axios — Cliente HTTP**

Realiza as requisições `POST`, `GET`, `PUT` e `DELETE` para a API ServeRest.

**4\. World — Contexto do cenário**

Mantém os dados utilizados durante cada cenário, como os dados do usuário, a resposta HTTP e o ID retornado pela API.

O módulo `node:assert/strict` é utilizado para verificar os resultados esperados.

## Independência dos cenários

Cada cenário possui seu próprio contexto de execução.

Nos cenários de consulta, atualização e exclusão, um usuário é cadastrado previamente para que a operação possa ser realizada. O cenário de login também utiliza um usuário previamente cadastrado.

Essa abordagem evita dependência da ordem de execução e permite que os cenários sejam executados de maneira independente.

## Próximas melhorias

- [ ]Implementar cenários negativos para validar erros de negócio.
- [ ]Adicionar tags BDD, como `@crud`, `@login` e `@regressao`.
- [ ]Gerar relatórios HTML de execução.
- [ ]Configurar integração contínua (CI).
- [ ]Centralizar configurações de ambiente por variáveis de ambiente.

## Referências

- [Documentação do Cucumber.js](<https://github.com/cucumber/cucumber-js>)
- [Documentação do Axios](<https://axios-http.com/>)
- [Documentação do TypeScript](<https://www.typescriptlang.org/docs/>)
- [API ServeRest](<https://serverest.dev/>)

---
