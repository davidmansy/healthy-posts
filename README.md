# Healthy Posts

A React application for browsing posts and authors, built with modern web technologies.

## Design Decisions

### Architecture and Framework Selection
- **Lightweight React Setup**: Despite extensive experience with Next.js, I opted for a simpler Vite-based React setup to ensure timely delivery while maintaining focus on core functionality.
- **React Router Implementation**: Selected the standard React Router library rather than the Remix variant to align with the job requirements while avoiding unnecessary complexity.
- **TypeScript Integration**: Leveraged TypeScript from the start for type safety and improved developer experience.

### UI and Component Architecture
- **Component Library**: Implemented shadcn/ui components with Tailwind CSS for several key advantages:
  - Built-in accessibility compliance
  - Highly customizable design system
  - Lighter footprint compared to more opinionated libraries like Material UI
  - Consistent UI patterns across the application

### State Management
- **Server State**: Implemented React Query for data fetching and server state management, providing:
  - Automatic caching and refetching
  - Loading and error states
  - Optimistic updates
  - Simplified data synchronization

### Error Handling and Resilience
- **Error Boundaries**: Integrated react-error-boundary as a safety net to:
  - Prevent cascading failures
  - Provide graceful degradation
  - Improve user experience during unexpected errors
  - Enable component-level recovery options

### Testing Strategy
- **Unit Testing**: Implemented Vitest with React Testing Library for component testing
- **Future Testing**: Identified the need for E2E tests with Cypress for complete user flow validation

### Development Approach
- **AI-Assisted Development**: Strategically leveraged AI tools to enhance productivity in:
  - Implementation of React Router state passing
  - React Query data persistence configuration
  - UI design improvements
  - Component pattern replication
  - Documentation generation
  - Testing configuration

## Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd healthy-posts

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## Testing

The project uses Vitest for unit testing with React Testing Library.

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Project Structure

```
src/
├── app/                  # Main application components
│   ├── authors/          # Author-related components
│   └── posts/            # Post-related components
├── components/           # Reusable UI components
│   ├── typography/       # Typography components
│   └── ui/               # UI components from shadcn
├── hooks/                # Custom React hooks
└── main.tsx              # Application entry point
```

## Technologies Used

- **React**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and development server
- **React Router**: Navigation and routing
- **React Query**: Server state management
- **shadcn/ui**: Component library
- **Tailwind CSS**: Utility-first CSS framework
- **Vitest**: Unit testing
- **React Testing Library**: Component testing
- **react-error-boundary**: Error handling

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
