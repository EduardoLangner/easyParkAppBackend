# Easy Park
O Aplicativo Easy Parking surgiu como uma idéia para facilitar a rotina de estacionamento de veículos, com uma feature única de visualização de vagas em tempo real.

## Conexão com banco de dados utilizando variáveis de ambiente
## Rotas criadas utilizando Express para requisições HTTP

# Requisitos para rodar a aplicação
1. Nodejs.
2. NPM.
3. Docker.
4. PGAdmin (ou qualquer outro banco de sua preferência).
5. Yarn.
6. sequelize.

# Clonar o repositório
1. Copiar o link do repositório como HTTPS e clonar no local de sua preferência.
2. Rodar o comando "npm install" na pasta raiz do projeto para instalar as dependências.

# Rodando a aplicação
"docker-compose up" -> serve para subir o banco de dados e o pgadmin caso não tenha o banco instalado em sua máquina. 
"npm start" -> serve para subir a aplicação.
"yarn sequelize db:create" -> serve para criar o banco de dados.
"yarn sequelize migration:create --name=nomeDaTabelaASerCriada" -> serve para criar uma tabela no banco de dados.
"yarn sequelize db:migrate" -> serve para criar as tabelas no banco de dados.

# Link para fonte do front-end
https://github.com/EduardoLangner/easyParkAppFrontend.git
