// Tailwind runs for one reason: the delta-ui chat components are styled with
// Tailwind utilities. The site itself writes no Tailwind (see app/globals.css),
// so components/replay/delta-ui.css imports only the theme and the utilities,
// never the preflight reset, and scans only vendor/delta-ui.
const config = { plugins: { "@tailwindcss/postcss": {} } };
export default config;
