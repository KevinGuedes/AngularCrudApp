function jsonCategoryToDTO(jsonCategory) {
    if (!jsonCategory.category) {
        throw new Error('Invalid category.')
    }
    else {
        return {
            id: jsonCategory.id || null,
            category: jsonCategory.category,
        }
    }
}

module.exports = {
    jsonCategoryToDTO
}
