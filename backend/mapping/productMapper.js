function jsonProductToDTO(jsonProduct) {
    if (!jsonProduct.name || !jsonProduct.price || !jsonProduct.categoryId) {
        throw new Error('Invalid product.')
    }
    else {
        return {
            id: jsonProduct.id || null,
            name: jsonProduct.name,
            price: jsonProduct.price,
            description: jsonProduct.description || null,
            amount: jsonProduct.amount || null,
            categoryId: jsonProduct.categoryId
        }
    }
}

module.exports = {
    jsonProductToDTO
}
