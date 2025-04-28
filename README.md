# Cookie‑Clicker API (Node + Express + PostgreSQL) ⛈

Back‑end ultra‑léger qui implémente **exactement** le swagger (`swagger.yaml`) pour le Cookie‑Clicker (Cloud ☁️⛈ Clicker maintenant). Conçu pour tourner :

* **en local** (npm ou Docker) ;
* **dans le cloud public** (Cloud Run, ECS, …)
  – pendant que le front React vit sur ton cloud privé.

---

## ⚙️ Prérequis

| Outil | Version conseillée |
|-------|--------------------|
| **Node.js** | ≥ 20 LTS |
| **npm** | fourni avec Node |
| **Docker** | ≥ 24 |
| **docker‑compose** | plugin intégré ou v2 stand‑alone |
| **PostgreSQL** | ≥ 15 *(ou remplace par ton SGBD préféré)* |

---

## 📦 Installation rapide (mode dev sans Docker)

```bash
# 1 – clone & deps
git clone <repo> cookie-clicker-backend
cd cookie-clicker-backend
npm install

# 2 – config
cp .env.sample .env          # ajuste DATABASE_URI & CORS_ORIGINS

# 3 – base de données (vide ou init.sql) -> après faudra juste se connecter sur la bdd
psql "$DATABASE_URI" < scripts/init.sql   # (pas encore fais)

# 4 – démarrage hot‑reload
npm run dev                  # nodemon src/server.js
# ➜ API dispo sur http://localhost:8080
```

### Scripts utiles
| Script | Action |
|--------|--------|
| `npm run dev` | serveur avec *hot‑reload* (nodemon) |
| `npm start` | lancement production |

---

## 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳 Lancer via Docker (+ PostgreSQL embarqué)

```bash
docker compose up --build
```

* API : <http://localhost:8080>
* PostgreSQL persistant : volume `db_data/`

---

## 🚀 Déploiement conteneur

Exemple Google Cloud Run (adapte le registre/region) :

```bash
Faites c'est pas mon dossier la team.
```

Le front React interne n’a qu’à pointer sur l’URL HTTPS Cloud Run.

---

## 🔑 Variables d’environnement

| Clé | Description | Exemple |
|-----|-------------|---------|
| `DATABASE_URI` | Chaîne de connexion PostgreSQL | `postgresql://cookie:clicker@db:5432/cookieclicker` |
| `CORS_ORIGINS` | Origines front autorisées (séparées par `,`) | `https://front.privé.local` |
| `PORT` | Port d’écoute interne | `8080` *(par défaut)* |

---

## 🗄️ Structure des fichiers

| Chemin | Rôle principal |
|--------|----------------|
| **`swagger.yaml`** | Contrat Swagger importable dans Swagger UI, Postman, etc. |
| **`package.json`** | Dépendances, scripts **dev**/prod, meta projet. |
| **`Dockerfile`** | Construit une image Node 20 Alpine > `npm ci --omit=dev` puis `npm start`. |
| **`docker-compose.yml`** | Orchestration locale : service `api` + `db` (PostgreSQL 16). |
| **`src/server.js`** | Point d’entrée Express (CORS, JSON, routes, 404 & error handlers). |
| **`src/routes.js`** | 4 endpoints REST → requêtes SQL brutes (pas d’ORM). |
| **`src/db.js`** | Pool PostgreSQL (`pg.Pool`) + helper `query()`. |
| **`.env.sample`** | Gabarit d’environnement – à copier en `.env`. |
| **`scripts/init.sql`** | *(optionnel)* Crée les tables et insère les deux buildings de base. |

---

## 🧪 Tester l’API

1. Importe `swagger.yaml` dans <https://editor.swagger.io/> ou Postman.
2. Lance l’API localement.
3. Essaie : `GET /cookieclicker/load_game_data` → réponses alignées avec le YAML.

---

## 📝 Licence
Aucune sah j'ai mis MIT. 