# Design Decisions

- Will attempt to keep general usage / UX similar, but use as an opportunity to improve the UX
- Use React and TypeScript for the application (`.tsx` and `.ts`)
- Use @reach/router for application routing, is cleaner and smaller than alternatives IMO
- Use Bootstrap 5 for the layout and components
- Build with I18N from the start, will provide full internationalization using i18n-next and React components
- Use contexts, hooks, and effects instead of Redux for simplicity
- Use TypeScript namespaces to create a consistent grouping of functionality and naming in models
- Make models more than interface definitions, have them contain the logic for fetching, creating, etc.
- Use local storage for the authenticated user, makes it easy to support multiple-tabs, reloading page, etc
- Will use Font-Awesome Free for icons license is a combo of MIT and CC BY 4.0 if we use SVG icons
