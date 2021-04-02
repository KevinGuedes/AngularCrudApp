//#region CRUD
async function insertProduct(db, product) {

    await db.run(`
        INSERT INTO products (
            name, 
            price,
            description, 
            amount
        ) VALUES (
            "${product.name}",
            ${product.price},
            "${product.description}",
            ${product.amount}
        );
    `)
}

async function updateProduct(db, product) {

    await db.run(`
        UPDATE products 
        SET 
            name = "${product.name}",
            price = ${product.price},
            description = "${product.description}",
            amount = ${product.amount}
        WHERE 
            id = ${product.id}
    `)
}

async function readProduct(db) {
    return await db.all(`SELECT * FROM products`)
}

async function deleteProduct(db, id) {
    return await db.run(`DELETE FROM products WHERE id = ${id}`)
}
//#endregion

async function readProductById(db, id) {
    return await db.get(`
        SELECT * 
        FROM 
            products
        WHERE
            id = ${id}
    `)
}

module.exports = {
    insertProduct,
    updateProduct,
    readProduct,
    readProductById,
    deleteProduct
}
