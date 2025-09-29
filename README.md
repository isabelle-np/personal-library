# Personal Library

This web app is an interactive list of my favorite books with an AI-generated analysis of my personality based off the library books.

## Features

- **Interactive Book List**: Browse through my favorite books, organized and filterable by genre and reading status.
- **Library Card Design**: Each book is displayed as a library card, with stamped dates and fictional character names as the borrower.
- **AI Personality Analysis**: Gain insights into my personality based on the books in my library, offering a unique way to learn more about me.
- **Goodreads Integration**: Clicking on a library card links to the Goodreads page for that book, allowing users to explore more details.
- **Accessibility**: The page is fully accessible and passes an axe DevTools scan with no violations.


## Technologies Used

- **Frontend**: React, Radix UI, Tailwind CSS
- **Build Tool**: Vite

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/personal-library.git
   ```

1. Install dependencies:
   ```bash
   npm install
   ```

1. Start the development server:
   ```bash
   npm run dev
   ```

## Future Enhancements
- Fully responsive layout across all devices.
- SSR implementation
- Redesign genre and status filtering to decouple.
- Implement complex state management.
- Fetch book data via API or store in DB (Goodreads no longer supports their API).
- Cards are links and not buttons to be semantically correct.
- Add unit tests for all components.
- Improve AI analysis accuracy by integrating a more advanced model.

I hope you enjoy learning more about me as an engineer and a person 📚