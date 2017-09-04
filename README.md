LuizaLabs - Quake log parser
============================

Este é o `Quake Test` enviado como teste para a vaga de programador backend da LuizaLabs.

Este projeto visa testar as habilidades de um programador backend, analisando para uma possível contratação.


## O teste

Conforme documento `arquivo`, o projeto deverá ser feito em duas etapas distintas. Sendo :

- Parser do log para a extração de dados.
- API para expor os dados através de requisição HTTP simples.


## Solução proposta

Percebi que o log segue uma linha lógica contendo uma palavra-chave para cada linha de log, e sempre no mesmo index da linha no caso o index `7`. Com isso resolvi criar um objeto contendo a palavra chave e seu respectivo parser(utilizei regex).

Após validar que o parser estava funcionando, atrvés dos testes. Foi só expor para a API os resultados.


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

O parser pode ser executado de duas formas, dentro do código ou por terminar para ter uma saida em json.

Para executar o parser no terminal você precisará chamar o binário que se encontra dentro da pasta `bin` com o nome de `parser`, e em seguida passar o local do arquivo de log como no exemplo abaixo:

```bash
$ bin/parser data/games.log
```


## Rodando o Webserver

Execute no terminal na pasta do projeto:

```bash
$ yarn start
```

Você pode customizar a porta do servidor usando a variável de ambiente `PORT`, veja abaixo:

```bash
$ PORT=8080 yarn start
```


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
