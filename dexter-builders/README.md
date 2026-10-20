# Dexter Builders website (React + Vite)

## Run
    npm install
    npm run dev       # development
    npm run build     # production build in /dist

## Edit content
- All text, contact details, services and projects: `src/data.js`
- Photos: `public/images/` (overwrite a file with the same name, or change the path in `src/data.js`)
- Add a project: copy a block in `projects`, give it a new `slug`, add its photos. The card and detail page appear automatically.
- Colors and fonts: top of `src/styles.css`
