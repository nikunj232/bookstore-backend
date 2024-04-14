const { Book } = require("../models")
const ApiError = require("../utils/ApiError")

exports.createBook = async (reqBody, req) => {
    const bookExist = await Book.findOne({isbn: reqBody.isbn})
    console.log(bookExist, "existing book");
    if (!!bookExist) {
        throw new ApiError(400, "Book with this ISBN number is exist!", req)
    }
    return Book.create(reqBody)

}

exports.findOneBook = async (query) => {
    const bookDoc = await Book.findOne(query)
    return bookDoc
}

exports.findAllBook = async (query, options) => {
    const allBook = await Book.paginate(query, options)
    return allBook
}

exports.findBookByIsbn = async (isbn) => {
    const bookDoc = await Book.findOne({isbn})
    return bookDoc
}

exports.updateBookByIsbn = async (isbn, data) => {
    const updatedBookDoc = await Book.findOneAndUpdate({isbn}, { $set: data }, { new: false })
    return updatedBookDoc
}

exports.deleteBookByIsbn = async (isbnNumber) => {
    
    const deleteBookDoc = await Book.deleteOne({isbn: isbnNumber})
    return deleteBookDoc
}
