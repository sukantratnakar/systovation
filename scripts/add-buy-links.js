const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '../data/books.json');
const data = JSON.parse(fs.readFileSync(booksPath, 'utf8'));

// Add buyLinks template to all books
data.books.forEach(book => {
  if (!book.buyLinks) {
    book.buyLinks = {
      amazon: "",  // To be filled with actual Amazon link
      quantraz: "https://quantraz.myshopify.com"  // Default Quantraz store
    };
  }
});

fs.writeFileSync(booksPath, JSON.stringify(data, null, 2));
console.log(`Updated ${data.books.length} books with buyLinks structure`);
