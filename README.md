# AquaCore Site Vitrine

Site vitrine AquaCore développé avec `Vite + React + TypeScript`, dans un dossier séparé du dépôt source fourni en référence.

## Lancer le projet

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
```

Le build génère le dossier `dist/`.

## Déploiement Vercel

1. Importer le dossier `AquaCore-site-vitrine` dans Vercel.
2. Laisser Vercel détecter `Vite`.
3. Vérifier au besoin :
   - Build command : `npm run build`
   - Output directory : `dist`

Le fichier `vercel.json` est déjà présent pour fixer cette configuration.
