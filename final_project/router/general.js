const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
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
    return res.status(200).json(books[isbn].review)
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
