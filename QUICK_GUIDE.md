# 🎯 Guide Rapide - Certifications Abir-AI

> Guide visuel de 2 minutes pour comprendre la structure

---

## 🏗️ Architecture en 3 Niveaux

```
┌─────────────────────────────────────────┐
│         NIVEAU 1: PAGE PILIER           │
│      /certifications (Hub central)       │
│                                          │
│  • Vue d'ensemble de 4 certifications   │
│  • FAQ + How It Works                   │
│  • CTA vers chaque certification        │
└─────────────┬───────────────────────────┘
              │
              ├──────────────┬──────────────┬──────────────┐
              │              │              │              │
┌─────────────▼───┐ ┌────────▼──────┐ ┌────▼────────┐ ┌──▼──────────┐
│ NIVEAU 2:       │ │ NIVEAU 2:     │ │ NIVEAU 2:   │ │ NIVEAU 2:   │
│ Certification 1 │ │ Certification 2│ │ Certif. 3   │ │ Certif. 4   │
│                 │ │               │ │             │ │             │
│ 🥇 Gen AI       │ │ 🥈 Productivity│ │ 🥉 Business │ │ 🟠 Ethics   │
│ Practitioner    │ │ & Copilot     │ │ Operations  │ │ & Governance│
└─────────────────┘ └───────────────┘ └─────────────┘ └─────────────┘
        │                   │                │               │
        └───────────────────┴────────────────┴───────────────┘
                            │
                ┌───────────▼───────────┐
                │   NIVEAU 3: WIDGETS   │
                │                       │
                │ • CertificationCard   │
                │ • Recommended Widget  │
                │                       │
                │ Utilisables partout!  │
                └───────────────────────┘
```

---

## 📊 Les 4 Certifications en un Coup d'Œil

| Icône | Nom | Slug | Audience | Prix |
|-------|-----|------|----------|------|
| 🥇 | **Gen AI Practitioner** | `generative-ai-practitioner` | Débutants | 299€ |
| 🥈 | **AI Productivity** | `ai-productivity-github-copilot` | Devs | 349€ |
| 🥉 | **Business AI** | `generative-ai-business-operations` | Managers | 399€ |
| 🟠 | **Responsible AI** | `ai-governance-responsible-ai-foundations` | Tous | 349€ |

---

## 🎨 Couleurs par Certification

```
🥇  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓  Blue → Cyan
🥈  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓  Purple → Pink
🥉  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓  Orange → Red
🟠  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓  Green → Emerald
```

---

## 🔗 Liens Internes - Flow Utilisateur

```
Homepage
   │
   ├─→ Click "Get Certified"
   │
   ▼
/certifications (Page Pilier)
   │
   ├─→ Click sur une certification
   │
   ▼
/certifications/[slug] (Page individuelle)
   │
   ├─→ "Enroll Now" → Formulaire inscription
   │
   └─→ "Related Certifications" → Autres certifs
```

---

## 📱 Responsive Design

```
📱 MOBILE (< 768px)
┌─────────┐
│  Card 1 │
├─────────┤
│  Card 2 │
├─────────┤
│  Card 3 │
├─────────┤
│  Card 4 │
└─────────┘

💻 DESKTOP (> 1024px)
┌─────────┬─────────┐
│  Card 1 │  Card 2 │
├─────────┼─────────┤
│  Card 3 │  Card 4 │
└─────────┴─────────┘
```

---

## ⚡ Actions Rapides

### Ajouter une Certification

```typescript
// 1. Éditer data/certifications.ts
export const certifications = [
  // ... existantes
  {
    id: '5',
    title: 'Ma Nouvelle Certif',
    slug: 'ma-nouvelle-certif',
    // ... autres props
  }
];

// 2. C'est tout! La page sera générée automatiquement
```

### Utiliser le Widget

```tsx
// Sur n'importe quelle page
import RecommendedCertifications from "@/components/RecommendedCertifications";

<RecommendedCertifications limit={3} />
```

---

## 🎯 SEO en Bref

### Meta Titles

```
Page Pilier: "AI Certifications - Get Certified | Abir-AI"
Certif #1:   "Generative AI Practitioner Certification | Abir-AI"
Certif #2:   "AI Productivity & GitHub Copilot Certification | Abir-AI"
...
```

### Schema Markup

```json
{
  "Page Pilier": ["ItemList", "FAQPage"],
  "Pages Individuelles": ["Course", "Breadcrumb"]
}
```

---

## 📂 Où Trouver Quoi?

```
📁 Pages
   └─ app/certifications/
      ├─ page.tsx              ← Page pilier
      ├─ [slug]/page.tsx       ← Pages dynamiques
      ├─ sitemap.ts            ← Sitemap
      └─ robots.ts             ← Robots config

📁 Composants
   └─ components/
      ├─ CertificationCard.tsx
      └─ RecommendedCertifications.tsx

📁 Données
   ├─ data/certifications.ts           ← SOURCE DE VÉRITÉ
   └─ public/data/certifications.json  ← Export JSON

📁 Utils
   └─ utils/generateCertificationSchema.ts

📁 Documentation
   ├─ CERTIFICATIONS_SEO.md
   ├─ SEO_KEYWORDS_STRATEGY.md
   ├─ CERTIFICATIONS_STRUCTURE.md
   ├─ DELIVERY_CERTIFICATIONS.md
   └─ QUICK_GUIDE.md                   ← Vous êtes ici!
```

---

## 🚀 Commandes Essentielles

```bash
# Développement
npm run dev

# Visiter
http://localhost:3000/certifications

# Build
npm run build

# Production
npm start
```

---

## ✅ Checklist Pré-Deploy

```
✅ npm run build (sans erreurs)
✅ Tester /certifications
✅ Tester les 4 pages individuelles
✅ Vérifier dark mode
✅ Tester sur mobile
✅ Lighthouse score > 90
```

---

## 🎓 Pour Aller Plus Loin

| Question | Réponse |
|----------|---------|
| Documentation complète? | `CERTIFICATIONS_STRUCTURE.md` |
| Stratégie SEO? | `SEO_KEYWORDS_STRATEGY.md` |
| Guide technique? | `CERTIFICATIONS_SEO.md` |
| Livraison complète? | `DELIVERY_CERTIFICATIONS.md` |

---

## 💡 Tips

1. **Toujours éditer** `data/certifications.ts` en premier
2. **Rebuild** après modifications de données
3. **Utiliser les composants** pour cohérence
4. **Tester dark mode** sur toutes les pages
5. **Vérifier mobile** avant deploy

---

**🎉 C'est aussi simple que ça !**

Questions? Consultez la documentation complète ou contactez l'équipe.
