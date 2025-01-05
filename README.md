# Application de News - TP Technologies Web
# Par Bouazzaoui Yassine

## Description
Cette application permet de :
- Consulter une liste d'articles
- Voir le détail d'un article
- Créer un nouvel article
- (Optionnel) Modifier et supprimer des articles

## Installation
Commençons par l'organisation pratique :
1. Création de votre dépôt :
   - Sur Github.com
   - Créez un nouveau dépôt public
   - Nommez-le "news-platform"
   - Ne l'initialisez pas avec un README pour le moment

2. Configuration de votre environnement local :
```bash
   # Clonez mon dépôt template (ce dépôt)
   git clone https://github.com/a-daaif/news-template
   
   # Renommez le dépôt origin
   cd news-template
   git remote remove origin
   
   # Ajoutez votre dépôt comme nouvelle origine
   git remote add origin https://github.com/Yassine-Bouazzaoui/news-platform
   
   # Poussez le code vers votre dépôt
   git push -u origin main
```
3. Assurez-vous que votre dépôt est publique

4. Ajoutez le lien de votre dépôt comme réponse à votre devoir sur Classroom

5. Installation des dépendances : 
```bash
   npm install
   npm run dev
```

## Structure
- Frontend : HTML + Bootstrap + Vanilla JavaScript
- Backend : Node.js + Express
- API : DummyJSON pour les données

# Questions à compléter

1. Frontend - Affichage des articles
   - Compléter la fonction displayNews dans main.js
   - Utiliser Bootstrap pour créer une mise en page responsive
   - Ajouter des animations ou transitions (optionnel)

2. Frontend - Gestion des erreurs
   - Implémenter la fonction showError
   - Créer une interface utilisateur pour les messages d'erreur

3. Backend - Middleware
   - Ajouter un middleware pour la gestion des erreurs
   - (Optionnel) Ajouter un middleware de logging

4. Backend - Routes
   - Compléter les routes pour la gestion des articles
   - (Optionnel) Ajouter des routes pour la modification et la suppression

5. Backend - Contrôleur
   - Implémenter les méthodes du contrôleur
   - Gérer les différents cas d'erreur
   - (Optionnel) Ajouter des validations

## Critères d'évaluation
- Après l'implémentation de chaque question(Qnum) faire un commit/push 
- Fonctionnalités de base implémentées
- Utilisation correcte de Bootstrap
- Code JavaScript bien structuré
- Gestion des erreurs
- Bonus : fonctionnalités supplémentaires

