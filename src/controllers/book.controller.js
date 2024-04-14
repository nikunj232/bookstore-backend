const { str2regex } = require("../helpers/function.helper");
const { userServices, tokenServices, bookServices } = require("../services");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

// this controller is to create books
module.exports.createBook = catchAsync(async (req, res) => {
    const createdBook = await bookServices.createBook(req.body, req)
    res
        .status(201)
        .json({success:true, data:createdBook, message:"Book created successfully!"})
})

// this controller is to get all book with pagination and search
module.exports.getAllBook = catchAsync(async (req, res) => {
    const { search } = pick(req.query, ["search"]);
    const options = pick(req.query, ["limit", "page"]);
    const searchRegx = str2regex(search??'')
    const query = {
        $or: [
            { title: { $regex:searchRegx, $options: 'i'} },
            { author: { $regex:searchRegx, $options: 'i'} }
        ]
    }

    const filteredBook = await bookServices.findAllBook(query, options)
    res
        .status(200)
        .json({success:true, data:filteredBook, message:"Book data get successfully!"})
})

module.exports.findBookByIsbn = catchAsync(async (req, res) => {
    const isbnNumber = req.params.isbn
    const bookData = await bookServices.findBookByIsbn(isbnNumber)
    
    res
        .status(200)
        .json({success:true, data: bookData , message:"Book get successfully!"})
})

module.exports.deleteBookByIsbn = catchAsync(async (req, res) => {
    const isbnNumber = req.params.isbn
    console.log(isbnNumber, "its isbn number");
    const deletedBook = await bookServices.deleteBookByIsbn(isbnNumber)
    console.log(deletedBook,"deleted book data");
    res
        .status(200)
        .json({success:true, message:"Book deleted successfully!"})
})

module.exports.updateBookByIsbn = async (req, res) => {
    const isbnNumber = req.params.isbn

    const updatedBook = await bookServices.updateBookByIsbn(isbnNumber, req.body)
    res
        .status(200)
        .json({success:true, message:"Book updated successfully!"})
}
