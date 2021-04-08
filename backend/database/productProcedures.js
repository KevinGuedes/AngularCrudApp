//#region CRUD
async function insertProduct(db, product) {
    await db.run(`
        INSERT INTO products (
            name, 
            price,
            description, 
            amount,
            categoryId
        ) VALUES (
            "${product.name}",
            ${product.price},
            "${product.description}",
            ${product.amount},
            ${product.categoryId}
        );
    `)
}

async function updateProduct(db, product, id) {
    await db.run(`
        UPDATE products 
        SET 
            name = "${product.name}",
            price = ${product.price},
            description = "${product.description}",
            amount = ${product.amount},
            categoryId = ${product.categoryId}
        WHERE 
            id = ${id}
    `)
}

async function readProduct(db) {
    return await db.all(`
        SELECT
            P.id,
            P.name,
            price,
            description,
            amount,
            C.name AS category,
            categoryId
        FROM
            products as P
        INNER JOIN
            category as C
        ON
            P.categoryId = C.id
    `)
}

async function deleteProduct(db, id) {
    return await db.run(`DELETE FROM products WHERE id = ${id}`)
}
//#endregion

async function readProductById(db, id) {
    return await db.get(`
        SELECT 
            P.id,
            P.name,
            price,
            description,
            amount,
            C.name AS category,
            categoryId
        FROM 
            products as P
        INNER JOIN
            category as C
        ON
            P.categoryId = C.id
        WHERE
            P.id = ${id}
    `)
}

async function searchProduct(db, minPrice, maxPrice, categoryId, productName) {

    const searchByCategoryId = categoryId ? `AND categoryId = ${categoryId} ` : ''
    const searchByProductName = productName ? `AND P.name LIKE '%${productName}%' ` : ''

    return await db.all(`
            SELECT
                P.id,
                P.name,
                price,
                description,
                amount,
                C.name AS category,
                categoryId
            FROM
                products as P
            INNER JOIN
                category as C
            ON
                P.categoryId = C.id
            WHERE 
                price >= ${minPrice} AND
                price <= ${maxPrice}
                ${searchByCategoryId}
                ${searchByProductName}
        `)
}

module.exports = {
    insertProduct,
    updateProduct,
    readProduct,
    readProductById,
    deleteProduct,
    searchProduct
}
