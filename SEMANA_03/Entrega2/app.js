const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.urlencoded({
    extended: true
}))

function getHTML(filename){
    return path.resolve(__dirname + "/" + filename +".html")
}

app.get("/", (req, res) => {
    res.sendFile(getHTML("index"));
})

for(let i = 1; i <= 4; i++){
    app.get("/atividade"+i, (req, res) => {
        res.sendFile(getHTML("atividade"+i));
    })
}

app.post("/atividade1", (req, res) => {

    const velocidadeInicial = req.body.velocidadeInicial;

    const alturaMaxima = (velocidadeInicial * velocidadeInicial) / 20
    const tempoSubida = velocidadeInicial / 10

    res.send({
        "alturaMaxima": alturaMaxima,
        "tempoSubida": tempoSubida
    });
})

app.post("/atividade2", (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    const c = req.body.c;

    const x = (b / 2 * a) * -1;
    const y = ((b*b - (4 * a * c)) / 4*a) * -1;

    res.json({
        "x": x,
        "y": y
    })
})

app.post("/atividade3", (req, res) => {
    const valor = req.body.valor;
    const tipo = req.body.tipo; // 1 - Celsius para Fahrenheit  / 2 - Fahrenheit para Celsius 

    let valorFinal = null;
    if(tipo == 2){
        valorFinal = (valor - 32) / 1.8
    }else if(tipo == 1) {
        valorFinal = 1.8 * valor + 32
    }

    res.send({
        "valorFinal": valorFinal,
        "tipo": tipo == 1 ? "Fahrenheit" : "Celsius"
    })
})

app.post("/atividade4", (req, res) => {
    const valorUnitario = req.body.valorUnitario;
    const quantidade = req.body.quantidade;

    let valorFinal = valorUnitario * quantidade;

    if(quantidade >= 100 && quantidade < 200){
        valorFinal += (valorFinal / 4)
    }else if(quantidade >= 200){
        valorFinal += (valorFinal / 2)
    }


    res.send({
        "valorFinal": valorFinal
    })
})

app.listen(3000, () => {
    console.log("App listening 3000 port.")
})