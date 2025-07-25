# Sequelize - Guia Completo

Este projeto demonstra o uso do [Sequelize](https://sequelize.org/), um ORM para Node.js, facilitando a manipulação de bancos de dados relacionais.

## Índice

- [Sobre](#sobre)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Comandos Úteis](#comandos-úteis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Exemplos de Uso](#exemplos-de-uso)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Sobre

Este repositório contém exemplos práticos de como utilizar o Sequelize para criar, ler, atualizar e deletar dados em um banco de dados relacional.

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 14.x
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Um banco de dados relacional (MySQL, PostgreSQL, SQLite, etc.)

## Instalação

```bash
git clone https://github.com/seu-usuario/sequelize-exemplo.git
cd sequelize-exemplo
npm install
```

## Configuração

1. Renomeie `.env.example` para `.env` e configure as variáveis de ambiente do banco de dados.
2. Edite o arquivo `config/config.js` conforme necessário.

## Comandos Úteis

- Rodar as migrations:
    ```bash
    npx sequelize-cli db:migrate
    ```
- Criar um novo model:
    ```bash
    npx sequelize-cli model:generate --name Usuario --attributes nome:string,email:string
    ```
- Rodar o projeto:
    ```bash
    npm start
    ```

## Estrutura do Projeto

```
.
├── config/
├── migrations/
├── models/
├── seeders/
├── src/
├── .env
├── package.json
└── Readme.md
```

## Exemplos de Uso

### Criar um registro

```js
const Usuario = require('./models/usuario');
Usuario.create({ nome: 'João', email: 'joao@email.com' });
```

### Buscar registros

```js
Usuario.findAll().then(usuarios => {
    console.log(usuarios);
});
```

## Contribuição

Contribuições são bem-vindas! Abra uma issue ou envie um pull request.

## Licença

[MIT](LICENSE)