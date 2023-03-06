# ToDo App

## Instalação
### Banco de Dados

**Instalação do PostgreSQL**  
A aplicação depende do banco de dados PostgreSQL, que pode ser executado com docker, conforme abaixo:  
```bash
docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```
**Criação do Banco de Dados**  
Uma vez que o banco de dados esteja rodando, já é possível se conectar a ele através de um cliente de banco de dados (ex: dBeaver, DataGrip, heidiSQL, etc.).  
Execute a query abaixo para fazer a criação do banco de dados:
```pgsql
CREATE DATABASE todo;
```

## API
Uma vez que o container e banco de dados estejam criados, a API já pode ser executada:
```bash
cd ./api
npm install
npm run start
```
No caso de o banco de dados usar um usuário, senha ou porta diferente, pode-se alterar o arquivo `api/src/app.module.ts` para configurar de acordo. A aplicação apresentará erro no terminal em caso de má configuração do banco.  

Ao executar a API, o banco já é populado com a criacão da tabela _task_, e a API já fica disponível no endereço `localhost:3001`.  
É possível acessar a documentação OpenAPI através do link [http://localhost:3001/swagger]()  

## Aplicação Front-End
Uma vez que o banco de dados e API estejam em execução, a aplicação front-end pode ser instalada da mesma forma que a API:
```bash
cd ./app
npm install
npm run start
```  
A aplicação ficará disponível no endereço `localhost:3000`

## Roadmap
- Conclusão dos testes automatizados na aplicação de front-end
- Conteinerização das aplicações e banco de dados através de docker-compose