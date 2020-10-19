<p align="center">
    <img src="assets/header-proffy.png" alt="Proffy"/>
</p>

<p align="center">
Projeto construído durante a Next Level Week #2 da Rocketseat.
</p>

<div align="center">

![](https://img.shields.io/badge/language-typescript-blue)
![](https://img.shields.io/badge/server-nodejs-brightgreen)
![](https://img.shields.io/badge/web-reactjs-blue)
![](https://img.shields.io/badge/mobile-react%20native-blueviolet)
![](https://img.shields.io/badge/database-mariadb-yellowgreen)
![](https://img.shields.io/badge/license-MIT-sucess)

</div>

Proffy é um projeto que foi desenvolvido para professores se cadastrarem na plataforma e anunciarem seu trabalho, onde alunos os procuram e entram em contato para solicitar seus serviços.

### ✅ Funcionalidades:

- Professores se cadastram na plataforma, informando matéria, dia e horários disponíveis.
- Alunos realizam uma busca de professores na matéria, dia e horário que precisam e entram em contato para solicitar seus serviços.

### 🛠 Tecnologias:

- [**React**](https://pt-br.reactjs.org/), [**TypeScript**](https://www.typescriptlang.org/), [**NodeJS**](https://nodejs.org/en/), [**Yarn**](https://yarnpkg.com/), [**Expo**](https://expo.io/) e [**MariaDB**](https://mariadb.org/).

- 🖥 Server (API)
    - [**express**](https://expressjs.com/pt-br/) -> Para criar as rotas do back-end.
    - [**knex**](http://knexjs.org/) -> Query Builder.
    - [**dotenv**]() -> Utilizar variáveis de ambiente.
    - [**mysql**]() -> Driver para conexão do knex com o banco de dados MariaDB.
- 🌐 Web
    - [**axios**](https://github.com/axios/axios) -> Realizar a conexão com nosso back-end.
    - [**react-router-dom**](https://reactrouter.com/web/guides/quick-start) -> Criar a navegação da nossa aplicação.
- 📱 Mobile
    - [**async-storage**](https://docs.expo.io/versions/latest/sdk/async-storage/) -> Salvar favoritos no local storage do aparelho.
    - [**react-native-gesture-handler**](https://github.com/software-mansion/react-native-gesture-handler) -> Navegação nativa de dispositivos móveis.
    - [**react-navigation**](https://reactnavigation.org/) -> Navegação de telas da aplicação.

### 📝 Padronização de código utilizando:

EditorConfig, ESLint e Prettier.

## ➡ Para utilizar em sua máquina:

**Necessário ter o 
[NodeJS](https://nodejs.org/en/download) 
instalado.**

> No projeto foi utilizado o 
[yarn](https://yarnpkg.com/getting-started/install)
como gerenciador de pacotes, mas caso queira utilizar o npm basta substituír os comandos que começam com yarn por npm.

Para utilizar as rotas do projeto será preciso utilizar o 
[Insomnia](https://insomnia.rest/download)
ou o 
[Postman](https://www.postman.com/downloads)
, conforme sua preferência.

### 🖥 Back-end

> Crie um arquivo com o nome **_.env_** na pasta _server_ com os dados da sua conexão com o banco de dados.

```
# Clone o projeto:

$ git clone https://github.com/rafaelsza/Proffy.git


# Entre na pasta raíz do projeto:

$ cd Proffy


# Entre na pasta server e execute yarn para instalar as dependências

$ cd server && yarn


# Agora rode as migrations para criar as tabelas no banco de dados:

$ yarn knex:migrate


# Para executar o projeto digite:

$ yarn dev:server
```

Agora com o Back-end rodando em sua máquina já pode começar a utilizar as rotas e seus métodos HTTP.

### 🔀 Métodos HTTP e suas rotas:

**ROTA**: [http://localhost:3333/classes]()

- **POST**: para cadastrar um novo proffy no banco de dados.

  Crie uma nova requisição do tipo POST no Insomnia/Postman colocando a rota acima e passando dentro do corpo os valores em formato JSON, conforme exemplificados abaixo:
  ```json
  {
	"name": "Rafael Souza",
	"avatar": "https://avatars1.githubusercontent.com/u/65384977?s=460&u=1d8c3e80158b2ed041fb0cc3518efab81a6cd37b&v=4",
	"whatsapp": "5541999000000",
	"bio": "Minha biografia",
	"subject": "TypeScript",
	"cost": 200,
	"schedule": [
		{ "week_day": 1, "from": "8:00", "to": "12:00" },
		{ "week_day": 3, "from": "8:00", "to": "16:00" },
		{ "week_day": 4, "from": "8:00", "to": "16:00" },
		{ "week_day": 6, "from": "8:00", "to": "10:00" }
	]
  }
  ```
  > Em _week_day_, dos dias da semana devem ser informados por número, onde a semana começa no domingo representado por 0.

  > _from_ é o horário de início disponível e _to_ o final.

- **GET**: retorna todos professores conforme as querys informadas.

  Crie uma nova requisição do tipo GET no Insomnia/Postman colocando a rota acima.

  Na aba query coloque os seguintes campos:

  week_day <br />
  subject <br />
  time <br />

  > Em _week_day_, dos dias da semana devem ser informados por número, onde a semana começa no domingo representado por 0.

  > subject deverá ser informado a matéria que deseja ter aula.

  > time o horário que deseja ter aula no formato 00:00

**ROTA**: [http://localhost:3333/connections]()

- **POST**: Aumenta o número de conexões já realizadas.

  Crie uma nova requisição do tipo POST no Insomnia/Postman colocando a rota acima e passando dentro do corpo os valores em formato JSON, conforme exemplificados abaixo:
  ```json
  {
	"user_id": 1
  }
  ```
- **GET**: Retorna o número total de conexões já realizadas.

  Crie uma nova requisição do tipo GET no Insomnia/Postman colocando a rota acima.

### 🌐 Front-end Web
> Lembrando que seu back-end deve estar rodando para poder utilizar os front-ends web e mobile.

```
# Volte na pasta raíz do projeto e entre em web

$ cd .. && cd web


# Execute yarn para instalar as dependências

$ yarn


# Para executar o projeto digite:

$ yarn start
```

### 📱 Front-end Mobile
> Lembrando que seu back-end deve estar rodando para poder utilizar os front-ends web e mobile.

> Para utilizar o front-end mobile baixe no seu celular um aplicativo chamado Expo.

```
# Volte na pasta raíz do projeto e entre em web

$ cd .. && cd mobile


# Execute yarn para instalar as dependências

$ yarn


# Para executar o projeto digite:

$ yarn start
```

No navegador que abrir, abra o aplicativo do Expo no seu celular e aponte ele para escanear o QRCode e executar o app no seu celular.

## 📃 Licença

Esse repositório está licenciado pela MIT LICENSE, confira o arquivo LICENSE deste repositório.

 <h3 align="center">👨🏻‍💻 Feito por <a href="https://www.linkedin.com/in/rafael-souza-28aa621ab/">Rafael Souza</a></h3>
