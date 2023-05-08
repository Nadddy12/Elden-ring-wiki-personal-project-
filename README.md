Pour commencer :

1- Si vous testez le projet dans mon espace en 3wa IDE :

a- ouvrez le terminal et allez dans (sites/projet/elden-ring-wiki/client). puis npm start pour lancer le client (React)

b- ouvrez le terminal et allez dans (sites/projet/elden-ring-wiki/backend). puis npm start pour lancer le backend (node.js).

c- Tapez ceci dans votre navigateur pour accéder au site ( http://abdulrahmanfakhri.ide.3wa.io:9611/ )

PS :
- mon database est accessible pour tout le monde donc normalement y'aura pas de probleme pour y accéd

- j'ai gèré le CORS accessible via mon IDE. Si vous rencontrez des problèmes avec cors, essayez de rafraîchir la page ou laissez être accessible de partout . pour faire ça allez dans backend/server.js dans cette parti : 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.APP_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

changer cette ligne : res.setHeader('Access-Control-Allow-Origin', process.env.APP_URL);

par ça : res.setHeader('Access-Control-Allow-Origin', '*');


2- Autrement : 

1- dans le fichier où vous avez placé le projet. allez dans le fichier backend et ouvrez package.json :
installez npm sur toutes les dépendances que vous y voyez.

2- puis allez sur .env qui est dans backend , ou créez-en un s'il n'y en a pas. 
mettre en (JWT_KEY) la clé qui vous convainc
mettre en (MONGO_DB_URL) votre database url (NoSQL! comme mongodb)
mettre en (APP_URL) votre frontend url 
mettre en (PORT) votre port 

3- dans le fichier client, ouvrez package.json :
installez npm sur toutes les dépendances que vous y voyez.

4- puis allez sur .env qui est dans client , ou créez-en un s'il n'y en a pas.
mettre en (REACT_APP_API_URL) votre backend url.

dans package.json vous pouvez changer le PORT à ceci qui vous convainc. example :

"scripts": {
    "start": "PORT=9611 react-scripts start",


NOTE : 
1- dans l'application (site) lors vous essayez de connecter ou inscrire. et vous trompez 10 fois votre ip sera bloqué pendant 2 min. parce que j'ai installé la rate limit.
pour modifier la période de blocage.

dans backend/middleware/rateLimiter.js  modifié:

(windowMs: 2 * 60 * 1000) pour le temps de réessayer
(max: 10) pour le nombre d'essais

2- pour accéder aux privilèges d'administrateur. créer un compte comme celui-ci :
username: (tout ce que vous voulez)
email: (tout ce que vous voulez mais que ce soit un form de email)
password: (tout ce que vous voulez, au moins 6 caracters)
role: "admin"

3- n'oubliez pas de gérer le CORS