# Documentação do desafio.

Olá avaliadores, irei guia-los a como instalar e executar o projeto.
Tambem irei apresentar detalhadamente as tecnologias que utilizei e o porque.

## Instalação, execução, testes via scripts

Dentro do diretório frontend execute os seguintes comandos:

### `yarn install`

Esse comando irá instalar todas as dependencias do projeto em sua maquina.

### `yarn start`

Após a instalação das dependecias da aplição, rode mais esse comando, para a executar a aplicação

# Tecnologias utilizadas.

## 1. Framework React JS

Falando em arquitetura de pastas, segui o que considero o mais ideal, todos os projetos que desenvolvo, separo bem as coisas, porque acho que fica melhor organizado, e acredito que seja mais rapida a minha fixação, caso precise criar um novo aquivo, ou buscar um que ja exista.

Utiizei como Gerenciamento de estado a Context API do próprio React, por ser mais rapida a implementação e menos verbosa que o redux.

## 2. SCSS

para criar a estilização da aplicação utilizei Scss por ter um dominio maior, e que considero mais tranquilo tambem a questão de trabalhar com alguns conseitos de atomic design, organizei tambem dessa mesma maneira a pasta styles, onde usei os arquivos separados por: global para aplicação, componentes, e dependencias.

## 3. Axios

Para realizar as requisições escolhi o axios, separei em uma pasta services onde contem um arquivo com api com a minha baseUrl, e na pagina que eu preciso eu disparo a requisição apenas do meu end-point, acredito que assim é mais organizado de se fazer.

## 4. Moment JS

Para tratar as datas e horas da aplicação optei por usar o momentjs por ja estar acostumado com a biblioteca, e familiarizado com suas respectivas funções.

## 5. React-Icons

Utilizei a biblioteca react-icons, por ser um local onde se eu precisar utilizar icones do Font Awesome, Meterial Design, entre outros eu não precise importar cada uma delas para o projeto.

## 6. React-Toastfy

Para apresentar feedbacks para usuario, de um item adicionado na lista de favoritos, ou mensagens de erro na aplição como um todo, optei por usar essa biblioteca, por ser extremamente simples de usar e da um visual bem agradavel na interface.
