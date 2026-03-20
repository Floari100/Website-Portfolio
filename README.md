# Florian Rexhaj – Portfolio Redesign

Modernisiertes Portfolio auf Basis von React + Vite.

## Neu in dieser Version
- komplettes Redesign
- Fokus auf Projekte statt Spiel / Gimmicks
- cleaner, ruhiger, Apple-inspirierter Look
- aktuelle Projekte wie Swyte integriert
- Filter für Projektbereiche
- funktionierende Navigation, Theme Toggle, Copy-Mail-Button
- optimiert für Desktop und Mobile

## Entwicklung lokal starten
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
```

## GitHub Pages / Repo-Deployment
Die `base` in `vite.config.js` ist aktuell auf `/Website-Portfolio/` gesetzt.
Das passt, wenn dein Repository genau so heißt.

Falls du den Repo-Namen änderst, musst du die `base` ebenfalls anpassen.

## Netlify
Die Seite kann auch direkt mit Netlify deployt werden.
Build command:
```bash
npm run build
```
Publish directory:
```bash
dist
```
