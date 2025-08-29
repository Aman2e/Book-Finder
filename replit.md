# Overview

This is a Book Finder application built as a full-stack web application that allows users to search for books using the Open Library API. The application features a React frontend with TypeScript, Express.js backend, and PostgreSQL database with Drizzle ORM. Users can search for books by title, view book details including covers, authors, and publication years, and manage a favorites list with local storage persistence.

## Recent Changes

**Latest Enhancement (January 2025)**: Completely redesigned the UI to be more robust, eye-catching, and interactive:

- **Enhanced Visual Design**: Added gradient backgrounds, improved shadows, and modern glassmorphism effects
- **Advanced Animations**: Implemented floating animations, pulse effects, shimmer loading states, and smooth transitions
- **Interactive Elements**: Enhanced book cards with hover effects, image zoom, and animated favorite buttons
- **Dark Mode Support**: Added comprehensive dark mode toggle with system preference detection
- **Improved Search Experience**: Added animated search states, better loading indicators, and enhanced suggestion chips
- **Better Loading States**: Created engaging skeleton screens that match the final layout
- **Visual Depth**: Added backdrop blur effects, layered gradients, and improved spacing throughout

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built with **React 18** and **TypeScript**, using **Vite** as the build tool and development server. The application follows a component-based architecture with:

- **UI Framework**: Radix UI components with shadcn/ui design system for consistent, accessible components
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation schemas

The component structure separates UI components (`/components/ui/`) from feature-specific components (`/components/`), with custom hooks in `/hooks/` for reusable logic like book search functionality.

## Backend Architecture

The backend uses **Express.js** with **TypeScript** in an ESM module setup. The architecture includes:

- **API Structure**: RESTful endpoints with `/api` prefix for all application routes
- **Middleware**: Custom logging middleware for API request tracking and error handling
- **Development Setup**: Vite integration for hot module replacement in development
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage) that can be easily swapped for database persistence

## Data Storage Solutions

The application uses **PostgreSQL** as the primary database with **Drizzle ORM** for type-safe database operations:

- **Schema Definition**: Shared schema definitions in `/shared/schema.ts` using Drizzle's PostgreSQL adapter
- **User Management**: Basic user table with UUID primary keys, username, and password fields
- **Database Migrations**: Drizzle Kit for schema migrations and database management
- **Connection**: Neon Database serverless PostgreSQL for cloud hosting

The current implementation includes a fallback in-memory storage system for development, with the database schema ready for production deployment.

## External Dependencies

### Third-Party APIs
- **Open Library API**: Primary data source for book information, search, and cover images
- **Unsplash**: Fallback book cover images when Open Library covers are unavailable

### Development Tools
- **Replit Integration**: Custom Vite plugins for Replit development environment
- **TypeScript**: Full type safety across frontend, backend, and shared code
- **ESBuild**: Production bundling for the Express server

### UI and Styling
- **Radix UI**: Comprehensive component library for accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe component variant management

### State and Data Management
- **TanStack Query**: Server state management with caching and background updates
- **React Hook Form**: Form state management with minimal re-renders
- **Zod**: Runtime type validation for forms and API responses
- **Date-fns**: Date manipulation and formatting utilities

The application is designed to be easily deployable to various platforms with environment-based configuration for database connections and API endpoints.