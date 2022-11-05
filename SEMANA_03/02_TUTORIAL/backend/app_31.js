
const express = require('express'); 
const app = express();
const path = require('path')

app.use(express.urlencoded({
  extended: true
}))

const hostname = '127.0.0.1';
const port = 3031;
// app.use(express.static("../frontend/"));

function sendActivityHTML(arquiveName){
  return path.resolve(__dirname + "/../frontend/" + arquiveName)
}

app.get("/", (req, res) => {
  res.sendFile(sendActivityHTML('atividade1.html'))
})

app.get("/exercicio1", (req, res) => {
  res.sendFile(sendActivityHTML('atividade1.html'))
})

app.post("/exercicio1", (req, res) => {
  console.log(req.params, req.body)

  const valorInicial = req.body.desconto-acrescimo

  res.sendFile(sendActivityHTML('atividade1.html'))
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});