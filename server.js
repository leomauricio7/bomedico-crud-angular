//importando as bibliotecas
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//passando para a constante app a função do express
const app = express();

//conectando ao banco de dados
mongoose.connect('mongodb://127.0.0.1:27017/teste',{ useNewUrlParser: true });
const statusDB = mongoose.connection;
statusDB.on('error', console.error.bind(console, 'connection error:'));
statusDB.once('open', function() {
  console.log('Conectado ao mongoDB com sucesso!');
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parser application/json
app.use(bodyParser.json())

//setando a porta do servidor
app.listen(3000, function() {
    console.log('Servidor rodando na porta 3000.');
  });

//importando o shema com o mongoose
const Schema = mongoose.Schema;
//criando o modelo da colleciton contato
const contato = new Schema({
    nome: String,
    telefone: Number
  });
const modelContato = mongoose.model('contato', contato);  

//rota de retorna todos os contatos cadastrados
app.get('/contatos', (req, res) => {
    modelContato
    .find()
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
});

//rota de filtrar contatos
app.get('/contatos/:id', (req, res) => {
    modelContato
    .findById(req.params.id)
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
});

//rota de cadastrar contato
app.post('/contatos', (req, res) => {
    var data = new modelContato(req.body);
    data.save().then(x => {
        res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
    }).catch(e => {
        res.status(400).send({ message: 'Falha no cadastro do produto!', data: e });
    });
});

//rota de editar contato
app.put('/contatos/:id', (req, res) => {
    modelContato
    .findOneAndUpdate(req.params.id, {
        $set: {
            nome: req.body.nome,
            telefone: req.body.telefone
        }
    })
    .then(x => {
        res.status(200).send({ message: 'Contato alterado com sucesso!' });
    }).
    catch(e => {
        res.status(400).send({ message: 'Falha na alteração do contato!'});
    });
});

//rota de remover contato
app.delete('/contatos/:id', (req, res) => {
    modelContato
    .findOneAndRemove(req.params.id)
    .then(x => {
        res.status(200).send({ message: 'Contato excluido com sucesso!' });
    }).
    catch(e => {
        res.status(400).send({ message: 'Falha na exclusão do contato!'});
    });
});