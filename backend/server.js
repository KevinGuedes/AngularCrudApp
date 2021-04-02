const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Database = require('./database/database')
const app = express()
const port = 3001
const {
    jsonProductToDTO
} = require('./mapping/productMapper')
const {
    insertProduct,
    updateProduct,
    readProduct,
    deleteProduct,
    readProductById,
} = require('./database/procedures')


// Middlewares
app
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))

//#region CRUD
app.post('/products', (req, res) => {
    try {
        Database
            .then(
                async (db) => {
                    await insertProduct(db, jsonProductToDTO(req.body))
                    res.send({
                        success: true,
                    })
                },
                (error) => {
                    res.send(error.message)
                }
            )
    } catch (err) {
        console.log(err.message)
        res.send({
            success: false,
        })
    }
})

app.put('/products/:id', (req, res) => {
    try {
        Database
            .then(
                async (db) => {
                    const newProduct = jsonProductToDTO(req.body)
                    await updateProduct(db, newProduct)
                    res.send(newProduct)
                },
                (error) => {
                    res.send(error.message)
                }
            )
    } catch (err) {
        console.log(err.message)
        res.send({
            success: false,
        })
    }
})

app.get('/products', (req, res) => {
    Database
        .then(
            async (db) => {
                const products = await readProduct(db)
                res.json(products)
            },
            (error) => {
                res.send(error.message)
            }
        )
})

app.delete('/products/:id', (req, res) => {
    Database
        .then(
            async (db) => {
                await deleteProduct(db, req.params.id)
                res.send({
                    success: true,
                })
            },
            (error) => {
                res.send(error.message)
            }
        )
})
//#endregion

app.get('/products/:id', (req, res) => {
    Database
        .then(
            async (db) => {
                const product = await readProductById(db, req.params.id)
                res.json(product)
            },
            (error) => {
                res.send(error.message)
            }
        )
})

app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
})
