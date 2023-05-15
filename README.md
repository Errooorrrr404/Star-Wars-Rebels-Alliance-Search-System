
# Star Wars Rebels Alliance Search System

Bonjour, voici un condensé de mes connaissances en React.JS / Node.JS.

Voici un descriptif des fonctionnalités utilisées par partie.

## Partie 1: API

L'API a été faite en Node.JS et utilise Hapi comme demandé dans l'excercice.

A chaque lancement, l'api fait un appel aux schémas de swapi pour apporter un contenu 100% dynamique au requêtes (si demain, swapi ajoute une nouvelle catégorie, elle sera déjà disponible sans MAJ de code, un simple redémarrage suffira)

Un système d'authentification par JWT a été ajouté pour n'autoriser la recherche qu'aux personnes connectées. Le jeton a une durée de vie de 4 heures. 

Toutes les réponses sont des JSON (sauf si swapi renvoi une chaine de caractères -> cas possible pour le format **wookiee**) et les codes de retour sont affichés via le paquet **http-status**.

La validation des body / query / path se font avec Joi.

Les données sensibles (clés / iss, aud, etc...) sont dans un .env.

Tout fonctionne sur un système de try / catch

Toutes les méthodes non autorisées passent en 404




## Partie 2: React.JS

Le Front a été fait en React.JS et utilise typescript pour donner un type logique a chaque fonction.

L'architecture se rapproche de celle proposée par Next.JS.

Elle comporte une page de connexion, de déconnexion, d'erreur 404 et 403 si l'empire essaye de s'y connecter (tips: la redirection se fait après 3 échecs)

L'ensemble du système est désigné avec MUI, et certains composants utilisent **emotion** comme module CSS.

Tout a été pensé pour être 100% réutilisable, ce qui explique la création de plein de "petits" composants.

Les pages devant être protégées (avec un accès restreints) sont entrourées par un AuthProvider.

En cas d'erreur (jeton invalide, par exemple), les utilisateurs sont déconnectés et renvoyés sur la page de connexion.

Le système de recherche utilise un debounce, et la pagination est fonctionnelle.

La récupération des données peut se faire en **JSON** ou **Wookiee**. S'il y a une erreur dans la récupération des données en Wookiee, le système repasse en JSON. S'il y a une erreur en JSON, le système affiche une pop-up d'erreur (avec react-toastify)

Pour stocker le state de ma recherche, ainsi que de la page, j'utilise Recoil.

Tous les composants sont des fonctions.

Les appels API sont réalisés avec **axios** et sont fait sous forme d'instances (plus facilement personnalisable)

## Créé par

- [@Benjamin BAPPEL](https://www.github.com/errooorrrr404)


