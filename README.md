# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Recent updates

### Experience page + Overview/Projects redesign
- Added a new **Experience** nav tab (`/experience`), between Overview and What I'm Into, and moved the Experience and Education & Skills content off the Overview page onto it.
- Split the combined Deloitte role into separate **Consultant** and **Business Technology Analyst** entries, ordered after Applied Medical (first-draft content split, pending real per-role copy).
- Reworked the Overview page: removed the toggle/accordion panels in favor of always-visible, scroll-revealed sections — a new **Current Ventures** section (BillBack, Personal Automation) followed by **Projects** (renamed from "Projects & Competitions"), rendered as a pinned, horizontally-scrolling card row of 5 clickable project cards (placeholder copy, to be filled in individually: FRW Case Competition, SEGA Case Competition, Datathon at LMU, AI Product Challenge USC Marshall, Butterworth Product Competition).
- Updated the page-bridge footer chain (Overview → Experience → What I'm Into → Ask Anything → Resume) to route through the new Experience page.
