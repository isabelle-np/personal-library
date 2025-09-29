# Personal Library

[This web app](https://personal-library-rvm5-kvibllwdw-isabelle-nps-projects.vercel.app/) is an interactive list of my favorite books with an AI-generated analysis of my personality based on the library books.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Future Enhancements](#future-enhancements)


## Features

- **Interactive Book List**: Browse through my favorite books, organized and filterable by genre and reading status.
- **Library Card Design**: Each book is displayed as a library card, with stamped dates and fictional character names as the borrower.
- **AI Personality Analysis**: Gain insights into my personality based on the books in my library, offering a unique way to learn more about me.
- **Goodreads Integration**: Clicking on a library card links to the Goodreads page for that book, allowing users to explore more details.
- **Accessibility**: The page is fully accessible and passes an axe DevTools scan with no violations.

## Technologies Used

- **UI and Frontend**: React, Radix UI, Tailwind CSS
- **Build Tool**: Vite
- **Carousel**: Embla Carousel React
- **Icons**: Lucide React
- **Utilities**: clsx, class-variance-authority, tailwind-merge
- **Testing**: Jest, Testing Library (React, User Event, Jest DOM)
- **TypeScript Support**: Type definitions for Jest, Node, React DOM
- **Hosting**: Vercel
- **Accessibility Testing**: axe DevTools
- **Design**: Figma ([Mockup Link](https://www.figma.com/design/mve6jeokcjEJyzakmuNN4a/Library-Mock-Up?node-id=0-1&t=yrb0pyCtnYjoHgCl-1))

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/personal-library.git
   ```

2. Navigate to the project directory:
   ```bash
   cd personal-library
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

Please ensure your code adheres to the project's coding standards and includes relevant tests.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Future Enhancements

- Fully responsive layout across all devices.
- Server-Side Rendering (SSR) implementation for better performance and SEO.
- Redesign genre and status filtering to decouple logic and improve maintainability.
- Implement complex state management using a robust library like Redux or Zustand.
- Fetch book data via API or store in a database (Goodreads no longer supports their API).
- Ensure semantic correctness by using links instead of buttons for navigation.
- Add comprehensive unit tests for all components to improve reliability.
- Improve AI analysis accuracy by integrating a more advanced model.
- Analytics insights to track user interactions, such as most viewed books or genres.
- AI-powered recommendations for new books based on current books.
- Screen reader testing with NVDA to ensure accessibility for visually impaired users.
- Adopt a feature-based folder structure for better scalability and maintainability.
- Use a robust state management library like Redux Toolkit or Zustand for predictable state handling.
- Achieve at least 80% test coverage and add end-to-end (E2E) tests using Cypress or Playwright.
- Enable strict mode in TypeScript and define reusable types/interfaces for API responses and component props.
- Use design tokens for consistent theming and consider CSS-in-JS libraries for dynamic styling needs.
- Perform manual accessibility testing with screen readers and add keyboard navigation tests.
- Optimize performance with React.memo, useCallback, code-splitting, and lazy loading.
- Implement a service layer for API calls and use caching libraries like React Query or SWR.
- Set up CI/CD pipelines with GitHub Actions or CircleCI for automated testing and deployment.
- Add API documentation, a contribution guide, and a changelog for better collaboration.
- Implement a global error boundary and log errors to a service like Sentry.
- Sanitize user inputs, use HTTPS, and audit dependencies for vulnerabilities.
- Integrate analytics tools like Google Analytics or Mixpanel to track user interactions.
- Plan for horizontal scaling with Docker and serverless functions.

I hope you enjoy learning more about me as an engineer and a person 📚