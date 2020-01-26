const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');

const {setupWebsocket} = require('./websocket')

const app = express();
const server = http.Server(app);

setupWebsocket(server);

//Conexão com nossa base de dados;
mongoose.connect('mongodb+srv://natan:1Lazzeri@@cluster0-aloxh.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Com isso liberamos todo o acesso externo para nossa aplicação;
app.use(cors())

//Configuração para TODAS as rotas da nossa aplicação, usamos o .use Ex:
//Fazemos com que todas as nossas requisições entendam o formato json;
app.use(express.json())

//Faço com que todas minhas rotas sejam entendidas na minha aplicação;
app.use(routes)


server.listen(3333);