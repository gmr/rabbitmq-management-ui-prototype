# Design Decisions

- Use React and TypeScript for the application (`.tsx` and `.ts`)
- Use Bootstrap 5 for the layout and components
- Use contexts, hooks, and effects instead of Redux for simplicity
- Use TypeScript namespaces to create a consistent grouping of functionality and naming in models
- Make models more than interface definitions, have them contain the logic for fetching, creating, etc.
- Use local storage for the authenticated user, makes it easy to support multiple-tabs, reloading page, etc
