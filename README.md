# :cookie: SUPER SNACKS API

![](https://media.giphy.com/media/xT5LMW6nbTu8pUHZgA/giphy.gif)

A Super Snacks API foi desenvolvida com o intuito de fornecer e controlar o fluxo de vendas das máquinas de snacks da Super Coffee MT LTDA. O acesso aos produtos dessas máquinas se dá, através de cartões magnéticos, os quais têm seus créditos renovados todos os dias, de acordo com o valor estabelecido em contrato. Devem-se instalados nas máquinas algum espécie de microcomputador (Raspiberry or Arduino) que consiga realizar as chamadas REST através da placa de interface via HTTP para a API. Além disso, esse microcomputador deve ser capaz de armazenar o token JWT para as posteriores chamadas à API.

## Requisitos

- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Como rodar ?

1. `git clone https://github.com/giovannicruz97/super-snacks-api`
2. `cd /super-snacks-api`
3. Crie um arquivo `.env` na raiz do projeto, baseado nas informações do arquivo `.env.example`
4. `docker-compose up -d`
5. Para acessar o bash do container da API, execute: `docker exec -it super-snacks-api bash`

## Testes

- Para executar os testes, os contâneire Docker devem estar rodando, a variável de ambiente `APP_MODE` deve ser igual a `test`, pois assim os testes rodaram no banco MongoDB do ambiente de testes. **Todas as alterações no arquivo `.env`, implicam em reinicio da aplicação**. Isso pode ser feito através do comando `docker-compose restart`. Após isso, execute: `docker exec super-snacks-api npm test`

- Existe uma suíte de testes dedicada somente para a simulação do desafio proposto, em `test/challenge/VendingMachineCase.test.js`, o qual é responsável pelos seguintes passos lógicos:
  1. Inserção do cartão
  2. Atualização com o saldo diário disponível, registrado em contrato e exibição do saldo atual.
  3. Registro de venda e débito do saldo atual.
  4. Reset dos valores de saldo disponíveis no cartão para o valor inicial registrado em contrato, simulando uma cron job que deve ser executada após a virada do dia.

## Casos de uso

- [x] Autenticação via JWT por máquina
- [x] Cadastro de máquina
- [x] Atualização de máquina
- [x] Visualização de máquina
- [x] Remoção de máquina
- [x] Criação de produto
- [x] Atualização de produto
- [x] Visualização de produto
- [x] Remoção de produto
- [x] Cadastro de cartão
- [x] Remoção de cartão
- [x] Visualização de saldo do cartão
- [x] Recarga diária do saldo do cartão
- [x] Reset de créditos de cartão (CRON)
- [x] Realização de venda

## Coleções (MongoDB)

**Cards**

```
{
  currentCredit: float,
  defaultCredit: float,
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

## Coleções (Postman)

- As coleções para importação e realização de chamadas da API via Postman, podem ser baixadas [aqui](https://www.getpostman.com/collections/9b57a3e8f06683a71984)

## Rotas/Endpoints

- A documentação das rotas podem ser visualizadas [aqui](https://documenter.getpostman.com/view/954465/S11By2Pq)

## Contato

- Email: giovanni.cruz97@hotmail.com
