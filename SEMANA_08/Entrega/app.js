const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
const DBPATH = __dirname + '/../../db.db'; //use o nome que você achar melhor para o banco de dados
const db = new sqlite3.Database(DBPATH); // Abre o banco

app.use(express.json());

app.set('view engine', 'ejs')
app.set('views', __dirname)
app.use(express.static(__dirname));

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
        if(rows.length){
            const empresas = [];

            rows.forEach(experiencia => {
                if(!empresas.includes(experiencia.empresa)){
                    empresas.push(experiencia.empresa);
                }
            })

            const objectEmpresas = [];
            empresas.forEach(empresa => {
                const empresaObject = {
                    nome: empresa,
                    cargos: rows.filter(experiencia => {
                        return experiencia.empresa == empresa
                    })
                }

                objectEmpresas.push(empresaObject);
            })

            resolve(objectEmpresas);
        }else{
            resolve(rows);
        }
        
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

const curriculoController = async (req, res) => {
    const curriculo = await getCurriculo(1);

    console.log(curriculo);

    return res.render('curriculo', curriculo)
}

app.get('/curriculo', curriculoController);
app.get('/', curriculoController)

app.get('/dashboard', (req, res) => {

})

/* Inicia o servidor */
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});