function jsonProductToDTO(jsonProduct) {
    if (!jsonProduct.name || !jsonProduct.price) {
        throw new Error('Invalid product.')
    }
    else {
        return {
            id: jsonProduct.id || null,
            name: jsonProduct.name,
            price: jsonProduct.price,
            description: jsonProduct.description || null,
            amount: jsonProduct.amount || null,
        }
    }
}

module.exports = {
    jsonProductToDTO
}
