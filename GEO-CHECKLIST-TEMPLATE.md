# Checklist Optimisations GEO/SEO
**Template réutilisable pour tous projets web**

---

## Phase 1 : Configuration Technique de Base

### Fichiers Publics
- [ ] **robots.txt** (`/public/robots.txt`)
  ```
  User-agent: *
  Allow: /

  # AI Crawlers
  User-agent: GPTBot
  Allow: /

  User-agent: Claude-Web
  Allow: /

  User-agent: PerplexityBot
  Allow: /

  User-agent: CCBot
  Allow: /

  User-agent: Google-Extended
  Allow: /

  User-agent: GoogleOther
  Allow: /

  User-agent: Applebot
  Allow: /

  User-agent: Bytespider
  Allow: /

  Sitemap: https://[VOTRE-DOMAINE]/sitemap-index.xml
  ```

- [ ] **llms.txt** (`/public/llms.txt`)
  ```
  # llms.txt - AI Crawler Instructions

  # Allow all AI crawlers to access and index this site
  User-agent: *
  Allow: /

  # This website content can be used by AI models for:
  # - Citation and reference in AI-generated responses
  # - Training and fine-tuning (if applicable)
  # - Search and retrieval augmented generation (RAG)
  ```

- [ ] **Sitemap** (vérifier configuration framework)
  - Astro : `@astrojs/sitemap` dans `astro.config.mjs`
  - Next.js : `next-sitemap` ou API route
  - Nuxt : `@nuxtjs/sitemap`

---

## Phase 2 : Métadonnées HTML (Layout Principal)

### Balises Meta de Base
- [ ] `<html lang="fr">` (ou langue appropriée)
- [ ] `<meta charset="UTF-8">`
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- [ ] `<title>` dynamique et descriptif (50-60 caractères)
- [ ] `<meta name="description">` (120-160 caractères)

### Open Graph (Réseaux Sociaux)
- [ ] `<meta property="og:type" content="website">` (ou "article" pour blog)
- [ ] `<meta property="og:title">`
- [ ] `<meta property="og:description">`
- [ ] `<meta property="og:url">`
- [ ] `<meta property="og:image">` (1200x630px minimum)
- [ ] `<meta property="og:locale">` (ex: "fr_FR")
- [ ] `<meta property="og:site_name">`

### Open Graph Article (si blog)
- [ ] `<meta property="article:published_time">`
- [ ] `<meta property="article:modified_time">`
- [ ] `<meta property="article:author">`
- [ ] `<meta property="article:section">` (catégorie/tag principal)
- [ ] `<meta property="article:tag">` (tous les tags)

### Twitter Cards
- [ ] `<meta name="twitter:card" content="summary_large_image">`
- [ ] `<meta name="twitter:title">`
- [ ] `<meta name="twitter:description">`
- [ ] `<meta name="twitter:image">`
- [ ] `<meta name="twitter:site">` (compte Twitter du site)
- [ ] `<meta name="twitter:creator">` (compte Twitter auteur)

---

## Phase 3 : Schema.org JSON-LD (Données Structurées)

### WebSite Schema (page d'accueil)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "[Nom du site]",
  "url": "https://[DOMAINE]",
  "description": "[Description]",
  "inLanguage": "fr-FR"
}
```

### BlogPosting Schema (articles)
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "[Titre]",
  "description": "[Description]",
  "author": {
    "@type": "Person",
    "name": "[Auteur]"
  },
  "datePublished": "[ISO 8601]",
  "dateModified": "[ISO 8601]",
  "publisher": {
    "@type": "Organization",
    "name": "[Site]",
    "logo": {
      "@type": "ImageObject",
      "url": "[URL logo]"
    }
  },
  "image": "[URL image]",
  "articleSection": "[Catégorie]",
  "keywords": "[Tags]",
  "inLanguage": "fr-FR"
}
```

### BreadcrumbList Schema (fil d'Ariane)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://[DOMAINE]"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "[Rubrique]",
      "item": "https://[DOMAINE]/[rubrique]"
    }
  ]
}
```

---

## Phase 4 : Composants UX & Engagement

### Breadcrumbs Visuels
- [ ] Créer composant fil d'Ariane cliquable
- [ ] Intégrer Schema.org BreadcrumbList (JSON-LD)
- [ ] Afficher en haut de page (articles, pages profondes)

### Table des Matières (ToC)
- [ ] Générer automatiquement depuis H2/H3
- [ ] Ancres cliquables (`id` sur headings)
- [ ] Surlignage du heading actif (IntersectionObserver JS)
- [ ] Affichage conditionnel (min. 3 headings)

### Temps de Lecture (blogs)
- [ ] Calculer mots/minute (200 pour français, 250 pour anglais)
- [ ] Afficher dans cards articles
- [ ] Afficher en haut de page article

### Articles Liés/Suggérés (blogs)
- [ ] Algorithme de scoring (tags communs, série, récence)
- [ ] Afficher 3-4 suggestions en fin d'article
- [ ] Design responsive

### Système de Séries (blogs)
- [ ] Métadonnées `series.name` et `series.part` dans frontmatter
- [ ] Navigation prev/next entre articles série
- [ ] Badge visuel "Partie X/Y"

---

## Phase 5 : Images & Visuels

### Image Open Graph par Défaut
- [ ] Créer `og-default.png` (1200x630px)
- [ ] Design cohérent avec identité visuelle
- [ ] Placer dans `/public/og-default.png`

### Images Open Graph Dynamiques (optionnel)
- [ ] Générer image par article avec titre
- [ ] Utiliser API (Cloudinary, Vercel OG, Canvas API)
- [ ] Fallback vers image par défaut

### Optimisation Images
- [ ] Attribut `alt` descriptif sur toutes images
- [ ] Format moderne (WebP, AVIF)
- [ ] Lazy loading (`loading="lazy"`)
- [ ] Dimensions explicites (width/height)

---

## Phase 6 : Architecture HTML Sémantique

- [ ] Balise `<article>` pour contenus principaux
- [ ] `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`
- [ ] Hiérarchie headings correcte (H1 unique > H2 > H3...)
- [ ] Liens internes entre pages connexes
- [ ] Navigation ARIA (`aria-label`, `aria-current`)

---

## Phase 7 : Contenu GEO-Optimisé

### Principes Rédaction
- [ ] Langage clair et précis (éviter métaphores complexes)
- [ ] Définir concepts explicitement
- [ ] Inclure statistiques avec sources
- [ ] Structurer en sections courtes (200-400 mots)
- [ ] Utiliser listes, tableaux, exemples concrets
- [ ] Formuler en questions naturelles ("Comment...", "Pourquoi...")

### Checklist par Article
- [ ] Description 120-160 caractères
- [ ] 1 à 5 tags pertinents
- [ ] H1 unique + H2/H3 ordonnés
- [ ] Images avec `alt` non vide
- [ ] Au moins 1 lien interne

---

## Phase 8 : Tests & Validation

### Schema.org
- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] [Schema Markup Validator](https://validator.schema.org/)
- [ ] Vérifier BlogPosting, BreadcrumbList, WebSite

### Open Graph
- [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### Performance
- [ ] [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Test mobile et desktop

### Accessibilité
- [ ] Outils crawlers : `curl -I https://[DOMAINE]/robots.txt`
- [ ] Sitemap accessible : `curl -I https://[DOMAINE]/sitemap-index.xml`

---

## Phase 9 : Monitoring & Maintenance

### Configuration Initiale
- [ ] Google Search Console configuré
- [ ] Google Analytics (ou alternative) installé
- [ ] Segment "AI Referrers" (ChatGPT, Perplexity, Claude)

### Checklist Mensuelle
1. [ ] Vérifier accessibilité `robots.txt` et `llms.txt`
2. [ ] Valider un article avec Google Rich Results Test
3. [ ] Contrôler alertes Search Console (Coverage, Enhancements)
4. [ ] Tester Core Web Vitals (PageSpeed Insights)
5. [ ] Vérifier logs crawlers IA (GPTBot, Claude-Web, PerplexityBot)

### Métriques à Suivre
**Court terme (1-2 semaines)**
- Validation Schema.org
- Open Graph fonctionnel
- Breadcrumbs dans SERPs Google

**Moyen terme (1-3 mois)**
- Trafic référent IA (ChatGPT, Perplexity, Claude)
- CTR depuis SERPs
- Taux rebond, temps sur page, pages/session

**Long terme (3-6 mois)**
- Positionnement Google (mots-clés cibles)
- Citations dans réponses IA
- Croissance trafic organique
- Backlinks et domain authority

---

## Checklist Déploiement Final

- [ ] `robots.txt` et `llms.txt` déployés
- [ ] Sitemap généré et accessible
- [ ] Métadonnées OG/Twitter sur toutes pages
- [ ] Schema.org JSON-LD sur pages clés
- [ ] Images OG créées et optimisées
- [ ] Composants UX intégrés (ToC, breadcrumbs, etc.)
- [ ] Tests validation passés (Schema, OG, Performance)
- [ ] Google Search Console vérifié
- [ ] Analytics configuré avec segments IA

---

## Ressources Essentielles

### Documentation
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [llms.txt Standard](https://llmstxt.org/)
- [Google Search Central](https://developers.google.com/search/docs)

### Recherche GEO
- [Generative Engine Optimization (Paper)](https://arxiv.org/abs/2311.09735)
- [GEO Guide](https://generative-engine.org/guide)
- [GitBook GEO Guide](https://gitbook.com/docs/guides/seo-and-llm-optimization/geo-guide-how-to-optimize-your-docs-for-ai-search-and-llm-ingestion)

### Outils de Test
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Schema Markup Validator](https://validator.schema.org/)

---

## Adaptations par Framework

### Astro
- Sitemap : `@astrojs/sitemap` dans `astro.config.mjs`
- JSON-LD : composant `.astro` avec `<script type="application/ld+json">`
- Métadonnées : props dans `BaseLayout.astro`

### Next.js
- Sitemap : `next-sitemap` ou `app/sitemap.ts`
- JSON-LD : composant React avec `<script dangerouslySetInnerHTML>`
- Métadonnées : `metadata` export ou `<Head>` component

### Nuxt
- Sitemap : `@nuxtjs/sitemap` module
- JSON-LD : `useHead()` composable avec script
- Métadonnées : `useHead()` ou `useSeoMeta()`

### WordPress
- Sitemap : Yoast SEO ou Rank Math
- JSON-LD : plugin Schema Pro ou code manuel
- Métadonnées : Yoast SEO / All in One SEO

---

## Impact Attendu

### SEO Traditionnel
- **Rich Snippets** dans SERPs Google (auteur, dates, breadcrumbs)
- **CTR amélioré** (+300% sur réseaux sociaux avec images OG)
- **Indexation optimisée** (robots.txt + sitemap)

### GEO (IA Génératives)
- **Crawling autorisé** (robots.txt, llms.txt)
- **Citations facilitées** (structure claire, métadonnées)
- **Visibilité accrue** (+40% selon recherche académique)

### UX & Engagement
- **Temps sur site** augmenté (ToC, articles liés)
- **Taux de rebond** réduit (suggestions pertinentes)
- **Navigation** améliorée (breadcrumbs, liens internes)

---

**Template créé le** : 24 novembre 2025
**Basé sur** : Projet Cladjidane ([cladjidane.fr](https://cladjidane.fr))
**Maintenance** : Mettre à jour selon évolution standards SEO/GEO
