const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '../data/books.json');
const readerDir = path.join(__dirname, '../public/reader');

const data = JSON.parse(fs.readFileSync(booksPath, 'utf8'));

// Template for AnyFlip reader pages
function generateReaderPage(book) {
  // Extract AnyFlip ID from URL (e.g., https://anyflip.com/eqoah/mcyn -> eqoah/mcyn)
  const anyflipMatch = book.anyflipUrl?.match(/anyflip\.com\/([^\/]+\/[^\/]+)/);
  const anyflipId = anyflipMatch ? anyflipMatch[1] : null;
  
  if (!anyflipId) {
    console.warn(`No AnyFlip URL for: ${book.title}`);
    return null;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview: ${book.title} | Systovation Publishing</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+Pro:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --charcoal: #2C2C2C;
            --copper: #B87333;
            --cream: #FAF8F5;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Source Sans Pro', sans-serif;
            background: var(--charcoal);
            color: var(--cream);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 24px;
            background: #1a1a1a;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .back-link {
            display: flex;
            align-items: center;
            gap: 8px;
            color: rgba(255,255,255,0.7);
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.2s;
        }
        .back-link:hover { color: var(--cream); }
        .book-title {
            font-family: 'Libre Baskerville', serif;
            font-size: 1.1rem;
        }
        .buy-buttons {
            display: flex;
            gap: 12px;
        }
        .btn {
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 600;
            text-decoration: none;
            font-size: 0.85rem;
            transition: transform 0.2s;
        }
        .btn:hover { transform: translateY(-2px); }
        .btn-amazon {
            background: #FF9900;
            color: #111;
        }
        .btn-quantraz {
            background: var(--copper);
            color: white;
        }
        .reader-container {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .flipbook-frame {
            width: 100%;
            max-width: 1000px;
            height: calc(100vh - 120px);
            border: none;
            border-radius: 8px;
            background: white;
        }
        @media (max-width: 768px) {
            .header { flex-wrap: wrap; gap: 12px; }
            .book-title { order: -1; width: 100%; text-align: center; }
            .buy-buttons { width: 100%; justify-content: center; }
        }
    </style>
</head>
<body>
    <header class="header">
        <a href="/book/${book.slug}.html" class="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Book
        </a>
        <span class="book-title">${book.title}</span>
        <div class="buy-buttons">
            ${book.buyLinks?.amazon ? `<a href="${book.buyLinks.amazon}" class="btn btn-amazon" target="_blank">Buy on Amazon</a>` : ''}
            ${book.buyLinks?.quantraz ? `<a href="${book.buyLinks.quantraz}" class="btn btn-quantraz" target="_blank">Buy from Quantraz</a>` : ''}
        </div>
    </header>
    <main class="reader-container">
        <iframe 
            class="flipbook-frame" 
            src="https://online.anyflip.com/${anyflipId}/"
            allowfullscreen
            loading="lazy">
        </iframe>
    </main>
</body>
</html>`;
}

// Generate reader pages for all books
let generated = 0;
let skipped = 0;

data.books.forEach(book => {
  if (!book.anyflipUrl) {
    skipped++;
    return;
  }
  
  const html = generateReaderPage(book);
  if (html) {
    const filename = path.join(readerDir, `${book.slug}.html`);
    fs.writeFileSync(filename, html);
    generated++;
  }
});

console.log(`Generated: ${generated} reader pages`);
console.log(`Skipped: ${skipped} (no AnyFlip URL)`);
