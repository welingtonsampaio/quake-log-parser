LuizaLabs - Quake log parser
============================

Este é o `Quake Test` enviado como teste para a vaga de programador backend da LuizaLabs.

Este projeto visa testar as habilidades de um programador backend, analisando para uma possível contratação.


## O teste

Conforme documento `arquivo`, o projeto deverá ser feito em duas etapas distintas. Sendo :

- Parser do log para a extração de dados.
- API para expor os dados através de requisição HTTP simples.


## Requisitos

Para a utilização deste projeto, você precisará ter instalado em seu computador:

- Node.JS v6 ou superior
- NPM 3.10 ou superior
- Yarn 0.27.5 ou superior

Após ter esses recursos instalados você precisará instalar as dependências, instale-as utilizando os seguintes comandos:

```bash
$ yarn install
```


## Executando o parser

[TO-DO]


## Rodando o Webserver

Execute no terminal na pasta do projeto:

```bash
$ yarn start
```

Você pode customizar a porta do servidor usando a variável de ambiente `PORT`, veja abaixo:

```bash
$ PORT=8080 yarn start
```


## Conduta de código

[TO-DO]


## Testes

O projeto está testado utilizando `jasmine`(docs) e caverage por `istanbul`. Sigar os comandos abaixo para executar os testes unitários:

```bash
$ yarn test
```

Este comando irá criar uma pasta `coverage` na raiz do projeto, com os detalhes da cobertura de codigo.

Para desenvolvimento contínuo é recomendado que utilize o `watcher` para que os testes sejam executados automaticamente conforme são alterados, para isso use o comando abaixo:

```bash
$ yarn run watch:spec
```
