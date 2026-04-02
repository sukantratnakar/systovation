const fs = require('fs');
const path = require('path');

const authorsData = require('../data/authors.json');
const booksData = require('../data/books.json');

const authorDir = path.join(__dirname, '../public/author');

// Ensure author directory exists
if (!fs.existsSync(authorDir)) {
  fs.mkdirSync(authorDir, { recursive: true });
}

// Author page template
function generateAuthorPage(author) {
  // Get books by this author
  const authorBooks = booksData.books.filter(b => 
    b.authorId === author.id || 
    b.author?.toLowerCase().includes(author.name.toLowerCase())
  );

  const booksHTML = authorBooks.map(book => `
    <a href="/book/${book.slug}.html" class="book-card">
      <img src="${book.cover}" alt="${book.title}" loading="lazy">
      <h4>${book.title}</h4>
    </a>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${author.name} | Systovation Publishing</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+Pro:wght@300;400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/design-system.css">
  <style>
    .author-hero {
      display: flex;
      gap: 3rem;
      padding: 4rem 2rem;
      max-width: 1000px;
      margin: 0 auto;
      align-items: flex-start;
    }
    .author-photo {
      width: 250px;
      height: 250px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid var(--copper);
      flex-shrink: 0;
    }
    .author-info h1 {
      font-family: 'Libre Baskerville', serif;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    .author-role {
      color: var(--copper);
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
    }
    .author-bio {
      font-size: 1.1rem;
      line-height: 1.8;
      color: var(--cream);
    }
    .author-links {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .author-links a {
      color: var(--copper);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .author-links a:hover {
      text-decoration: underline;
    }
    .author-books {
      padding: 3rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .author-books h2 {
      font-family: 'Libre Baskerville', serif;
      margin-bottom: 2rem;
    }
    .books-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 2rem;
    }
    .book-card {
      text-decoration: none;
      color: inherit;
      transition: transform 0.2s;
    }
    .book-card:hover {
      transform: translateY(-5px);
    }
    .book-card img {
      width: 100%;
      aspect-ratio: 2/3;
      object-fit: contain;
      background: #1a1a1a;
      border-radius: 8px;
    }
    .book-card h4 {
      margin-top: 0.75rem;
      font-size: 0.95rem;
      color: var(--cream);
    }
    @media (max-width: 768px) {
      .author-hero {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      .author-links {
        justify-content: center;
      }
    }
  </style>
</head>
<body>
  <nav class="nav">
    <a href="/" class="logo">Systovation</a>
    <div class="nav-links">
      <a href="/books.html">Books</a>
      <a href="/authors.html">Authors</a>
      <a href="/get-published.html">Get Published</a>
    </div>
  </nav>

  <section class="author-hero">
    <img src="${author.photo}" alt="${author.name}" class="author-photo">
    <div class="author-info">
      <h1>${author.name}</h1>
      <p class="author-role">${author.role || 'Author'}</p>
      <p class="author-bio">${author.bio}</p>
      ${author.social ? `
      <div class="author-links">
        ${author.social.website ? `<a href="${author.social.website}" target="_blank">🌐 Website</a>` : ''}
        ${author.social.linkedin ? `<a href="${author.social.linkedin}" target="_blank">💼 LinkedIn</a>` : ''}
      </div>
      ` : ''}
    </div>
  </section>

  ${authorBooks.length > 0 ? `
  <section class="author-books">
    <h2>Books by ${author.name}</h2>
    <div class="books-grid">
      ${booksHTML}
    </div>
  </section>
  ` : ''}

  <footer class="footer">
    <p>© 2026 Systovation Publishing. A Quantraz Company.</p>
  </footer>
</body>
</html>`;
}

// Generate author pages
let count = 0;
authorsData.authors.forEach(author => {
  const html = generateAuthorPage(author);
  const filename = path.join(authorDir, `${author.slug}.html`);
  fs.writeFileSync(filename, html);
  count++;
  console.log(`✅ Generated: /author/${author.slug}.html`);
});

console.log(`\n🎉 Generated ${count} author pages`);
