# :cookie: SUPER SNACKS API

![](https://media.giphy.com/media/xT5LMW6nbTu8pUHZgA/giphy.gif)

A Super Snacks API foi desenvolvida com o intuito de fornecer e controlar o fluxo de vendas das máquinas de snacks da Super Coffee MT LTDA. O acesso aos produtos dessas máquinas se dá, através de cartões magnéticos, os quais têm seus créditos renovados todos os dias, de acordo com o valor estabelecido em contrato. Devem-se instalados nas máquinas algum espécie de microcomputador (Raspiberry or Arduino) que consiga realizar as chamadas REST através da placa de interface via HTTP para a API. Além disso, esse microcomputador deve ser capaz de armazenar o token JWT para as posteriores chamadas à API.

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

- [x] Autenticação via JWT por máquina
- [x] Cadastro de máquina
- [x] Atualização de máquina
- [x] Visualização de máquina
- [ ] Remoção de máquina
- [ ] Criação de produto
- [ ] Atualização de produto
- [ ] Visualização de produto
- [ ] Remoção de produto
- [ ] Cadastro de cartão
- [ ] Remoção de cartão
- [ ] Visualização de saldo do cartão
- [ ] Recarga diária do saldo do cartão
- [ ] Débito de créditos do cartão

## Coleções (MongoDB)

**Cards**

```
{
  currentCredit: float,
  defaultCredit: float,
  lastEntry: date,
  reloadedToday: boolean
}
```

**Machines**

```
{
  name: string,
  location: string,
  hash: string
}
```

**Products**

```
{
  name: string,
  price: float
}
```

## Rotas/Endpoints

- A documentação das rotas podem ser visualizadas [aqui]('#')

## Contato

- Email: giovanni.cruz97@hotmail.com
