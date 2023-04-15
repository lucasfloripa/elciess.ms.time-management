# Vibbra Backend Test

## Sobre o teste
  Acho que poderia ser divido em 2 projetos um "usuario" e outro "projeto".  Cada 1 seria um micro-serviço, mas por ser um teste fiz tudo num projeto só. Separar seria mais para o fato caso no futuro precisasse usar alguma arquitetura a evento, sendo "quando um usario for criado ele é vinculado a tao produto" e assim vai.

  Utilizei um banco SQL, assim retirei algumas propriedades que não eram necessárias que estavam no escopo.

  A data que deve ser provida é em ISOString() pelo "possivel fronend"
  
  Criei um docker-compose para simular um ambiente de prod, mas não sei o que ta dando ele não ta populando certinho co o arquivo que fiz. Dessa maneira tem que popular no braço com o arquivo que está no root.

  Algo que não fiz foi o GitFlow. Mas, se você verificar este repositório https://github.com/lucasfloripa/elciess.ms.sign-up/commits/main você verá que sei fazer.

  Tem muitas outras coisas que daria pra implementar, seguir, porém por ser um teste acho que menos é mais. Caso queiram conversar sobre posso explicar td certinho.

  Obrigado!

  Lucas.

  # Tecnologias
  - Typescript
  - Node
  - Express
  - Jest
  - Docker
  - JWT
  - Logger

# Instruções
* Rodando projeto local

     Primeiro estabelecer uma conecção com postgresql. 

      docker run -d -p 5432:5432 \
      -e POSTGRES_USER=user \
      -e POSTGRES_PASSWORD=password \
      -e POSTGRES_DB=vibbra \
      -v ~/Volumes/postgresql/data:/var/lib/postgresql/data \
      --name postgresContainer \
      postgres:15
  
    dev environment

      npm run start:dev
  
    prod environment

      npm run start:prod

* Rodando com docker compose
  
      npm run docker:up

* Após projeto rodando

      1. Você deve rodar as queries do arquivo init-db.sql para ter um "banco" válido.
      2. As rotas de criar usuário e autenticar são as únicas publicas.
      3. As rotas privadas você precisa por o token da autenticação no header da requisição em uma variável 'x-access-token'
      4. As datas passadas tem que estar no formato ISOString()


# Arquitetura

## Camadas
1. Domain: Core das regras de negocios
1. Presentation: Ponto de entrada do cliente
1. Application: regras de negocio aplicadas
1. Infra: ferramentas que vem de fora da aplicação
1. Main: onde a aplicação é construida
1. Utils: utilitarios gerais

# Resources / Exceptions
* GetUserById

      GET http://localhost:3000/api/v1/users/:id

* CreateUser

      POST http://localhost:3000/api/v1/users

* UpdateUser

      PUT http://localhost:3000/api/v1/users/:id

* Auth

      POST http://localhost:3000/api/v1/authenticate

* GetTimeByProjectId

      GET http://localhost:3000/api/v1/times/:projectId

* CreateTime

      POST http://localhost:3000/api/v1/times

* UpdateTime

      PUT http://localhost:3000/api/v1/times/:id

* GetProjects

      GET http://localhost:3000/api/v1/projects

* GetProjectById

      GET http://localhost:3000/api/v1/projects/:id

* CreateProject

      POST http://localhost:3000/api/v1/projects

* UpdateProject

      PUT http://localhost:3000/api/v1/projects/:id
