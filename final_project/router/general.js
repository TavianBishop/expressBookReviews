const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) {
      return res.status(404).json({ message: "Username and password are required" });
    }
  
    if (!isValid(username)) {
      // isValid returning false likely means "not already taken" in this course's pattern —
      // double check your isValid implementation to confirm this is the right direction
      users.push({ username, password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  });

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(300).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if(isbn in books) {
    return res.status(200).json(books[isbn]);
    } else {
        res.status(404).json({message: "Book isdn does not exist;"})
    }
 });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
  
    const matchingBooks = Object.values(books).filter(
      (book) => book.author.toLowerCase() === author.toLowerCase()
    );
  
    if (matchingBooks.length > 0) {
      return res.status(200).json(matchingBooks);
    } else {
      return res.status(404).json({ message: "Author does not exist" });
    }
  });

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
  
    const isbns = Object.keys(books);
    const matchingBooks = [];
  
    for (const isbn of isbns) {
      if (books[isbn].title.toLowerCase() === title.toLowerCase()) {
        matchingBooks.push(books[isbn]);
      }
    }
  
    if (matchingBooks.length > 0) {
      return res.status(200).json(matchingBooks);
    } else {
      return res.status(404).json({ message: "Title does not exist" });
    }
  });
  

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if(isbn in books){
    console.log(books[isbn].reviews)
    return res.status(200).json(books[isbn].reviews)
  }
  return res.status(300).json({message: "Yet to be implemented"});
});


//task 10
function getBooksWithPromise() {
    axios.get('http://localhost:5000/')
      .then((response) => {
        console.log("Books (Promise):", response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error.message);
      });
  }

  async function getBooksWithAsyncAwait() {
    try {
      const response = await axios.get('http://localhost:5000/');
      console.log("Books (async/await):", response.data);
    } catch (error) {
      console.error("Error fetching books:", error.message);
    }
  }
  

  // Task 11: Get book details by ISBN using Promise callbacks
function getBookByISBNWithPromise(isbn) {
  axios.get(`http://localhost:5000/isbn/${isbn}`)
    .then((response) => {
      console.log("Book by ISBN (Promise):", response.data);
    })
    .catch((error) => {
      console.error("Error fetching book by ISBN:", error.message);
    });
}

// Task 11 (alt): Get book details by ISBN using async/await
async function getBookByISBNWithAsyncAwait(isbn) {
  try {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    console.log("Book by ISBN (async/await):", response.data);
  } catch (error) {
    console.error("Error fetching book by ISBN:", error.message);
  }
}

// Task 12: Get book details by Author using Promise callbacks
function getBookByAuthorWithPromise(author) {
    axios.get(`http://localhost:5000/author/${encodeURIComponent(author)}`)
      .then((response) => {
        console.log("Book by Author (Promise):", response.data);
      })
      .catch((error) => {
        console.error("Error fetching book by author:", error.message);
      });
  }
  
  // Task 12 (alt): Get book details by Author using async/await
  async function getBookByAuthorWithAsyncAwait(author) {
    try {
      const response = await axios.get(`http://localhost:5000/author/${encodeURIComponent(author)}`);
      console.log("Book by Author (async/await):", response.data);
    } catch (error) {
      console.error("Error fetching book by author:", error.message);
    }
  }

// Task 13: Get book details by Title using Promise callbacks
function getBookByTitleWithPromise(title) {
    axios.get(`http://localhost:5000/title/${encodeURIComponent(title)}`)
      .then((response) => {
        console.log("Book by Title (Promise):", response.data);
      })
      .catch((error) => {
        console.error("Error fetching book by title:", error.message);
      });
  }
  
  // Task 13 (alt): Get book details by Title using async/await
  async function getBookByTitleWithAsyncAwait(title) {
    try {
      const response = await axios.get(`http://localhost:5000/title/${encodeURIComponent(title)}`);
      console.log("Book by Title (async/await):", response.data);
    } catch (error) {
      console.error("Error fetching book by title:", error.message);
    }
  }
  
module.exports.general = public_users;
