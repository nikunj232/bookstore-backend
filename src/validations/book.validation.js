const Joi = require("joi");

module.exports.createBook = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        author: Joi.string().required(),
        description: Joi.string(),
        publicationYear: Joi.number(),
        isbn: Joi.string().required(),
    })
}

module.exports.getAllBook = {
    query: Joi.object().keys({
        limit: Joi.number().integer().default(10),
        page: Joi.number().integer().default(1),
        search: Joi.string().allow(""),
    }),
}

module.exports.findBookByIsbn = {
    params: Joi.object().keys({
        isbn: Joi.string().required()
    }),
}

module.exports.updateBookByIsbn = {
    params: Joi.object().keys({
        isbn: Joi.string().required()
    }),
    body: Joi.object().keys({
        title: Joi.string().required(),
        author: Joi.string().required(),
        description: Joi.string(),
        publicationYear: Joi.number(),
    })
}

module.exports.deleteBookByIsbn = {
    params: Joi.object().keys({
        isbn: Joi.string().required()
    }),
}
