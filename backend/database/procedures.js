async function insertProduct(db) {

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

async function updateProduct(db) {

    await db.run(`
        UPDATE products 
        SET 
            name = "${newProduct.name}",
            price = ${newProduct.price},
            description = "${newProduct.description}",
            amount = ${newProduct.amount}
        WHERE 
            id = ${newProduct.id}
    `)
}


async function readProduct(db) {
    return await db.all(`SELECT * FROM products`)
}

async function readProductById(db, id) {
    return await db.all(`
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
    readProductById
}
