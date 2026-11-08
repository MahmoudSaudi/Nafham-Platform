# Nafham Platform - Frontend UI Documentation

Welcome to the comprehensive documentation for the Nafham Platform User Interface. This document outlines the architectural decisions, structural organization, development workflows, and operational instructions essential for contributing to this Next.js application.

---

## Project Organization

The repository strictly adheres to a Feature-Sliced Design (FSD) architecture, a highly scalable methodology designed for robust, enterprise-level frontend applications.

### Architectural Rationale
The primary objective of this structure is separation of concerns. Instead of grouping files strictly by type (e.g., all components together, all hooks together), files are grouped by their business domain (e.g., all files related to the "Courses" feature are encapsulated together). 

### Best Practices Enforced
1. **Encapsulation:** Features must not have circular dependencies. A feature should only expose what is necessary through an explicit API or boundary.
2. **Reusability:** Shared UI elements (like buttons, modals, and generic tables) are separated from business logic and placed in a global components directory.
3. **Decoupled Logic:** Data fetching and side effects are extracted into custom hooks (utilizing React Query), keeping React components focused purely on rendering.

---

## File Architecture

Understanding the project topology is critical for rapid navigation and effective contribution.

### Directory Tree Breakdown

* `app/`
  Contains the Next.js App Router files (`page.tsx`, `layout.tsx`). These files act merely as entry points and wrappers, delegating the actual UI rendering to feature components.
* `src/`
  * `features/`
    The core of the application. Contains distinct business modules. Examples include `admin`, `courses`, and `notifications`. Inside each feature directory:
    * `components/`: UI components specific to this feature.
    * `hooks/`: Custom React hooks encapsulating business logic and data fetching.
    * `api/`: API call definitions related to the feature.
    * `types.ts`: TypeScript interfaces and type definitions.
  * `components/`
    * `ui/`: Generic, reusable, and stateless UI elements (e.g., `Pagination`, `CustomSelect`, `Modal`).
    * `shared/`: Components shared across multiple features (e.g., `Navbar`, `Footer`, `Sidebar`).
  * `services/`
    Contains centralized configurations for external interactions, primarily `apiClient.ts` which manages Axios instances and interceptors.
  * `tests/`
    Contains setup files and test suites utilizing Vitest and React Testing Library.

---

## Development Workflow

To ensure high code quality and prevent regression, developers must adhere to the following workflow when implementing new features or resolving bugs:

### 1. Feature Implementation
When adding a new feature, first determine if it belongs to an existing domain or requires a new directory under `src/features/`. 
Develop the UI components and extract any data-fetching logic into a custom hook within the feature's `hooks/` directory.

### 2. Code Integration
Ensure that your components do not import dependencies from sibling features directly unless absolutely necessary. Rely on shared components and services. Run linting tools before committing to ensure adherence to the established style guide.

### 3. Testing
This project utilizes Vitest. Before integrating code:
- Write unit tests for custom hooks.
- Write component tests for complex UI interactions.
- Run the entire test suite locally to verify that no existing functionality has been broken.

---

## User Experience (UX)

The user experience is designed to be highly responsive, accessible, and intuitive.

### Core UX Principles
- **State Feedback:** The UI must always communicate its current state. Loading spinners are displayed during data fetching, and toast notifications provide immediate feedback on success or failure of mutations.
- **Empty States:** Whenever a query returns no data (e.g., an empty table), a visually appealing empty state is rendered instead of a technical error message or a blank screen. This guides the user and clarifies system status.
- **Progressive Disclosure:** Complex interfaces, particularly in the Admin Dashboard, utilize pagination, tabs, and drawers to prevent cognitive overload.
- **Graceful Error Handling:** If an API request fails, the system intercepts the error centrally, preventing application crashes and displaying user-friendly fallback UI.

---

## Running the Project

Follow these instructions to set up the development environment successfully.

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Setup Instructions

1. **Install Dependencies:**
   Navigate to the root of the frontend project and execute the following command:
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env.local` file in the root directory and configure the necessary environment variables. Minimum required variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

### Common Troubleshooting

- **API Connection Errors:**
  If the application fails to fetch data, ensure the backend server is running and the `NEXT_PUBLIC_API_URL` environment variable points to the correct local port.
- **Caching Issues:**
  Next.js and React Query cache aggressively. If changes are not reflecting, try clearing the browser cache, restarting the development server, or clearing the `.next` directory.
- **Port Conflicts:**
  If port 3000 is occupied, you can specify a different port using `npm run dev -- -p 3001`.
