const express = require('express');
const bodyParser = require('body-parser')

const app = express();

const hostname = '127.0.0.1';
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
const DBPATH = __dirname + '/../../db.db'; //use o nome que você achar melhor para o banco de dados
const db = new sqlite3.Database(DBPATH); // Abre o banco

app.use(express.json());

app.set('view engine', 'ejs')
app.set('views', __dirname)
app.use('/main', express.static(__dirname))
app.use(express.static(__dirname));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

async function getCurriculos() {
    return await new Promise((resolve) => db.all(`SELECT * FROM curriculo`, [], (err, rows) => {
        if (err) {
            console.log(err.message)
        }
        resolve(rows)
    }));
}

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
        if (rows.length) {
            const empresas = [];

            rows.forEach(experiencia => {
                if (!empresas.includes(experiencia.empresa)) {
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
        } else {
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
    const curriculo = await getCurriculo(req.params.id || 1);

    console.log(curriculo);

    return res.render('curriculo', curriculo)
}

app.get('/curriculo/:id', curriculoController);
app.get('/curriculo', curriculoController);
app.get('/', curriculoController)

app.get('/dashboard', (req, res) => {
    return res.render('dashboard');
})

app.post('/dashboard', async (req, res) => {
    const idCurriculo = await new Promise((resolve) => db.run(`
        INSERT INTO curriculo (path_foto, nome, cargo, descricao, endereco, telefone, email)
        VALUES (?,?,?,?,?,?,?)
    `, [req.body.path_foto, req.body.nome, req.body.cargo, req.body.descricao, req.body.endereco, req.body.telefone, req.body.email], function (err, rows) {
        if (err) {
            console.log(err.message)
        }
        resolve(this.lastID)
    }));

    try {
        const decodedHabilidades = req.body.habilidades ? req.body.habilidades.split(";") : null;
        if (decodedHabilidades) {
            await Promise.all(decodedHabilidades.map(async habilidade => {
                new Promise((resolve) => db.run(`
                INSERT INTO habilidade (nome, idCurriculo)
                VALUES (?,?)
            `, [habilidade, idCurriculo], function (err, rows) {
                    if (err) {
                        console.log(err.message)
                    }
                    resolve(true)
                }))
            }))
        }


        const decodedPersonalidades = req.body.personalidades ? req.body.personalidades.split(";") : null;
        if (decodedPersonalidades) {
            await Promise.all(decodedPersonalidades.map(async personalidade => {
                new Promise((resolve) => db.run(`
                INSERT INTO personalidade (nome, idCurriculo)
                VALUES (?,?)
            `, [personalidade, idCurriculo], function (err, rows) {
                    if (err) {
                        console.log(err.message)
                    }
                    resolve(true)
                }))
            }))
        }


        const decodedFormacoes = req.body.formacoes ? JSON.parse(req.body.formacoes) : null;
        if (decodedFormacoes && decodedFormacoes.length) {
            await Promise.all(decodedFormacoes.map(async formacao => {
                new Promise((resolve) => db.run(`
                INSERT INTO formacao (instituicao, curso, inicio, fim, descricao, idCurriculo)
                VALUES (?,?,?,?,?,?)
            `, [formacao.instituicao, formacao.curso, formacao.inicio, formacao.fim, formacao.descricao, idCurriculo], function (err, rows) {
                    if (err) {
                        console.log(err.message)
                    }
                    resolve(true)
                }))
            }))
        }

        const decodedExperiencias = req.body.experiencias ? JSON.parse(req.body.experiencias) : null;
        if (decodedExperiencias && decodedExperiencias.length) {
            await Promise.all(decodedExperiencias.map(async experiencia => {
                new Promise((resolve) => db.run(`
                INSERT INTO experiencia (empresa, cargo, inicio, fim, descricao, idCurriculo)
                VALUES (?,?,?,?,?,?)
            `, [experiencia.empresa, experiencia.cargo, experiencia.inicio, experiencia.fim, experiencia.descricao, idCurriculo], function (err, rows) {
                    if (err) {
                        console.log(err.message)
                    }
                    resolve(true)
                }))
            }))
        }
    } catch (error) {
        console.log(error);
    }

    res.redirect(`/curriculo/${idCurriculo}`)
})

app.get('/dashboard/all', async (req, res) => {
    const curriculos = await getCurriculos();

    res.render('dashboardAll', { curriculos: curriculos })
})

app.get('/dashboard/:id/delete', async (req, res) => {
    await new Promise((resolve) => db.all(`DELETE FROM curriculo WHERE id = ${req.params.id}`, [], (err, rows) => {
        if (err) {
            console.log(err.message)
        }
        resolve(rows)
    }));

    res.redirect("/dashboard/all");
})

app.get('/dashboard/:id', async (req, res) => {
    const curriculo = await getCurriculo(req.params.id);

    if(curriculo.experiencias){
        const curriculoExperiencias = curriculo.experiencias;

        curriculo.experiencias = [];
        curriculoExperiencias.forEach(experiencia => {
            experiencia.cargos.forEach(cargo => {
                curriculo.experiencias.push(cargo);
            })
        })
    }
    curriculo.experiencias = curriculo.experiencias ? JSON.stringify(curriculo.experiencias) : curriculo.experiencias;
    curriculo.formacoes = curriculo.formacoes ? JSON.stringify(curriculo.formacoes) : curriculo.formacoes;
    curriculo.personalidades = curriculo.personalidades ? curriculo.personalidades.map(personalidade => personalidade.nome).join(";") : curriculo.personalidades;
    curriculo.habilidades = curriculo.habilidades ? curriculo.habilidades.map(habilidade => habilidade.nome).join(";") : curriculo.habilidades;

    res.render("editarCurriculo", curriculo);
})

app.post('/dashboard/:id', async (req, res) => {
    const idCurriculo = req.params.id;
    const curriculo = await new Promise((resolve) => db.run(`
        UPDATE curriculo SET path_foto = ?, nome = ?, cargo = ?, descricao = ?, endereco = ?, telefone = ?, email = ? WHERE id = ?
    `, [req.body.path_foto, req.body.nome, req.body.cargo, req.body.descricao, req.body.endereco, req.body.telefone, req.body.email, idCurriculo], function (err, rows) {
        if (err) {
            console.log(err.message)
        }
        resolve(this)
    }));

    let errorExist = false;
    
    try {
        const decodedHabilidades = req.body.habilidades ? req.body.habilidades.split(";") : null;
        if (decodedHabilidades) {
            await new Promise((resolve) => db.run(`
                DELETE FROM habilidade WHERE habilidade.idCurriculo = ?
            `, [idCurriculo], function (err, rows) {
                    if (err) {
                        console.log(err.message)
                    }
                    resolve(true)
            }))

            await Promise.all(decodedHabilidades.map(async habilidade => {
                new Promise((resolve) => db.run(`
                INSERT INTO habilidade (nome, idCurriculo)
                VALUES (?,?)
            `, [habilidade, idCurriculo], function (err, rows) {
                    if (err) {
                        console.log(err.message)
                    }
                    resolve(true)
                }))
            }))
        }


        const decodedPersonalidades = req.body.personalidades ? req.body.personalidades.split(";") : null;
        if (decodedPersonalidades) {
            await new Promise((resolve) => db.run(`
                DELETE FROM personalidade WHERE personalidade.idCurriculo = ?
            `, [idCurriculo], function (err, rows) {
                    if (err) {
                        console.log(err.message)
                    }
                    resolve(true)
            }))

            await Promise.all(decodedPersonalidades.map(async personalidade => {
                new Promise((resolve) => db.run(`
                INSERT INTO personalidade (nome, idCurriculo)
                VALUES (?,?)
            `, [personalidade, idCurriculo], function (err, rows) {
                    if (err) {
                        console.log(err.message)
                    }
                    resolve(true)
                }))
            }))
        }


        const decodedFormacoes = req.body.formacoes ? JSON.parse(req.body.formacoes) : null;
        if (decodedFormacoes && decodedFormacoes.length) {
            await new Promise((resolve) => db.run(`
                DELETE FROM formacao WHERE formacao.idCurriculo = ?
            `, [idCurriculo], function (err, rows) {
                    if (err) {
                        console.log(err.message)
                    }
                    resolve(true)
            }))
            await Promise.all(decodedFormacoes.map(async formacao => {
                new Promise((resolve) => db.run(`
                INSERT INTO formacao (instituicao, curso, inicio, fim, descricao, idCurriculo)
                VALUES (?,?,?,?,?,?)
            `, [formacao.instituicao, formacao.curso, formacao.inicio, formacao.fim, formacao.descricao, idCurriculo], function (err, rows) {
                    if (err) {
                        console.log(err.message)
                    }
                    resolve(true)
                }))
            }))
        }

        const decodedExperiencias = req.body.experiencias ? JSON.parse(req.body.experiencias) : null;
        if (decodedExperiencias && decodedExperiencias.length) {
            await new Promise((resolve) => db.run(`
                DELETE FROM experiencia WHERE experiencia.idCurriculo = ?
            `, [idCurriculo], function (err, rows) {
                    if (err) {
                        console.log(err.message)
                    }
                    resolve(true)
            }))

            await Promise.all(decodedExperiencias.map(async experiencia => {
                new Promise((resolve) => db.run(`
                INSERT INTO experiencia (empresa, cargo, inicio, fim, descricao, idCurriculo)
                VALUES (?,?,?,?,?,?)
            `, [experiencia.empresa, experiencia.cargo, experiencia.inicio, experiencia.fim, experiencia.descricao, idCurriculo], function (err, rows) {
                    if (err) {
                        console.log(err.message)
                    }
                    resolve(true)
                }))
            }))
        }
    } catch (error) {
        errorExist = true;
        console.log(error);
    }
    if(errorExist){
        res.redirect(`/dashboard/${idCurriculo}`);
    }else{
        res.redirect(`/curriculo/${idCurriculo}`);
    }
})

/* Inicia o servidor */
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});