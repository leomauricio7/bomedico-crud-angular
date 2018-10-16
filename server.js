const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3000
const cors = require('cors')


app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

let users = [];

app.post('/users', (req, res) => {
    users.push(req.body);
    res.json(true);
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const data = users.filter( (element) => {
    return element.email == req.params.id;
  });
  res.json(data);
});

app.put('/users/:id', (req, res) => {
  const data = users.map( (element) => {
    if(element.email == req.params.id){
      return req.body;
    }else{
      return element;
    }
  });
  users = data;
  res.send('Usuario alterado com sucesso!');
});

app.delete('/users/:id', (req, res) => {
  const data = users.filter( (element) => {
    return element.email != req.params.id;
  });
  users = data;
  res.send('Usuário deletado com sucesso');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))