const express = require("express")
const { bookController } = require("../controllers")
const validate = require("../middleware/validate")
const { bookValidations } = require("../validations")

const router = express.Router()

router.post(
    "/create",
    validate(bookValidations.createBook),
    bookController.createBook
)

router.get(
    "/all-book",
    validate(bookValidations.getAllBook),
    bookController.getAllBook
)

router.get(
    "/:isbn",
    validate(bookValidations.findBookByIsbn),
    bookController.findBookByIsbn
)

router.delete(
    "/delete/:isbn",
    validate(bookValidations.getAllBook),
    bookController.deleteBookByIsbn
)

router.put(
    "/update/:isbn",
    validate(bookValidations.getAllBook),
    bookController.updateBookByIsbn
)

module.exports = router