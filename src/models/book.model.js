const mongoose = require("mongoose");
const paginate = require("./plugins/paginate.plugin");
const toJSON = require("./plugins/toJSON.plugin");

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        publicationYear: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        isbn: {
            type: String, 
            unique: true, 
            required: true 
        }
    },
    {
        timestamps: true
    }
)

bookSchema.plugin(paginate)
// bookSchema.plugin(toJSON)

const Book = mongoose.model("book", bookSchema)
module.exports = Book