const fs = require('fs');
const path = require('path');

// Enhanced book descriptions based on content understanding
const bookDescriptions = {
  // Quantraz Series - Philosophy on enlightenment
  "quantraz-1": "The inaugural volume of the Quantraz series. A meditative exploration of enlightenment in an era dominated by artificial intelligence. Through evocative imagery and profound quotes, readers are invited to pause, reflect, and seek clarity amid digital noise.",
  "quantraz-2": "The second journey in the Quantraz series. Visual poetry meets philosophical inquiry as Sukant Ratnakar continues to explore the space between stimulus and response—where human wisdom meets technological advancement.",
  "quantraz-3": "Volume three of the celebrated Quantraz series. Stunning photography by Jagdeep Rajput accompanies reflections on consciousness, purpose, and the eternal quest for meaning in a rapidly evolving world.",
  "quantraz-4": "Quantraz continues its philosophical voyage. This fourth volume delves deeper into artificial intelligence's impact on human consciousness, questioning what remains uniquely human when machines can think.",
  "quantraz-5": "White space moments for calibrating thoughts. Volume five offers readers a sanctuary—a place to defragment the mind, reclaim scattered energies, and realign with what truly matters.",
  "quantraz-6": "Silent moments where the mind defragments. The sixth Quantraz explores the power of pause—those precious intervals between thoughts where insight is born and clarity emerges.",
  "quantraz-7": "In search of enlightenment, in the age of artificial intelligence. Volume seven confronts the paradox of seeking ancient wisdom while surrounded by cutting-edge technology. How do we remain human while embracing the machine age?",
  "quantraz-8": "White space moments—where the mind defragments, reclaims energies, and calibrates thoughts. The latest in the series offers a visual meditation on finding stillness in an increasingly accelerated world.",
  
  // Core Philosophy Books
  "white-space-1": "The definitive guide to White Space Thinking. In a world of constant noise, this book reveals the transformative power of mental space—the gaps between thoughts where creativity flourishes and decisions gain clarity.",
  "white-space-2": "The sequel deepens the exploration of White Space Thinking. Advanced techniques for creating mental clarity, managing cognitive load, and designing a life with intentional pauses built into its rhythm.",
  "zero": "An exploration of the technological singularity—that moment when artificial intelligence surpasses human intelligence. What comes before? What happens after? And what does it mean to be human at point zero?",
  "look-beyond": "Part of the Quintessential Series, Look Beyond challenges readers to see past the obvious. A visual and philosophical journey into perspective thinking, revealing hidden patterns and deeper truths.",
  "ikentics": "The Science of Ideas. Every idea carries energy—potential waiting to become kinetic. This book explores how to recognize, nurture, and unleash the kinetic energy of innovation in business and life.",
  "the-flip-effect": "Small Moves. Big Shifts. One Flip at a Time. The Flip Effect reveals how tiny changes in perspective, habit, or approach can cascade into transformative results. A practical philosophy for personal and professional evolution.",
  
  // Tinergy & Energy Management
  "tinergy-reflections": "When time is limited, focus on energy. Tinergy (Time + Energy) introduces a revolutionary framework for managing your most precious resources. Think about your thinking. Optimize your energy, not just your calendar.",
  "tinergy-workshop": "Workshop materials for the Tinergy Management Program. A hands-on guide for implementing the Tinergy framework in organizations, with exercises, assessments, and implementation strategies.",
  "omnimeta-mindfulness": "Your go-to toolkit for staying sharp, balanced, and focused. Rooted in the BOSE Framework (Body, Occupation, Social, Ego) and MetaCycle methodology—practical mindfulness for modern professionals.",
  
  // Business & Leadership
  "transformation-crisis": "When crisis strikes, transformation becomes possible. Nitin Rakesh and Jerry Wind reveal how visionary leaders turn disruption into opportunity, combining Wharton research with real-world experience from the trenches.",
  "enigma-questions": "One hundred questions from twenty thought leaders. No answers—just profound inquiries that span the mysteries of existence. Enigma is not meant to be solved; it's meant to be lived.",
  "systovation-evolution": "A framework for organizational evolution. Systovation presents a self-sustaining approach where systems naturally evolve, adapt, and improve—moving beyond change management to evolution management.",
  "singularity": "The Evolution Game. A strategic exploration of how organizations and individuals can navigate the path toward technological singularity while maintaining humanity, purpose, and competitive advantage.",
  
  // Community & Regional
  "indians-of-saskatoon": "A celebration of the Indian community in Saskatoon, Canada. Profiles, stories, and photographs capturing the vibrant diaspora that has enriched this prairie city with culture, enterprise, and community spirit.",
  "we-have-just-arrived": "Immigration stories from those who made Canada home. Raw, honest, and inspiring accounts of leaving everything behind and building new lives in a new land.",
  "community-connect-2": "Community Connect keeps neighborhoods talking. This second volume captures stories, events, and connections from the Willowridge community—proof that strong neighborhoods build strong cities.",
  
  // Children's
  "warthog": "In the lush Mombo Jungle, Wanda the warthog faces her first day at a new school. Teased for being different, she learns that courage, kindness, and true friendship can transform even the hardest situations. A heartwarming tale for young readers about self-acceptance and belonging.",
  
  // QUDO Platform
  "qudo-user-guide": "The comprehensive guide to the QUDO platform. Learn to leverage the 4X Energy System for maximum productivity and well-being—a practical tool built on the principles of Tinergy and White Space Thinking.",
  "qudo-intro": "An introduction to QUDO—the digital platform that operationalizes the Tinergy framework. Discover how to track, optimize, and sustain your energy across all life domains.",
  "qudo-4x": "The QUDO 4X Energy System explained. Four dimensions of energy management that work together to create sustainable high performance without burnout.",
  
  // Photography & Coffee Table Books
  "pushkarnama": "A stunning visual journey through Pushkar, Rajasthan. Anshu Bhatnagar's lens captures the sacred, the vibrant, and the eternal in one of India's most mystical cities.",
  "homeguards-uttarakhand": "Honoring the Homeguards of Uttarakhand. A coffee table tribute to the men and women who protect and serve in India's mountain state.",
  "awwa": "Army Wives Welfare Association 2023. Celebrating the strength, resilience, and contributions of military families who serve alongside those in uniform."
};

// Enhanced author bios based on research
const authorBios = {
  "sukant-ratnakar": {
    name: "Sukant Ratnakar",
    role: "Founder & Publisher",
    bio: "Sukant Ratnakar is a management consultant, philosopher, and author of over 30 books spanning business strategy, mindfulness, and personal evolution. The creator of Quantraz (a philosophy of enlightenment for the AI age), Tinergy (Time + Energy management), and White Space Thinking, Sukant brings two decades of global consulting experience to his writing. He founded Systovation Publishing to help executives share their wisdom with the world.",
    website: "https://sukantratnakar.com",
    linkedin: "https://linkedin.com/in/sukantratnakar"
  },
  "chris-black": {
    name: "Chris Black",
    role: "Leadership Author",
    bio: "Chris Black is a leadership strategist helping executives navigate the AI transformation era. His book CUSTODIAN: How To Lead, Grow And Win In The Age Of AI provides a practical playbook for leaders facing technological disruption. A sought-after speaker and advisor, Chris combines deep industry experience with forward-looking insights on human-machine collaboration.",
    website: null,
    linkedin: null
  },
  "ryan-myers": {
    name: "Ryan Myers",
    role: "Author & Coach",
    bio: "Ryan Myers writes about personal alignment, awareness, and the journey to wholeness. His work, including One Match, One Brick, One Life, invites readers into quiet contemplation and practical self-discovery. Ryan believes that transformation begins with small, intentional steps—one match lit, one brick laid, one life fully lived.",
    website: null,
    linkedin: null
  },
  "tanya-eklund": {
    name: "Tanya Eklund",
    role: "Children's Author",
    bio: "Tanya Eklund brings meaningful stories to young readers. A successful real estate professional in Calgary, Tanya channels her creative energy into children's literature that teaches self-worth, courage, and the importance of embracing who we truly are. Her debut book, I'm More Than Just A Warthog, has resonated with children and parents alike.",
    website: null,
    linkedin: null
  },
  "nitin-rakesh": {
    name: "Nitin Rakesh",
    role: "CEO & Author",
    bio: "Nitin Rakesh is the CEO of Mphasis, a leading global technology services company. A visionary business leader, Nitin has steered digital transformation initiatives across industries. His book Transformation in Times of Crisis (co-authored with Jerry Wind) draws on real-world leadership experience during unprecedented global disruption. He holds an MBA from the Wharton School.",
    website: null,
    linkedin: "https://linkedin.com/in/nitinrakesh"
  },
  "jerry-wind": {
    name: "Jerry Wind",
    role: "Professor & Author",
    bio: "Professor Yoram (Jerry) Wind is The Lauder Professor Emeritus and Professor of Marketing at The Wharton School, University of Pennsylvania. A world-renowned expert in marketing strategy and organizational transformation, Jerry has authored numerous influential books and advised Fortune 500 companies globally. His research bridges academia and practice.",
    website: null,
    linkedin: null
  },
  "jamie-clarke": {
    name: "Jamie Clarke",
    role: "Adventurer & Author",
    bio: "Jamie Clarke has summited Mount Everest twice, crossed the Arabian Desert's Empty Quarter, and inspired millions through his adventures. A Hall of Fame speaker, Jamie shares lessons from extreme environments that apply to business and life. His Systovation work captures the mindset required to achieve the seemingly impossible.",
    website: "https://jamieclarke.com",
    linkedin: null
  },
  "wendy-quan": {
    name: "Wendy Quan",
    role: "Mindfulness Expert",
    bio: "Wendy Quan is the founder of The Calm Monkey, specializing in workplace mindfulness and meditation. She has trained thousands of professionals to manage stress, increase focus, and navigate change with presence. Her contributions to the Quantraz Shallots series bring mindfulness principles to visual meditation.",
    website: null,
    linkedin: null
  },
  "dr-ps-rathore": {
    name: "Dr. P S Rathore",
    role: "Author",
    bio: "Dr. P S Rathore brings academic rigor and practical wisdom to his writing. His work spans philosophy, science, and personal development—always with an eye toward making complex ideas accessible to everyday readers.",
    website: null,
    linkedin: null
  },
  "joseph-turner": {
    name: "Joseph Turner",
    role: "Creative Director",
    bio: "Joseph Turner is a creative storyteller and visual artist whose work brings ideas to life through imagery and narrative. His collaboration with Systovation Publishing adds a unique artistic dimension to the catalog.",
    website: null,
    linkedin: null
  },
  "ranjit-edward": {
    name: "Ranjit Edward",
    role: "Author",
    bio: "Ranjit Edward is a thought leader whose work bridges Eastern philosophy and Western business practice. His contributions focus on leadership, organizational culture, and the human side of transformation.",
    website: null,
    linkedin: null
  },
  "dr-hans-erlings": {
    name: "Dr. Hans Erlings",
    role: "Safety & Leadership Expert",
    bio: "Dr. Hans Erlings is an expert in organizational safety, productivity, and transformational leadership. His work with high-stakes industries informs his writing on risk, resilience, and human performance. A contributor to The Kinetic Energy of Ideas and the Quantraz Shallots series.",
    website: null,
    linkedin: null
  },
  "adam-and-kate": {
    name: "Adam & Kate",
    role: "Co-Authors",
    bio: "Adam Kolozetti and Kate bring complementary perspectives to their collaborative writing. Their work focuses on personal growth, relationships, and finding balance in an increasingly complex world.",
    website: null,
    linkedin: null
  }
};

// Load and update books
const booksPath = path.join(__dirname, '../data/books.json');
const booksData = JSON.parse(fs.readFileSync(booksPath, 'utf8'));

booksData.books.forEach(book => {
  // Update description if we have an enhanced one
  if (bookDescriptions[book.id]) {
    book.description = bookDescriptions[book.id];
  }
  
  // Add gallery and video arrays if not present
  if (!book.images) book.images = [];
  if (!book.videos) book.videos = [];
});

fs.writeFileSync(booksPath, JSON.stringify(booksData, null, 2));
console.log(`Updated ${booksData.books.length} books with descriptions, gallery, and video support`);

// Load and update authors
const authorsPath = path.join(__dirname, '../data/authors.json');
const authorsData = JSON.parse(fs.readFileSync(authorsPath, 'utf8'));

authorsData.authors.forEach(author => {
  const enhanced = authorBios[author.id];
  if (enhanced) {
    author.bio = enhanced.bio;
    author.role = enhanced.role;
    if (enhanced.website) {
      author.social = author.social || {};
      author.social.website = enhanced.website;
    }
    if (enhanced.linkedin) {
      author.social = author.social || {};
      author.social.linkedin = enhanced.linkedin;
    }
  }
});

fs.writeFileSync(authorsPath, JSON.stringify(authorsData, null, 2));
console.log(`Updated ${authorsData.authors.length} authors with enhanced bios`);
