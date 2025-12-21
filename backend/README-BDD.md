/*
Pour installer et utiliser MongoDB avec ce projet :

1. Installer MongoDB :
   - Télécharger et installer MongoDB Community Server depuis https://www.mongodb.com/try/download/community
   - **Pour un projet en local, choisissez l'installation par défaut.**
   - Lors de l'installation, laissez cochée l'option "Install MongoD as a Service" et "Run service as Network Service user" (voir capture d'écran).
   - Le dossier de données et de logs peut rester celui proposé par défaut.
   - Terminez l'installation en cliquant sur "Next" jusqu'à la fin.

2. Démarrer le serveur MongoDB :
   - Lancer la commande : `mongod`
   - Par défaut, MongoDB écoute sur le port 27017.

3. Configurer la connexion dans le projet :
   - Créer un fichier `.env` à la racine du dossier backend.
   - Ajouter la variable : `MONGODB_URI=mongodb://localhost:27017/nom_de_votre_bdd`
4. Lancer le backend :
   - En développement : `npm run start:dev`
   - En production : `npm run start:prod`
*/