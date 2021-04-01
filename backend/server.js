const express = require('express')
const Database = require('./database/database')
const {
    insertProduct,
    updateProduct,
    readProduct,
    readProductById,
} = require('./database/procedures')
const app = express()
const port = 3001

app.post('/products/create', (req, res) => {

    Database.then(async (db) => {
        await insertProduct(db)
    })
        .then(
            () => {
                res.send({
                    success: true,
                })
            },
            (error) => {
                res.send(error.message)
            }
        )
})

app.put('/products/update', (req, res) => {

    Database
        .then(
            async (db) => {
                res.send(await updateProduct(db))
            },
            (error) => {
                res.send(error.message)
            }
        )
})

app.get('/products', (req, res) => {

    Database
        .then(
            async (db) => {
                res.send(await readProduct(db))
            },
            (error) => {
                res.send(error.message)
            }
        )
})

app.get('/products/:id', (req, res) => {

    Database
        .then(
            async (db) => {
                res.send(await readProductById(db, req.params.id))
            },
            (error) => {
                res.send(error.message)
            }
        )
})

app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
})
