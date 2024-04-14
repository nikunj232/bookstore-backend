
const request = require('supertest');

const booksRouter = require('../../routes/book.route'); // Replace with your router path
const app = require('../../../app'); // Replace with your app instance
const { default: mongoose } = require('mongoose');
const connectToDatabase = require('../testSetup');

// let dbUrl = "mongodb://127.0.0.1:27017/mean_assesment"
// mongoose.connect(dbUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }).catch(error => console.log(error));

// beforeEach(async () => {
//     await connectToDatabase();
// });


beforeAll(async () => {
   await connectToDatabase()
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('books route', () => {
    it('should create a new book', async () => {
        
        const newBook = { 
            title: 'The Hitchhiker\'s Guide to the Galaxy',
            author: 'Douglas Adams',
            description: "It's about those things in which we all ready had conquered but we have self doubts",
            publicationYear: 2018,
            isbn: ("978" + Math.floor(Math.random() * 900000000).toString()).padStart(13,"0")
        };
        console.log(newBook.isbn, "isbn number");
        const res = await request(app).post('/v1/books/create').send(newBook);
        console.log(res.body, "res data in test");
        expect(res.statusCode).toBe(201); // Check for successful creation
        expect(res.body.data).toHaveProperty('_id'); // Check for generated ID
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe("Book created successfully!");
    },20000);

    it('get all book', async () => {
        console.log('Sending POST request to:', '/v1/books/create');
        
        const res = await request(app).get('/v1/books/all-book').send();
        console.log('New book data:', res.body);
    
        expect(res.statusCode).toBe(200); // Check for status code
        expect(res.body).toHaveProperty('message'); // Check for response message
        expect(res.body).toHaveProperty('success'); 
        expect(res.body.success).toBe(true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.message).toBe('Book data get successfully!'); // Check for response message

    }, 20000);
});

