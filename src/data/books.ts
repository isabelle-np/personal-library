/**
 * Represents a record of a book checkout.
 */
export interface CheckoutRecord {
  /** The date of the checkout. */
  date: string;
  /** The name of the patron who checked out the book. */
  borrower?: string;
  /** The color associated with the checkout record. */
  color?: 'red' | 'blue' | 'brown' | 'green';
}

/**
 * Represents a book in the library.
 */
export interface Book {
  /** The title of the book. */
  title: string;
  /** The author of the book. */
  author: string;
  /** The Dewey Decimal Classification number of the book. */
  deweyNumber?: string;
  /** A list of checkout records for the book. */
  checkouts: CheckoutRecord[];
  /** The Goodreads URL for the book. */
  goodreadsUrl?: string;
  /** A notable quote from the book. */
  quote?: string;
  /** The category of the book. */
  category: string;
}

/**
 * Represents a category of books.
 */
export interface BookCategory {
  /** The name of the category. */
  name: string;
  /** A list of books in the category. */
  books: Book[];
}

/**
 * A list of books currently being read.
 */
export const currentlyReadingBooks: Book[] = [
  {
    title: 'When Breath Becomes Air',
    author: 'Kalanithi, Paul',
    deweyNumber: '616',
    category: 'Currently Reading',
    goodreadsUrl: 'https://www.goodreads.com/book/show/25899336-when-breath-becomes-air',
    quote: 'You can’t ever reach perfection, but you can believe in an asymptote toward which you are ceaselessly striving.',
    checkouts: [
      { date: 'JAN 15 2025', borrower: 'Medical Student', color: 'blue' },
    ],
  },
  {
    title: 'Fundamentals of Software Architecture: An Engineering Approach',
    author: 'Richards, Mark',
    deweyNumber: '005',
    category: 'Currently Reading',
    goodreadsUrl: 'https://www.goodreads.com/book/show/44144493-fundamentals-of-software-architecture',
    quote: 'Conway’s law: Organizations which design systems … are constrained to produce designs which are copies of the communication structures of these organizations.',
    checkouts: [
      { date: 'FEB 01 2025', borrower: 'Senior Architect', color: 'green' },
    ],
  },
  {
    title: 'Systems Engineering Principles and Practice',
    author: 'Kossiakoff, Alexander',
    deweyNumber: '620',
    category: 'Currently Reading',
    goodreadsUrl: 'https://www.goodreads.com/book/show/832705.Systems_Engineering_Principles_and_Practice',
    quote: 'Systems engineering is fundamentally a collaborative effort that requires the integration of multiple disciplines.',
    checkouts: [
      { date: 'APR 01 2025', borrower: 'Systems Engineer', color: 'red' },
    ],
  },
];

/**
 * A list of books in the reading queue.
 */
export const queueBooks: Book[] = [
  {
    title: 'Team of Teams: New Rules of Engagement for a Complex World',
    author: 'McChrystal, Stanley',
    deweyNumber: '658',
    category: 'Queue',
    goodreadsUrl: 'https://www.goodreads.com/book/show/22529127-team-of-teams',
    quote: 'Efficiency is doing things right; effectiveness is doing the right thing.',
    checkouts: [],
  },
  {
    title: 'Antifragile: Things That Gain from Disorder',
    author: 'Taleb, Nassim Nicholas',
    deweyNumber: '003',
    category: 'Queue',
    goodreadsUrl: 'https://www.goodreads.com/book/show/13530973-antifragile',
    quote: 'The simpler, the better. Complications lead to multiplicative chains of unanticipated effects.',
    checkouts: [],
  },
  {
    title: 'Klara and the Sun',
    author: 'Ishiguro, Kazuo',
    deweyNumber: '823',
    category: 'Queue',
    goodreadsUrl: 'https://www.goodreads.com/book/show/54120408-klara-and-the-sun',
    quote: 'Hope,’ he said. ‘Damn thing never leaves you alone.',
    checkouts: [],
  },
  {
    title: 'An Elegant Puzzle: Systems of Engineering Management',
    author: 'Larson, Will',
    deweyNumber: '658',
    category: 'Queue',
    goodreadsUrl: 'https://www.goodreads.com/book/show/45303387-an-elegant-puzzle',
    quote: 'The next time you’re about to dive into fixing a complicated one-off situation, consider taking a step back and documenting the problem but not trying to solve it.',
    checkouts: [],
  },
  {
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Reid, Taylor Jenkins',
    deweyNumber: '813',
    category: 'Queue',
    goodreadsUrl: 'https://www.goodreads.com/book/show/32620332-the-seven-husbands-of-evelyn-hugo',
    quote: 'I’m under absolutely no obligation to make sense to you.',
    checkouts: [],
  },
  {
    title: 'The Wall',
    author: 'Haushofer, Marlen',
    deweyNumber: '833',
    category: 'Queue',
    goodreadsUrl: 'https://www.goodreads.com/book/show/16118.The_Wall',
    quote: 'I think time stands quite still and we move around in it, sometimes slowly and sometimes at a furious rate.',
    checkouts: [],
  },
];

/**
 * A list of book categories.
 */
export const readBooks: BookCategory[] = [
  {
    name: 'Fiction',
    books: [
      {
        title: 'Recursion',
        author: 'Crouch, Blake',
        deweyNumber: '813',
        category: 'Fiction',
        goodreadsUrl: 'https://www.goodreads.com/book/show/42046112-recursion',
        quote: "Life with a cheat code isn't life. Our existence isn't something to be engineered or optimized for the avoidance of pain. That's what it is to be human - the beauty and the pain, each meaningless without the other.",
        checkouts: [
          { date: 'JAN 15 2019', borrower: 'Helena Smith', color: 'blue' },
          { date: 'FEB 20 2019', borrower: 'Barry Sutton', color: 'red' },
          { date: 'MAR 18 2019', borrower: 'Quantum Physicist', color: 'green' },
          { date: 'APR 25 2019', borrower: 'Memory Researcher', color: 'brown' },
          { date: 'MAY 30 2019', borrower: 'Time Theorist', color: 'blue' },
        ],
      },
      {
        title: 'The Unbearable Lightness of Being',
        author: 'Kundera, Milan',
        deweyNumber: '891',
        category: 'Fiction',
        goodreadsUrl: 'https://www.goodreads.com/book/show/9717.The_Unbearable_Lightness_of_Being',
        quote: 'And what can life be worth if the first rehearsal for life is life itself?',
        checkouts: [
          { date: 'JAN 20 1968', borrower: 'Tomas', color: 'brown' },
          { date: 'FEB 18 1968', borrower: 'Tereza', color: 'red' },
          { date: 'MAR 25 1968', borrower: 'Sabina', color: 'blue' },
          { date: 'APR 30 1968', borrower: 'Franz', color: 'green' },
          { date: 'MAY 15 1969', borrower: 'Prague Reader', color: 'brown' },
        ],
      },
      {
        title: 'The Godfather (The Godfather, #1)',
        author: 'Puzo, Mario',
        deweyNumber: '813',
        category: 'Fiction',
        goodreadsUrl: 'https://www.goodreads.com/book/show/22034.The_Godfather',
        quote: 'Great men are not born great, they grow great.',
        checkouts: [
          { date: 'FEB 15 1946', borrower: 'Vito Corleone', color: 'red' },
          { date: 'MAR 12 1947', borrower: 'Michael Corleone', color: 'blue' },
          { date: 'APR 08 1948', borrower: 'Santino Corleone', color: 'brown' },
          { date: 'MAY 22 1949', borrower: 'Fredo Corleone', color: 'green' },
          { date: 'JUN 14 1950', borrower: 'Tom Hagen', color: 'red' },
          { date: 'JUL 30 1951', borrower: 'Luca Brasi', color: 'blue' },
        ],
      },
      {
        title: 'The Secret Lives of People in Love',
        author: 'Van Booy, Simon',
        deweyNumber: '813',
        category: 'Fiction',
        goodreadsUrl: 'https://www.goodreads.com/book/show/534571.The_Secret_Lives_of_People_in_Love',
        quote: 'Without memory, he thought, man would be invincible',
        checkouts: [
          { date: 'SEP 12 2010', borrower: 'Contemporary Reader', color: 'red' },
          { date: 'OCT 08 2011', borrower: 'Literary Student', color: 'blue' },
          { date: 'NOV 14 2012', borrower: 'Romance Scholar', color: 'brown' },
          { date: 'DEC 22 2013', borrower: 'Book Club Member', color: 'green' },
          { date: 'JAN 18 2014', borrower: 'Fiction Lover', color: 'red' },
          { date: 'FEB 25 2015', borrower: 'Short Story Fan', color: 'blue' },
          { date: 'MAR 30 2016', borrower: 'Modern Reader', color: 'brown' },
        ],
      },
      {
        title: 'Circe',
        author: 'Miller, Madeline',
        deweyNumber: '813',
        category: 'Fiction',
        goodreadsUrl: 'https://www.goodreads.com/book/show/35959740-circe',
        quote: 'But in a solitary life, there are rare moments when another soul dips near yours, as stars once a year brush the earth. Such a constellation was he to me.',
        checkouts: [
          { date: 'Ancient Era', borrower: 'Odysseus', color: 'blue' },
          { date: 'Mythic Time', borrower: 'Hermes', color: 'green' },
          { date: 'Golden Age', borrower: 'Athena', color: 'red' },
          { date: 'Divine Epoch', borrower: 'Apollo', color: 'brown' },
          { date: 'Timeless', borrower: 'Penelope', color: 'blue' },
        ],
      },
      {
        title: 'The Rose Code',
        author: 'Quinn, Kate',
        deweyNumber: '813',
        category: 'Fiction',
        goodreadsUrl: 'https://www.goodreads.com/book/show/53914938-the-rose-code',
        quote: 'We are not going quietly into the night. We are not fading away. We are here to stay.',
        checkouts: [
          { date: 'MAR 15 1940', borrower: 'Osla Fleming', color: 'green' },
          { date: 'JUN 20 1941', borrower: 'Mab Churt', color: 'blue' },
          { date: 'SEP 12 1942', borrower: 'Beth Finch', color: 'red' },
          { date: 'DEC 18 1943', borrower: 'Bletchley Codebreaker', color: 'brown' },
          { date: 'FEB 25 1944', borrower: 'Intelligence Officer', color: 'green' },
        ],
      },
      {
        title: 'Animal Farm',
        author: 'Orwell, George',
        deweyNumber: '823',
        category: 'Fiction',
        goodreadsUrl: 'https://www.goodreads.com/book/show/170448.Animal_Farm',
        quote: 'All animals are equal, but some animals are more equal than others.',
        checkouts: [
          { date: 'MAY 10 1945', borrower: 'Napoleon', color: 'green' },
          { date: 'JUN 15 1945', borrower: 'Snowball', color: 'blue' },
          { date: 'JUL 22 1945', borrower: 'Boxer', color: 'red' },
          { date: 'AUG 30 1945', borrower: 'Squealer', color: 'brown' },
          { date: 'SEP 18 1945', borrower: 'Old Major', color: 'green' },
        ],
      },
      {
        title: 'Station Eleven',
        author: 'Mandel, Emily St. John',
        deweyNumber: '813',
        category: 'Fiction',
        goodreadsUrl: 'https://www.goodreads.com/book/show/20170404-station-eleven',
        quote: 'Survival is insufficient.',
        checkouts: [
          { date: 'OCT 15 2014', borrower: 'Kirsten Raymonde', color: 'blue' },
          { date: 'NOV 22 2014', borrower: 'Arthur Leander', color: 'red' },
          { date: 'DEC 18 2014', borrower: 'Jeevan Chaudhary', color: 'green' },
          { date: 'JAN 25 2015', borrower: 'Clark Thompson', color: 'brown' },
          { date: 'FEB 28 2015', borrower: 'Miranda Carroll', color: 'blue' },
          { date: 'MAR 30 2015', borrower: 'Tyler Leander', color: 'red' },
        ],
      },
    ],
  },
  {
    name: 'Non-Fiction',
    books: [
      {
        title: 'Smoke Gets in Your Eyes: And Other Lessons from the Crematory',
        author: 'Doughty, Caitlin',
        deweyNumber: '393',
        category: 'Non-Fiction',
        goodreadsUrl: 'https://www.goodreads.com/book/show/25189315-smoke-gets-in-your-eyes-other-lessons-from-the-crematory',
        quote: 'Accepting death doesn\'t destroy hope. Quite the opposite. It frees you to live.',
        checkouts: [
          { date: 'OCT 12 2014', borrower: 'Mortuary Student', color: 'blue' },
          { date: 'NOV 20 2015', borrower: 'Death Positive Reader', color: 'red' },
          { date: 'DEC 15 2016', borrower: 'Funeral Director', color: 'brown' },
          { date: 'JAN 25 2017', borrower: 'Philosophy Student', color: 'green' },
          { date: 'FEB 28 2018', borrower: 'Medical Professional', color: 'blue' },
          { date: 'MAR 18 2019', borrower: 'Life Coach', color: 'red' },
        ],
      },
      {
        title: 'An Ideal Presence',
        author: 'Berti, Eduardo',
        deweyNumber: '863',
        category: 'Non-Fiction',
        goodreadsUrl: 'https://www.goodreads.com/book/show/56233032-an-ideal-presence',
        quote: 'Sometimes the most profound truths are found in the spaces between words.',
        checkouts: [
          { date: 'FEB 14 2020', borrower: 'Literary Critic', color: 'brown' },
          { date: 'MAR 22 2021', borrower: 'Translation Scholar', color: 'red' },
          { date: 'APR 18 2022', borrower: 'Contemporary Reader', color: 'blue' },
          { date: 'MAY 25 2023', borrower: 'Book Reviewer', color: 'green' },
          { date: 'JUN 30 2024', borrower: 'Fiction Explorer', color: 'brown' },
        ],
      },
      {
        title: 'From Here to the Great Unknown',
        author: 'Presley, Lisa Marie',
        deweyNumber: '782',
        category: 'Non-Fiction',
        goodreadsUrl: 'https://www.goodreads.com/book/show/204905217-from-here-to-the-great-unknown',
        quote: 'Music was the language we spoke when words weren\'t enough.',
        checkouts: [
          { date: 'OCT 08 2024', borrower: 'Music Biographer', color: 'red' },
          { date: 'NOV 15 2024', borrower: 'Memoir Reader', color: 'blue' },
          { date: 'DEC 20 2024', borrower: 'Cultural Historian', color: 'brown' },
          { date: 'JAN 10 2025', borrower: 'Music Journalist', color: 'green' },
          { date: 'FEB 14 2025', borrower: 'Fan Biographer', color: 'red' },
        ],
      },
    ],
  },
  {
    name: 'Business & Tech',
    books: [
      {
        title: 'Thinking In Systems: A Primer',
        author: 'Meadows, Donella H.',
        deweyNumber: '003',
        category: 'Business & Tech',
        goodreadsUrl: 'https://www.goodreads.com/book/show/3828902-thinking-in-systems',
        quote: 'We can\'t impose our will on a system. We can listen to what the system tells us, and discover how its properties and our values can work together.',
        checkouts: [
          { date: 'MAR 15 2008', borrower: 'Systems Analyst', color: 'green' },
          { date: 'JUN 22 2009', borrower: 'Complexity Theorist', color: 'blue' },
          { date: 'SEP 18 2010', borrower: 'Policy Researcher', color: 'red' },
          { date: 'DEC 05 2011', borrower: 'Sustainability Expert', color: 'brown' },
          { date: 'FEB 28 2012', borrower: 'Design Thinker', color: 'green' },
          { date: 'MAY 10 2013', borrower: 'Systems Engineer', color: 'blue' },
        ],
      },
      {
        title: 'Scaling People: Tactics for Management and Company Building',
        author: 'Johnson, Claire Hughes',
        deweyNumber: '658',
        category: 'Business & Tech',
        goodreadsUrl: 'https://www.goodreads.com/book/show/63063173-scaling-people',
        quote: 'The best managers are multipliers—they make everyone around them better.',
        checkouts: [
          { date: 'SEP 12 2023', borrower: 'COO', color: 'red' },
          { date: 'OCT 25 2023', borrower: 'Head of Operations', color: 'blue' },
          { date: 'NOV 18 2023', borrower: 'VP People', color: 'brown' },
          { date: 'DEC 20 2023', borrower: 'Startup Founder', color: 'green' },
          { date: 'JAN 15 2024', borrower: 'HR Director', color: 'red' },
          { date: 'FEB 28 2024', borrower: 'Executive Coach', color: 'blue' },
        ],
      },
      {
        title: 'Ways of Seeing',
        author: 'Berger, John',
        deweyNumber: '701',
        category: 'Business & Tech',
        goodreadsUrl: 'https://www.goodreads.com/book/show/2784.Ways_of_Seeing',
        quote: 'The relation between what we see and what we know is never settled.',
        checkouts: [
          { date: 'JAN 08 1972', borrower: 'Art Critic', color: 'blue' },
          { date: 'FEB 15 1973', borrower: 'Visual Studies Prof', color: 'red' },
          { date: 'MAR 20 1974', borrower: 'Media Theorist', color: 'green' },
          { date: 'APR 25 1975', borrower: 'Cultural Analyst', color: 'brown' },
          { date: 'MAY 30 1976', borrower: 'Design Student', color: 'blue' },
          { date: 'JUN 18 1977', borrower: 'Photography Scholar', color: 'red' },
        ],
      },
      {
        title: 'Software Engineering at Google: Lessons Learned from Programming Over Time',
        author: 'Winters, Titus',
        deweyNumber: '005',
        category: 'Business & Tech',
        goodreadsUrl: 'https://www.goodreads.com/book/show/48816586-software-engineering-at-google',
        quote: 'Software engineering is programming integrated over time.',
        checkouts: [
          { date: 'MAR 20 2020', borrower: 'Senior Engineer', color: 'blue' },
          { date: 'JUN 15 2020', borrower: 'Tech Lead', color: 'red' },
          { date: 'SEP 08 2020', borrower: 'Engineering Manager', color: 'green' },
          { date: 'DEC 10 2020', borrower: 'Site Reliability Engineer', color: 'brown' },
          { date: 'MAR 22 2021', borrower: 'Principal Engineer', color: 'blue' },
          { date: 'JUN 18 2021', borrower: 'Software Architect', color: 'red' },
        ],
      },
      {
        title: 'Narconomics: How to Run a Drug Cartel',
        author: 'Wainwright, Tom',
        deweyNumber: '364',
        category: 'Business & Tech',
        goodreadsUrl: 'goodreads.com/book/show/25275733-narconomics',
        quote: 'The most important thing to understand about organized crime is that it is, above all, organized.',
        checkouts: [
          { date: 'FEB 12 2016', borrower: 'Economics Professor', color: 'red' },
          { date: 'MAY 18 2016', borrower: 'Policy Analyst', color: 'blue' },
          { date: 'AUG 25 2016', borrower: 'Criminology Student', color: 'brown' },
          { date: 'NOV 14 2016', borrower: 'Business Strategist', color: 'green' },
          { date: 'FEB 20 2017', borrower: 'Law Enforcement', color: 'red' },
          { date: 'MAY 30 2017', borrower: 'Journalist', color: 'blue' },
        ],
      },
      {
        title: 'The Manager\'s Path: A Guide for Tech Leaders Navigating Growth and Change',
        author: 'Fournier, Camille',
        deweyNumber: '658',
        category: 'Business & Tech',
        goodreadsUrl: 'https://www.goodreads.com/book/show/33369254-the-manager-s-path',
        quote: 'The hardest part about management is that you\'re responsible for outcomes, but you can\'t actually do the work yourself anymore.',
        checkouts: [
          { date: 'MAR 14 2017', borrower: 'Tech Lead', color: 'green' },
          { date: 'JUN 22 2017', borrower: 'Engineering Manager', color: 'blue' },
          { date: 'SEP 18 2017', borrower: 'VP Engineering', color: 'red' },
          { date: 'DEC 05 2017', borrower: 'CTO', color: 'brown' },
          { date: 'MAR 20 2018', borrower: 'Senior Manager', color: 'green' },
          { date: 'JUN 15 2018', borrower: 'Director', color: 'blue' },
        ],
      },
      {
        title: 'Resilient Management',
        author: 'Hogan, Lara',
        deweyNumber: '658',
        category: 'Business & Tech',
        goodreadsUrl: 'https://www.goodreads.com/book/show/45767533-resilient-management',
        quote: 'Great managers are made when they understand that their job is to help their team succeed, not to be the one who succeeds.',
        checkouts: [
          { date: 'JAN 15 2019', borrower: 'Engineering Manager', color: 'blue' },
          { date: 'APR 22 2019', borrower: 'Team Lead', color: 'green' },
          { date: 'JUL 18 2019', borrower: 'People Manager', color: 'red' },
          { date: 'OCT 25 2019', borrower: 'Director', color: 'brown' },
          { date: 'JAN 30 2020', borrower: 'VP Engineering', color: 'blue' },
          { date: 'MAY 12 2020', borrower: 'Senior Manager', color: 'green' },
        ],
      },
      {
        title: 'Fundamentals of Software Architecture: An Engineering Approach',
        author: 'Richards, Mark',
        deweyNumber: '005',
        category: 'Business & Tech',
        goodreadsUrl: 'https://www.goodreads.com/book/show/44144493-fundamentals-of-software-architecture',
        quote: 'Everything in software architecture is a trade-off.',
        checkouts: [
          { date: 'FEB 20 2020', borrower: 'Senior Architect', color: 'green' },
          { date: 'MAY 15 2020', borrower: 'Principal Engineer', color: 'blue' },
          { date: 'AUG 22 2020', borrower: 'Tech Lead', color: 'red' },
          { date: 'NOV 18 2020', borrower: 'Engineering Manager', color: 'brown' },
          { date: 'FEB 25 2021', borrower: 'Software Architect', color: 'green' },
          { date: 'MAY 30 2021', borrower: 'Distinguished Engineer', color: 'blue' },
        ],
      },
      {
        title: 'The Design of Everyday Things',
        author: 'Norman, Don',
        deweyNumber: '745',
        category: 'Business & Tech',
        goodreadsUrl: 'https://www.goodreads.com/book/show/840.The_Design_of_Everyday_Things',
        quote: 'Good design is actually a lot harder to notice than poor design, in part because good designs fit our needs so well that the design is invisible.',
        checkouts: [
          { date: 'JUN 15 1988', borrower: 'UX Designer', color: 'blue' },
          { date: 'SEP 22 1990', borrower: 'Product Manager', color: 'red' },
          { date: 'JAN 18 1995', borrower: 'Industrial Designer', color: 'green' },
          { date: 'MAR 25 2000', borrower: 'Human Factors Expert', color: 'brown' },
          { date: 'JUL 14 2005', borrower: 'Interface Designer', color: 'blue' },
          { date: 'OCT 30 2010', borrower: 'Design Researcher', color: 'red' },
        ],
      },
    ],
  },
];