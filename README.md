# Desafio Bexs

O objetivo desse desafio é desenvolver uma aplicação de perguntas e respostas, tal como fóruns da internet, Reddit, etc. Nela será possível navegar pelas perguntas, criar uma nova, consultar as respostas feitas pela comunidade ou até mesmo responder a uma pergunta.

-----------------------------------------------------------------------------------------------------------------------------

O desenvolvimento do back-end foi feito em Node.js e sua biblioteca Express, além do Mongoose para fazer a conexão da aplicação com um banco de dados, que no caso, o escolhido foi o MongoDB (Atlas) .
A documentação da API do backend está disponível no link abaixo:

https://web.postman.co/collections/3838429-5dcc36f4-5eec-4695-b4f0-bbdbd64172a7?version=latest&workspace=e115f4b9-ed6a-4c12-8be5-be031c2c29bc


O desenvolvimento do fron-end foi feito em React.js e Axios na comunicação com o back-end.

-----------------------------------------------------------------------------------------------------------------------------

Primeiramente, é preciso executar o back-end para que ele esteja apto para receber requisições.

Localizado no diretório backend, execute o comando abaixo:

  $ node index.js

O console do terminal irá printar se o back-end já está apto a receber requisições e também se a conexão com o banco de dados foi concluída. Será exibido também no console um log com as requisições recebidas pelo servidor (graças a biblioteca Morgan - [npm install morgan]), mostrando a rota requisitada e o código HTTP retornado.


Com o back-end executando, é hora de executar o front-end. Acesse o diretório frontend e e execute o comando abaixo:

  $ npm start
  
Concluída a execução e retornado a url e porta de acesso informados, basta abrir seu navegador predileto e abrir a aplicação.

Pronto! Agora basta navegar pela aplicação!

-----------------------------------------------------------------------------------------------------------------------------

A página inicial contém uma listagem de todas as perguntas já feitas no fórum, acompanhadas do seu número de respostas. Além disso, temos um formulário no fim da página onde é possível adicionar uma nova pergunta, sendo preciso preencher a descrição da pergunta e o usuário que fará a pergunta.

Ainda na página inicial, clicando em uma das caixas que exibem a pergunta, você será redirecionado para uma tela que detalha os dados da pergunta, como o texto da pergunta, o usuário que fez a pergunta, data em que foi feita e mais abaixo, uma lista com as repostas dadas a esta pergunta.

Na parte inferior desta tela também existe um formulário onde é possível responder uma pergunta, sendo preciso preencher o campo que descreve sua resposta e o usuário escolhido para responder a resposta.

Na Navbar do site, existe um link 'Usuários' que redireciona para uma página que lista todos os usuários cadastrados, e onde é possível também adicionar um novo usuário, informando seu nome e email.

  

