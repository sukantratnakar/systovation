#!/usr/bin/env node

/**
 * Generate book detail and reader pages from books.json
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const PUBLIC_DIR = path.join(__dirname, '../public');
const BOOK_TEMPLATE = path.join(PUBLIC_DIR, 'book/template.html');
const READER_TEMPLATE = path.join(PUBLIC_DIR, 'reader/template.html');

function loadBooks() {
    const booksPath = path.join(DATA_DIR, 'books.json');
    if (!fs.existsSync(booksPath)) {
        console.log('No books.json found');
        return [];
    }
    const data = JSON.parse(fs.readFileSync(booksPath, 'utf8'));
    return data.books || [];
}

function generateBookPage(book, template) {
    let html = template;
    
    const replacements = {
        '{{BOOK_TITLE}}': book.title,
        '{{BOOK_SLUG}}': book.slug,
        '{{BOOK_AUTHOR}}': book.author,
        '{{BOOK_DESCRIPTION}}': book.description || book.shortDescription || '',
        '{{BOOK_COVER}}': book.cover || '/assets/covers/placeholder.jpg',
        '{{BOOK_GENRE}}': book.genre || 'General',
        '{{BOOK_PAGES}}': book.pages || '—',
        '{{PREVIEW_PAGES}}': book.previewPages || 10,
        '{{BUY_LINK}}': book.buyLinks?.amazon || '#',
        '{{AUTHOR_BIO}}': book.authorBio || 'Bio coming soon.',
        '{{BADGE}}': book.badge || ''
    };
    
    for (const [key, value] of Object.entries(replacements)) {
        html = html.replace(new RegExp(key.replace(/[{}]/g, '\\$&'), 'g'), value);
    }
    
    return html;
}

function generateReaderPage(book, template) {
    let html = template;
    
    const replacements = {
        '{{BOOK_TITLE}}': book.title,
        '{{BOOK_SLUG}}': book.slug,
        '{{BOOK_AUTHOR}}': book.author,
        '{{PREVIEW_PAGES}}': book.previewPages || 10,
        '{{PDF_PATH}}': book.pdfPath || '/assets/pdfs/sample.pdf',
        '{{BUY_LINK}}': book.buyLinks?.amazon || '#'
    };
    
    for (const [key, value] of Object.entries(replacements)) {
        html = html.replace(new RegExp(key.replace(/[{}]/g, '\\$&'), 'g'), value);
    }
    
    return html;
}

function main() {
    console.log('🚀 Generating Systovation pages...\n');
    
    const books = loadBooks();
    console.log(`Found ${books.length} books\n`);
    
    if (books.length === 0) {
        console.log('No books to generate pages for.');
        return;
    }
    
    // Ensure directories exist
    fs.mkdirSync(path.join(PUBLIC_DIR, 'book'), { recursive: true });
    fs.mkdirSync(path.join(PUBLIC_DIR, 'reader'), { recursive: true });
    
    // Load templates
    const bookTemplate = fs.readFileSync(BOOK_TEMPLATE, 'utf8');
    const readerTemplate = fs.readFileSync(READER_TEMPLATE, 'utf8');
    
    let generated = 0;
    
    for (const book of books) {
        if (!book.slug) {
            book.slug = book.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        }
        
        // Generate book detail page
        const bookHtml = generateBookPage(book, bookTemplate);
        const bookPath = path.join(PUBLIC_DIR, 'book', `${book.slug}.html`);
        fs.writeFileSync(bookPath, bookHtml);
        console.log(`✅ Generated: /book/${book.slug}.html`);
        
        // Generate reader page
        const readerHtml = generateReaderPage(book, readerTemplate);
        const readerPath = path.join(PUBLIC_DIR, 'reader', `${book.slug}.html`);
        fs.writeFileSync(readerPath, readerHtml);
        console.log(`✅ Generated: /reader/${book.slug}.html`);
        
        generated++;
    }
    
    // Copy books.json to public/data for client-side access
    fs.mkdirSync(path.join(PUBLIC_DIR, 'data'), { recursive: true });
    fs.copyFileSync(
        path.join(DATA_DIR, 'books.json'),
        path.join(PUBLIC_DIR, 'data/books.json')
    );
    console.log('\n✅ Copied books.json to public/data/');
    
    console.log(`\n🎉 Generated ${generated * 2} pages for ${generated} books`);
}

main();
