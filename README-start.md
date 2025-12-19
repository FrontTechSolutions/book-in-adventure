
# Book-in Adventure – Guide de démarrage

## Prérequis
- Node.js (v18+ recommandé)
- npm ou yarn
- MongoDB (local ou cloud)

---

## Démarrer le Frontend

1. Ouvre un terminal dans le dossier `frontend/`
2. Installe les dépendances :
	```bash
	npm install
	# ou
	yarn
	```
3. Lance le serveur de développement :
	```bash
	npm run dev
	# ou
	yarn dev
	```
4. Accède à l’application sur : [http://localhost:5173](http://localhost:5173) (ou le port affiché)

---

## Démarrer le Backend

1. Ouvre un terminal dans le dossier `backend/`
2. Installe les dépendances :
	```bash
	npm install
	# ou
	yarn
	```
3. Configure la connexion MongoDB et les variables d’environnement dans `backend/config/` ou `.env`
4. Lance le serveur :
	```bash
	npm start
	# ou
	node src/app.js
	```
5. L’API sera disponible sur : [http://localhost:3000](http://localhost:3000) (ou le port défini)

---

## Documentation API interactive (Swagger)

1. Depuis la racine du projet, lance :
	```bash
	node serve-swagger.js
	```
2. Ouvre [http://localhost:4000/docs](http://localhost:4000/docs) pour explorer l’API OpenAPI/Swagger

---

## Conseils
- Pour le développement TypeScript, adapte les scripts (`tsc`, `ts-node`, etc.)
- Consulte les fichiers `README-BDD.md`, `README-architecture.md` et `README-API.md` pour plus de détails sur la structure et les modèles.
- Pour toute question, contacte l’équipe technique Book-in Adventure.
