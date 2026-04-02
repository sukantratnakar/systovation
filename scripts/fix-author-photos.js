const fs = require('fs');
const path = require('path');

const authorsPath = path.join(__dirname, '../data/authors.json');
const photosDir = path.join(__dirname, '../public/assets/authors');

// Get actual photos available
const actualPhotos = fs.readdirSync(photosDir)
  .filter(f => f.endsWith('.jpg'))
  .map(f => f.replace('.jpg', ''));

console.log('Available photos:', actualPhotos);

const data = JSON.parse(fs.readFileSync(authorsPath, 'utf8'));

// Authors to add that we have photos for
const newAuthors = [
  {
    id: "dr-ps-rathore",
    name: "Dr. P S Rathore",
    slug: "dr-ps-rathore",
    role: "Author",
    bio: "Author and thought leader.",
    photo: "/assets/authors/dr-ps-rathore.jpg",
    books: [],
    featured: false
  },
  {
    id: "joseph-turner",
    name: "Joseph Turner",
    slug: "joseph-turner",
    role: "Author",
    bio: "Author and creative storyteller.",
    photo: "/assets/authors/joseph-turner.jpg",
    books: [],
    featured: false
  },
  {
    id: "ranjit-edward",
    name: "Ranjit Edward",
    slug: "ranjit-edward",
    role: "Author",
    bio: "Author and thought leader.",
    photo: "/assets/authors/ranjit-edward.jpg",
    books: [],
    featured: false
  },
  {
    id: "adam-and-kate",
    name: "Adam & Kate",
    slug: "adam-and-kate",
    role: "Co-Authors",
    bio: "Dynamic duo bringing fresh perspectives to readers.",
    photo: "/assets/authors/adam-and-kate.jpg",
    books: [],
    featured: false
  }
];

// Add new authors if not exists
newAuthors.forEach(newAuthor => {
  const exists = data.authors.find(a => a.id === newAuthor.id);
  if (!exists) {
    data.authors.push(newAuthor);
    console.log('Added:', newAuthor.name);
  }
});

// Fix hans-erlings -> hans-erling
data.authors.forEach(author => {
  if (author.photo === '/assets/authors/hans-erlings.jpg') {
    author.photo = '/assets/authors/hans-erling.jpg';
    console.log('Fixed path for:', author.name);
  }
});

fs.writeFileSync(authorsPath, JSON.stringify(data, null, 2));
console.log('Done! Total authors:', data.authors.length);
