const express = require('express')
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./../../db.db')

const app = express();

app.use(express.json())

app.get('/curriculos', (req, res) => {
    db.all("SELECT * FROM curriculo", [], (err, rows) => {
        res.send(err || rows)
    })
})

app.get('/curriculos/:id', (req, res) => {
    db.get(`SELECT * FROM curriculo WHERE curriculo.id = ?`, [req.params.id], (err, rows) => {
        res.send(err || rows)
    })
})

app.post('/curriculos', (req, res) => {
    db.run(`INSERT INTO curriculo (nome, cargo, telefone, endereco, email, descricao, path_foto) VALUES (?,?,?,?,?,?,?)`, [req.body.nome, req.body.cargo, req.body.telefone, req.body.endereco, req.body.email, req.body.descricao, req.body.link_foto], function(err, rows){
        res.send(err || {id: this.lastID})
    })
})

app.put('/curriculos/:id', (req, res) => {
    db.run(`UPDATE curriculo SET nome = ?, cargo = ?, telefone = ?, endereco = ?, email = ?, descricao = ?, path_foto = ? WHERE id = ?`, [req.body.nome, req.body.cargo, req.body.telefone, req.body.endereco, req.body.email, req.body.descricao, req.body.link_foto, req.params.id], function(err, rows){
        res.send(err || {alterado: !!this.changes})
    })
})

app.delete('/curriculos/:id', (req, res) => {
    db.run(`DELETE FROM curriculo  WHERE id = ?`, [req.params.id], function(err, rows){
        res.send(err || {alterado: !!this.changes})
    })
})

app.listen(3000, () => {
    console.log("Escutando porta 3000");
})