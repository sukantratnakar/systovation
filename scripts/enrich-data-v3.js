const fs = require('fs');
const path = require('path');

// Remaining book descriptions: 100-150 words, human tone
const bookDescriptions = {
  // Shallots Series (Visual meditation books)
  "shallots-indus-cafe": "The Shallots series captures moments — visual pauses for busy minds. This edition features photography from Indus Cafe, a place where food and culture intersect. Anshu Bhatnagar's camera finds beauty in the everyday: steam rising from a cup, hands breaking bread, the geometry of a well-set table. It's a coffee table book in the truest sense — meant to be there when you need a moment of calm. Flip to any page, let your eyes rest, and feel your shoulders drop. The Quantraz philosophy applied to visual storytelling: sometimes you don't need words, you need space.",

  "shallots-wendy-quan": "Wendy Quan brings her mindfulness expertise to the Shallots series, and it shows. This visual meditation book pairs calming imagery with her understanding of how we actually relax — not through trying harder, but through letting go. Each spread is designed to slow your breathing and quiet your mind. No instructions, no exercises, just beauty doing what beauty does. Keep it where you'll see it. Let it interrupt your busy day. Wendy knows that peace isn't something you achieve; it's something you allow. This book creates the conditions for allowing.",

  "shallots-hans-25": "Dr. Hans Erlings contributes to the Shallots visual meditation series with his characteristic depth. SH25 draws on his understanding of human performance and resilience, translated into images that ground and center. The photographs aren't random — they're chosen to trigger specific states: calm, focus, clarity. It's neuroscience made beautiful. Whether you're preparing for a difficult conversation or recovering from one, these pages offer a reset. Part of the larger Quantraz ecosystem of tools for thinking better and feeling more yourself.",

  "shallots-hans-26": "The follow-up to SH25, this Shallots edition continues Dr. Hans Erlings' visual exploration of calm under pressure. New images, same intention: give your overworked mind somewhere to rest. Hans brings his background in high-stakes environments to bear — he knows what real stress looks like and what actually helps. These aren't generic relaxation pictures; they're carefully selected moments designed to shift your state. Use it before meetings, after long days, whenever you need to come back to yourself.",

  "shallots-jamie-clarke": "Jamie Clarke has seen things most of us only imagine — Everest summits, desert crossings, the edge of human endurance. His Shallots contribution brings that perspective to the page. The images aren't all mountains and adventure; some are quiet, intimate, surprisingly ordinary. That's the point. Jamie knows that the skills you need in extreme environments are the same ones you need in everyday life: presence, patience, the ability to find calm when everything's chaos. A visual meditation from someone who's lived it.",

  "shallots-enta": "A Shallots edition created in collaboration with Enta Solutions. This visual meditation book blends business context with the calming aesthetic the series is known for. It's a corporate gift that's actually useful — not another branded item destined for a drawer, but something people will keep on their desks and actually look at. The Quantraz approach to corporate wellness: subtle, beautiful, effective. Each page offers a brief escape from screens and deadlines, a reminder that you're human first and professional second.",

  // Government & Institutional
  "dhami-vision-2025": "A coffee table book documenting the vision of Pushkar Singh Dhami, Chief Minister of Uttarakhand. This isn't political propaganda — it's documentation. What does a leader see when they look at their state? What do they hope it becomes? Anshu Bhatnagar's photography captures Uttarakhand's beauty alongside the challenges of governance in a mountainous region. The book serves as both record and aspiration, showing where things are and where they could go. Commissioned work that rises above the genre.",

  "awwa": "The Army Wives Welfare Association 2023 coffee table book honors the women who serve alongside those in uniform. Military families sacrifice in ways that rarely make headlines — constant moves, long separations, the particular stress of loving someone in harm's way. This book makes that invisible labor visible. Through photographs and profiles, it celebrates resilience, community, and the strength it takes to build a home on uncertain ground. A tribute to women who hold everything together.",

  "homeguards-uttarakhand": "A coffee table tribute to the Homeguards of Uttarakhand — the men and women who protect and serve in India's mountain state. Anshu Bhatnagar's photography captures both the grandeur of the landscape and the humanity of those who patrol it. It's easy to overlook the people who keep things running, especially in remote regions. This book refuses to overlook them. Each page is a reminder that safety isn't automatic; it's the result of people showing up, day after day, doing difficult work.",

  "gst": "When India rolled out the Goods and Services Tax, it was one of the largest tax reforms in history. This coffee table book documents that transformation — not the policy debates, but the human story. The businesses adapting, the officials implementing, the systems coming online. It's economic history told through photographs and thoughtful design. A record of change at scale. Whether you were directly involved in GST implementation or simply lived through it, this book captures a moment that changed how a billion people do business.",

  // Platform & Technology
  "qudo-user-guide": "QUDO is the digital platform that brings Sukant's Tinergy framework to life. This user guide walks you through everything: setting up your profile, tracking energy across life domains, understanding the patterns that emerge. It's practical, step-by-step, designed for people who want results without a steep learning curve. Screenshots, tips, and explanations that assume you're smart but busy. Whether you're using QUDO for personal development or rolling it out to a team, this guide gets you there faster.",

  "qudo-intro": "Not sure if QUDO is for you? This introduction explains the why before the how. What's the problem QUDO solves? How does tracking energy differ from tracking time? What can you actually expect if you commit to the platform? The intro is honest about what QUDO is and isn't — it won't magically fix your life, but it will give you better data about how you're spending yourself. For skeptics and curious minds who need to understand before they commit.",

  "qudo-4x": "The 4X Energy System is the engine behind QUDO — four dimensions of energy that need to be managed for sustainable high performance. This guide goes deep on each dimension: what it means, how to measure it, and what to do when it's low. It's the theory made practical, with exercises and assessments you can use immediately. If you've been feeling burned out despite managing your time well, the 4X system explains why and shows you what to do about it.",

  // Corporate & Business
  "quantraz-corporate": "The Quantraz corporate presentation, designed for organizations curious about the evolution ecosystem. This isn't a typical deck; it's a visual introduction to how Quantraz thinks about change, growth, and transformation. Clean design, clear concepts, the kind of materials that make conversations easier. Use it to introduce Quantraz to your team or to understand what an engagement might look like. Business development materials that don't feel like business development materials.",

  "singularity": "The Evolution Game. Sukant Ratnakar presents a strategic framework for navigating the path toward technological singularity. It's game-like in the best sense — clear rules, defined moves, but infinite complexity in execution. How do you position yourself (or your organization) for a future that's radically uncertain? Singularity offers a way of thinking about that question without pretending to know the answers. For strategists, futurists, and anyone who takes long-term thinking seriously.",

  // Community Publications
  "community-connect-2": "Community Connect is Sukant's neighborhood newsletter, and this second volume continues the tradition. Local news, event recaps, profiles of neighbors doing interesting things. It sounds simple because it is — but that's the point. Strong communities are built on knowing each other's names and stories. This newsletter makes that happen in Willowridge. If you live there, it's your newsletter. If you don't, it's a model for what community media can be.",

  "community-connect-oct25": "The October 2025 edition of Community Connect. What's happening in Willowridge? Who's new? What events are coming up? It's hyper-local journalism in the best sense: the stuff that matters most to the people who live somewhere specific. Sukant started this because he believes neighbors should know each other, and a newsletter is one way to make that happen. Proof that media doesn't have to be big to be meaningful.",

  "marten": "A Quantraz Shallots edition created for Marten. Like all Shallots, it's a visual meditation — a collection of images designed to calm and center. The corporate partnership brings these materials to a specific audience while maintaining the quality and intention the series is known for. Beautiful enough to keep, useful enough to return to. A gift that keeps giving, one mindful moment at a time."
};

// Additional author bios for anyone missing
const authorBios = {
  "anshu-bhatnagar": {
    name: "Anshu Bhatnagar",
    role: "Photographer & Designer",
    bio: "Anshu Bhatnagar sees things most of us miss. His photography has documented everything from sacred cities to government initiatives, always with an eye for the story within the scene. Beyond the camera, Anshu is a designer whose work shapes how Quantraz books feel in your hands. He's the visual half of many collaborations in this catalog — the person who turns ideas into images and manuscripts into beautiful objects."
  },
  "collective": {
    name: "Collective Authors",
    role: "Multi-Author Works",
    bio: "Some books are too big for one voice. The collective works in the Systovation catalog bring together multiple authors, each contributing their expertise to a larger whole. Whether it's twenty thought leaders posing questions in Enigma or industry experts sharing perspectives, these collaborations capture wisdom that no single author could offer alone."
  }
};

// Load and update books
const booksPath = path.join(__dirname, '../data/books.json');
const booksData = JSON.parse(fs.readFileSync(booksPath, 'utf8'));

let booksUpdated = 0;
booksData.books.forEach(book => {
  if (bookDescriptions[book.id]) {
    book.description = bookDescriptions[book.id];
    booksUpdated++;
  }
});

fs.writeFileSync(booksPath, JSON.stringify(booksData, null, 2));
console.log(`Updated ${booksUpdated} additional books`);

// Load and update authors
const authorsPath = path.join(__dirname, '../data/authors.json');
const authorsData = JSON.parse(fs.readFileSync(authorsPath, 'utf8'));

// Add new authors if they don't exist
Object.entries(authorBios).forEach(([id, data]) => {
  const exists = authorsData.authors.find(a => a.id === id);
  if (!exists) {
    authorsData.authors.push({
      id: id,
      name: data.name,
      slug: id,
      role: data.role,
      bio: data.bio,
      photo: `/assets/authors/${id}.jpg`,
      books: [],
      featured: false
    });
    console.log(`Added author: ${data.name}`);
  } else {
    exists.bio = data.bio;
    exists.role = data.role;
    console.log(`Updated author: ${data.name}`);
  }
});

fs.writeFileSync(authorsPath, JSON.stringify(authorsData, null, 2));
console.log(`Total authors: ${authorsData.authors.length}`);
