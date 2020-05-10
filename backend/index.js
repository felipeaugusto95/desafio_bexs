const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const url = process.env.DB_CONNECTION;
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };

mongoose.connect('mongodb+srv://usuario_admin:JGaozCdI1OOtbIjK@clusterapi-gxfcv.mongodb.net/bexs?retryWrites=true&w=majority', options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
  console.log('Erro na conexão com o banco de dados: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Aplicação desconectada');
});

mongoose.connection.on('connected', () => {
  console.log('Aplicação conectada com sucesso');
});

require('./controllers/index')(app)

app.listen(port, () => {
    console.log(`Server is running at localhost:${port}`);
});