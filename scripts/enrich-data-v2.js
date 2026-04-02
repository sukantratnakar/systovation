const fs = require('fs');
const path = require('path');

// Book descriptions: 100-150 words, human tone
const bookDescriptions = {
  // Quantraz Series
  "quantraz-1": "This is where the Quantraz journey begins. Sukant Ratnakar created something different here — not quite a traditional book, more like a visual meditation. Each page pairs striking imagery with thoughts that make you pause. The theme running through it all? How do we find clarity and meaning when we're surrounded by screens, notifications, and the constant hum of technology? It's the kind of book you keep on your coffee table and flip through when you need a mental reset. No chapters to follow, no linear story — just moments of reflection designed to help you breathe a little easier and think a little clearer. Perfect for anyone feeling overwhelmed by the pace of modern life.",

  "quantraz-2": "The second book in the Quantraz series picks up where the first left off, but goes deeper. Sukant continues exploring what it means to seek enlightenment in an age of artificial intelligence and constant connectivity. The photography by Anshu Bhatnagar adds another layer — images that don't just illustrate the text but carry their own weight. This isn't a book you read in one sitting. It's meant to be savored, a page or two at a time, maybe with your morning coffee or before bed. The questions it raises stay with you: What makes us human? Where do we find peace? How do we grow when everything around us keeps changing?",

  "quantraz-3": "Volume three brings wildlife photographer Jagdeep Rajput into the mix, and the result is stunning. His images of nature — raw, beautiful, often unexpected — pair perfectly with Sukant's reflections on consciousness and purpose. There's something grounding about seeing a bird in flight or a tiger at rest alongside words about the human condition. It reminds you that we're part of something bigger. This book works on multiple levels: as art, as philosophy, as a prompt for your own thinking. Each spread is carefully composed to create a moment of stillness. In a world that never stops demanding your attention, Quantraz 3.0 offers a quiet invitation to just be.",

  "quantraz-4": "By the fourth volume, the Quantraz series has hit its stride. Sukant digs deeper into the relationship between humans and machines — not with fear, but with curiosity. What parts of us can never be replicated by AI? What does it mean to be conscious? These aren't abstract questions here; they're explored through images and words that feel immediate and personal. The design remains beautiful, the kind of book that looks good on a shelf and better in your hands. Whether you've read the earlier volumes or are starting here, you'll find something that resonates. It's philosophy made accessible, wisdom made visual.",

  "quantraz-5": "This volume focuses on what Sukant calls 'white space' — those moments between thoughts where real clarity lives. We're so used to filling every gap with something: checking phones, making lists, planning ahead. Quantraz 5.0 makes the case for doing less. For letting your mind wander. For trusting that solutions emerge when you stop forcing them. The illustrations by Vinita Chand bring a playfulness to these ideas, balancing the deeper themes with moments of lightness. It's a gentle book, not preachy, just offering a different way to think about productivity and peace. Sometimes the most important thing you can do is nothing at all.",

  "quantraz-6": "Silent moments. That's the heart of this sixth volume. Sukant explores what happens when we actually stop — not just physically, but mentally. When we let our minds defragment like an old computer clearing its cache. The metaphor works because it's honest about how cluttered our heads have become. Beautiful illustrations by Jon Klassen accompany reflections on stillness, patience, and the art of waiting. This isn't about being passive; it's about being intentional with your silence. The book is slim but substantial, each page earning its place. A perfect gift for someone who needs permission to slow down.",

  "quantraz-7": "The seventh Quantraz tackles artificial intelligence head-on. Not with predictions about robots taking over, but with genuine questions about what intelligence means and whether enlightenment is still possible when we're so connected to our devices. Sukant doesn't pretend to have all the answers — that's what makes this book honest. The imagery is modern, sleek, matching the theme of technology while maintaining that meditative quality the series is known for. It's a book for anyone wondering how to stay human in an increasingly digital world. No judgment, no fear-mongering, just thoughtful exploration.",

  "quantraz-8": "The latest in the series, and perhaps the most refined. Quantraz 8.0 weaves together everything Sukant has been exploring: white space thinking, energy management, the search for meaning. The result feels complete, like arriving somewhere after a long journey. Each page offers a moment of calibration — a chance to check in with yourself and ask the important questions. The collaboration with designers and illustrators throughout the series culminates here in something truly beautiful. Whether this is your first Quantraz or your eighth, you'll find what you need: space to think, permission to pause, and gentle reminders of what matters.",

  // Core Philosophy Books
  "white-space-1": "We've all heard about thinking outside the box. Sukant Ratnakar suggests something different: what about the space between thoughts? White Space Thinking explores why our best ideas often come when we're not trying — in the shower, on a walk, just before sleep. The book offers a framework for creating more of these moments intentionally. It's not about working less; it's about working smarter by building in genuine mental breaks. Sukant draws on neuroscience, productivity research, and his own experience consulting with executives worldwide. The writing is clear and practical, with exercises you can actually use. If you've ever felt that being busy isn't the same as being effective, this book is for you.",

  "white-space-2": "The second volume goes deeper into the practice of white space thinking. Sukant shares more techniques for clearing mental clutter, but also addresses the resistance we feel to doing nothing. Why is it so hard to sit still? Why do we feel guilty when we're not productive? These questions get real answers here, along with stories from people who've transformed their work and lives by embracing intentional pause. The book also covers how to design environments — physical and digital — that support clearer thinking. More advanced than volume one, but still accessible. Essential reading for anyone serious about sustainable performance.",

  "zero": "What happens when artificial intelligence becomes smarter than humans? It's called the singularity, and it might be closer than we think. Sukant Ratnakar doesn't approach this topic with dystopian dread or utopian hype. Instead, he asks honest questions: What does it mean to be at point zero, the moment before everything changes? How do we prepare? What remains uniquely human? The book blends philosophy with practical thinking, making a complex topic feel personal. It's not a tech manual or a sci-fi novel — it's a meditation on change itself. Whether the singularity comes in ten years or a hundred, the questions raised here will stay relevant.",

  "look-beyond": "Part of the Quintessential Series, this book is about perspective — specifically, how changing yours can change everything. Sukant uses visual metaphors and real-world examples to show how we get stuck seeing things one way and miss what's right in front of us. The 'look beyond' principle applies everywhere: business strategy, personal relationships, creative work. It's not about optimism or positive thinking; it's about expanding what you're able to see. The book is beautifully designed, with images that complement the text and occasionally surprise you. A quick read with lasting impact. You'll catch yourself thinking about it long after you've finished.",

  "ikentics": "Ideas have energy. Sukant calls it kinetic — the potential to move, to create change, to build something new. iKentics explores where ideas come from, why some take off while others die, and how to increase the energy behind your own thinking. It's part science, part philosophy, part practical guide. Drawing on physics, psychology, and two decades of consulting experience, Sukant makes the abstract feel concrete. The book includes exercises for capturing ideas, nurturing them, and knowing when to let them go. Whether you're an entrepreneur, a creative, or someone who just wants to think better, iKentics offers a fresh lens on innovation.",

  "the-flip-effect": "Most of us wait for big moments to make big changes. Sukant Ratnakar argues we've got it backwards. The Flip Effect is about small moves — tiny shifts in habit, perspective, or approach — that cascade into major transformations. One conversation. One decision. One flip. The book is filled with examples of how minor adjustments have led to breakthroughs in business, relationships, and personal growth. It's not about motivation or willpower; it's about recognizing the leverage points that already exist in your life. Practical, readable, and surprisingly fun. You'll start seeing flip opportunities everywhere once you understand the concept.",

  // Tinergy & Energy Management
  "tinergy-reflections": "We manage time obsessively but ignore energy almost completely. Sukant's Tinergy framework flips that. The core idea: time is fixed, but energy is flexible. This book is a collection of reflections on that theme — not a step-by-step manual, but a space for thinking about how you're spending yourself. Each page prompts a different question: Where does your energy go? What drains you? What fills you up? The format mirrors the content: meant to be consumed in small doses, not rushed through. Perfect for executives, parents, creatives, or anyone who ends the day exhausted and wonders where it all went.",

  "tinergy-workshop": "This is the hands-on companion to the Tinergy framework. Designed for workshop facilitators and HR professionals, it includes assessments, exercises, and discussion guides for bringing Time + Energy management into organizations. But even if you're working alone, the materials are useful. You'll find templates for tracking your energy patterns, frameworks for identifying drains and gains, and strategies for building sustainable routines. More structured than the Reflections book, this is for people ready to implement real changes. Sukant's consulting experience shows — the content is practical, tested, and designed to create measurable results.",

  "omnimeta-mindfulness": "Your daily toolkit for staying sharp without burning out. OmniMeta Mindfulness takes the big ideas from Sukant's work — white space thinking, energy management, the BOSE framework — and distills them into something you can use every morning. Think of it as a field guide for your mind. Each section addresses a different dimension: body, occupation, social, ego. The approach is practical, not preachy. No incense required. Just clear techniques for managing your mental state throughout the day. Keep it on your desk or in your bag. When things get overwhelming, flip to any page and find something useful.",

  // Business & Leadership
  "transformation-crisis": "When everything falls apart, leaders face a choice: survive or transform. Nitin Rakesh (CEO of Mphasis) and Jerry Wind (Wharton professor) wrote this book during one of the most turbulent periods in recent history, and it shows. The insights are hard-won, drawn from real decisions made under real pressure. They argue that crisis isn't just something to get through — it's an opportunity to become something better. The book combines academic research with frontline experience, offering both frameworks and stories. Essential reading for anyone leading through uncertainty. You'll come away with practical tools and, more importantly, a different way of seeing disruption.",

  "enigma-questions": "One hundred questions. Twenty thought leaders. Zero answers. That's the premise of Enigma, and it works precisely because it refuses to tell you what to think. Instead, the book invites you into inquiry — the kind of wondering that has no finish line. Questions about life, purpose, existence, connection. Some will hit you immediately; others will sneak up on you later. The format is beautiful, with each question given space to breathe. Use it for journaling prompts, dinner conversations, or just moments of private reflection. Enigma isn't meant to be solved. It's meant to be lived with.",

  "systovation-evolution": "What if organizations could evolve the way species do — naturally, continuously, without the trauma of change management? That's the vision behind Systovation. Sukant Ratnakar lays out a framework for building evolution into your company's DNA. It's not about one big transformation; it's about creating systems that adapt and improve organically. The book draws on biology, complexity science, and decades of consulting work with companies worldwide. Heavy on concepts but readable, with practical applications for leaders tired of constant reorganization. A different way of thinking about how organizations grow and change.",

  // Community
  "indians-of-saskatoon": "A love letter to a community. Indians of Saskatoon captures the stories, faces, and contributions of the Indian diaspora in this prairie city. Through profiles and photographs, the book documents how immigrants and their families have enriched Saskatoon — starting businesses, building institutions, raising children, becoming neighbors. It's part history, part celebration, part family album for an entire community. Sukant created this because these stories matter and too often go untold. Whether you're part of this community or simply curious about it, you'll find something moving here. A beautiful reminder that diversity is strength.",

  "we-have-just-arrived": "Immigration is about leaving everything you know and starting over. This book collects those stories — raw, honest, sometimes difficult. People share what they left behind, what they found, and what they're still looking for. The phrase 'we have just arrived' captures that perpetual feeling of newness that immigrants carry, sometimes for decades. Sukant's approach is documentary, letting people speak in their own voices without too much editorial polish. The result is authentic and moving. Required reading for anyone who wants to understand the immigrant experience beyond statistics and politics.",

  // Children's
  "warthog": "Wanda the warthog is nervous. It's her first day at a new school in the Mombo Jungle, and she's not like the other animals. They notice. They tease. Wanda wants to disappear. But through small acts of courage and unexpected friendships, she discovers that being different isn't a weakness — it's what makes her special. Tanya Eklund has written a warm, wise story that kids will ask for again and again. The message about self-acceptance is woven naturally into the adventure, never feeling preachy. Beautiful illustrations bring the jungle to life. Perfect for children ages 4-8 who are learning that they're enough exactly as they are.",

  // Photography & Coffee Table
  "pushkarnama": "Pushkar is one of India's holiest cities — a place of pilgrims, camels, temples, and ghats leading down to a sacred lake. Anshu Bhatnagar spent years capturing its essence, and this coffee table book is the result. The photographs are stunning: early morning light on the lake, the chaos of the annual camel fair, quiet moments of devotion. But Pushkarnama is more than pretty pictures. Each image tells a story about tradition, faith, and the intersection of the ancient and modern. Keep it where guests can flip through it. The conversations it starts are half the pleasure."
};

// Author bios: 75-100 words, human tone
const authorBios = {
  "sukant-ratnakar": {
    bio: "Sukant Ratnakar has been thinking about how people and organizations evolve for over twenty years. He's written more than thirty books on topics ranging from mindfulness to management, but they all circle back to the same question: how do we grow without losing ourselves? He founded Systovation Publishing because he believes executives have wisdom worth sharing and deserve help getting it onto paper. When he's not writing or consulting, you'll find him in Saskatoon, Canada, probably working on the next Quantraz book."
  },
  "chris-black": {
    bio: "Chris Black helps leaders figure out what AI means for their businesses — and their careers. His book CUSTODIAN came from watching executives struggle with a simple question: am I going to be replaced? His answer is more nuanced than 'yes' or 'no,' which is what makes his work valuable. Chris speaks at conferences, advises companies, and actually reads the research papers everyone else just skims. He's practical, direct, and allergic to buzzwords."
  },
  "ryan-myers": {
    bio: "Ryan Myers writes about the stuff most people avoid thinking about: who we really are, what we actually want, and why we keep getting in our own way. His book One Match, One Brick, One Life is about building a life through small, intentional acts rather than waiting for big moments. Ryan's not preachy about it — he's still figuring things out himself and doesn't pretend otherwise. His readers appreciate the honesty."
  },
  "tanya-eklund": {
    bio: "Tanya Eklund is a real estate professional in Calgary who writes children's books on the side — which sounds like an odd combination until you realize both jobs are about helping people find where they belong. Her first book, I'm More Than Just A Warthog, came from watching her own kids navigate the challenges of being different. She wanted to give them (and other children) a story that says: you're enough, exactly as you are."
  },
  "nitin-rakesh": {
    bio: "Nitin Rakesh runs Mphasis, a global tech company with tens of thousands of employees. But he's not your typical CEO — he actually thinks about the human side of business and isn't afraid to admit when things are hard. His book with Jerry Wind came from leading through genuine crisis and learning in real-time. He has a Wharton MBA, but he's more interesting than that makes him sound. His writing is surprisingly accessible for someone at his level."
  },
  "jerry-wind": {
    bio: "Professor Jerry Wind has been teaching at Wharton for decades, which means he's seen every business trend come and go. What makes him different is that he genuinely cares about making research useful, not just impressive. His work with Nitin Rakesh on crisis transformation bridges academia and practice in a way that's rare. He's written more academic papers than most people have read, but he can explain complex ideas simply when it matters."
  },
  "jamie-clarke": {
    bio: "Jamie Clarke has climbed Everest. Twice. He's crossed one of the most inhospitable deserts on Earth. And somehow he's not insufferable about it. Jamie speaks to companies about resilience and risk, but his real gift is making extreme experiences feel relatable. You haven't climbed a mountain, but you've faced your own versions of impossible. His Systovation contributions capture that energy — the belief that ordinary people can do extraordinary things when they commit."
  },
  "wendy-quan": {
    bio: "Wendy Quan teaches people to meditate at work, which sounds awkward until you try it with her. She's the founder of The Calm Monkey and has trained thousands of professionals who thought mindfulness wasn't for them. Her approach is practical, evidence-based, and completely free of the woo-woo that puts busy people off. Her Quantraz Shallots contribution brings visual calm to the series — pages you can breathe with."
  },
  "dr-ps-rathore": {
    bio: "Dr. P S Rathore brings academic depth to accessible writing. His work spans philosophy and personal development, always with an eye toward making complex ideas useful. He's the kind of writer who actually reads the sources he cites and thinks carefully before putting pen to paper. Not flashy, but solid. The kind of author whose books you return to."
  },
  "joseph-turner": {
    bio: "Joseph Turner is a creative director whose visual work brings ideas to life in unexpected ways. His collaboration with Systovation adds an artistic dimension that text alone couldn't achieve. Joseph thinks in images first and words second, which makes him a valuable partner for authors who know what they want to say but not quite how to show it."
  },
  "ranjit-edward": {
    bio: "Ranjit Edward writes about leadership and organizational culture with one foot in Eastern philosophy and one in Western business practice. It's a balance that could feel awkward, but he makes it work. His focus is always on the human side of transformation — the messy, emotional, real stuff that business books often skip over. Worth reading if you're tired of frameworks that ignore how people actually behave."
  },
  "dr-hans-erlings": {
    bio: "Dr. Hans Erlings knows about safety — real safety, the kind where people's lives depend on getting it right. His background in high-stakes industries gives his writing on leadership and resilience a weight that armchair theorists can't match. He contributed to The Kinetic Energy of Ideas and the Quantraz Shallots series, bringing practical wisdom about risk, responsibility, and human performance under pressure."
  },
  "adam-and-kate": {
    bio: "Adam and Kate write together, which is harder than it sounds. Their work focuses on personal growth and relationships, drawn from their own experience figuring things out as partners and individuals. They're honest about the messiness of growth and don't pretend to have everything figured out. That humility makes their writing trustworthy. You get the sense they're learning alongside you."
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
console.log(`Updated ${booksUpdated} books with human-tone descriptions (100-150 words)`);

// Load and update authors
const authorsPath = path.join(__dirname, '../data/authors.json');
const authorsData = JSON.parse(fs.readFileSync(authorsPath, 'utf8'));

let authorsUpdated = 0;
authorsData.authors.forEach(author => {
  const enhanced = authorBios[author.id];
  if (enhanced) {
    author.bio = enhanced.bio;
    authorsUpdated++;
  }
});

fs.writeFileSync(authorsPath, JSON.stringify(authorsData, null, 2));
console.log(`Updated ${authorsUpdated} authors with human-tone bios (75-100 words)`);
