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

## Publication du site officiel

Le domaine officiel `https://aquacorecontrol.fr/` est servi depuis le VPS OVHcloud et **n'est pas automatiquement mis à jour par Vercel**.

Après chaque modification validée de la vitrine, lancer `PUBLIER_SITE_OFFICIEL.cmd`. Le raccourci :

1. construit la vitrine ;
2. transfère une nouvelle release sur le VPS ;
3. bascule le domaine officiel de façon atomique ;
4. vérifie que `aquacorecontrol.fr` sert bien le JavaScript de la nouvelle version.

Une publication n'est considérée terminée qu'après cette dernière vérification.
