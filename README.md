# SUPER SNACKS API

![](https://media.giphy.com/media/12NUbkX6p4xOO4/giphy.gif)

A Super Snacks API foi desenvolvida com o intuito de fornecer e controlar o fluxo de vendas das máquinas de snacks da Super Coffee MT LTDA. O acesso aos produtos dessas máquinas se dá, através de cartões magnéticos, os quais têm seus créditos renovados todos os dias, de acordo com o valor estabelecido em contrato.

## Requerimentos

- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Como Rodar ?

1. `git clone https://github.com/giovannicruz97/super-snacks-api`
2. `cd /super-snacks-api`
3. Crie um arquivo `.env` na raiz do projeto, baseado nas informações do arquivo `.env.example`
4. `docker-compose up -d`
5. Para acessar o bash do container da API, execute: `docker exec -it super-snacks-api bash`

## Testes

- Para executar os testes, execute: `docker exec super-snacks-api npm test`

## Casos de uso

- [ ] Autenticação via JWT por máquina
- [ ] CRUD de máquinas
- [ ] CRUD de produtos
- [ ] CRUD de cartões
- [ ] Lançamento de venda
- [ ] Débito de saldo do cartão
- [ ] Recarga de saldo de cartão

## Rotas/Endpoints

- A documentação das rotas podem ser visualizadas [aqui]('#')

## Contato

- Email: giovanni.cruz97@hotmail.com
