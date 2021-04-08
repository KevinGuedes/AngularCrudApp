function jsonCategoryToDTO(jsonCategory) {
    if (!jsonCategory.name) {
        throw new Error('Invalid category.')
    }
    else {
        return {
            id: jsonCategory.id || null,
            name: jsonCategory.name,
        }
    }
}

module.exports = {
    jsonCategoryToDTO
}
