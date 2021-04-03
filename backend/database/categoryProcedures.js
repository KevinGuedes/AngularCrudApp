//#region CRUD
async function insertCategory(db, category) {

    await db.run(`
        INSERT INTO category (
            category
        ) VALUES (
            "${category.category}"
        );
    `)
}

async function updateCategory(db, category, id) {

    await db.run(`
        UPDATE category 
        SET 
            category = "${category.name}"
        WHERE 
            id = ${id}
    `)
}

async function readCategory(db) {
    return await db.all(`SELECT * FROM category`)
}

async function deleteCategory(db, id) {
    return await db.run(`DELETE FROM category WHERE id = ${id}`)
}
//#endregion

async function readCategoryById(db, id) {
    return await db.get(`
        SELECT * 
        FROM 
            category
        WHERE
            id = ${id}
    `)
}

module.exports = {
    insertCategory,
    updateCategory,
    readCategory,
    readCategoryById,
    deleteCategory,
}
