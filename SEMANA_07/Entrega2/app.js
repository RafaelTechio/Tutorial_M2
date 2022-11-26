const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
const DBPATH = __dirname + '/../../db.db'; //use o nome que você achar melhor para o banco de dados
const db = new sqlite3.Database(DBPATH); // Abre o banco

app.use(express.json());

async function getCurriculo(id = 1) {
    const curriculo = await new Promise((resolve) => db.all(`SELECT * FROM curriculo WHERE id = ${id}`, [], (err, rows) => {
        if (err) {
            console.log(err.message)
        }
        resolve(rows[0])
    }));

    curriculo.experiencias = await getExperiencias(id)
    curriculo.habilidades = await getHabilidades(id)
    curriculo.formacoes = await getFormacoes(id)
    curriculo.personalidades = await getPersonalidades(id)
    curriculo.realizacoes = await getRealizacoes(id)

    return curriculo
}

async function getHabilidades(idCurriculo = 1) {
    return await new Promise((resolve) => db.all(`SELECT * FROM habilidade WHERE idCurriculo = ${idCurriculo}`, [], (err, rows) => {
        if (err) {
            console.log(err.message)
        }
        resolve(rows)
    }));
}
async function getExperiencias(idCurriculo = 1) {
    return await new Promise((resolve) => db.all(`SELECT * FROM experiencia WHERE idCurriculo = ${idCurriculo}`, [], (err, rows) => {
        if (err) {
            console.log(err.message)
        }
        resolve(rows)
    }));
}
async function getFormacoes(idCurriculo = 1) {
    return await new Promise((resolve) => db.all(`SELECT * FROM formacao WHERE idCurriculo = ${idCurriculo}`, [], (err, rows) => {
        if (err) {
            console.log(err.message)
        }
        resolve(rows)
    }));
}
async function getPersonalidades(idCurriculo = 1) {
    return await new Promise((resolve) => db.all(`SELECT * FROM personalidade WHERE idCurriculo = ${idCurriculo}`, [], (err, rows) => {
        if (err) {
            console.log(err.message)
        }
        resolve(rows)
    }));
}
async function getRealizacoes(idCurriculo = 1) {
    return await new Promise((resolve) => db.all(`SELECT * FROM realizacao WHERE idCurriculo = ${idCurriculo}`, [], (err, rows) => {
        if (err) {
            console.log(err.message)
        }
        resolve(rows)
    }));
}

app.get('/curriculo', async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    const curriculo = await getCurriculo(1)
    res.json(curriculo)
});

app.get('/experiencias', async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    const experiencias = await getExperiencias(1)
    res.json(experiencias)
});

app.get('/habilidades', async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    const habilidades = await getHabilidades(1)
    res.json(habilidades)
});

app.get('/formacoes', async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    const formacoes = await getFormacoes(1)
    res.json(formacoes)
});

app.get('/personalidades', async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    const personalidades = await getPersonalidades(1)
    res.json(personalidades)
});

app.get('/realizacoes', async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    const realizacoes = await getRealizacoes(1)
    res.json(realizacoes)
});

/* Inicia o servidor */
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});