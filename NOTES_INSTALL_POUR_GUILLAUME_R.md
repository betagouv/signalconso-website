Guillaume R a besoin de lancer le website en local sur son poste (Windows).
Pour pouvoir éditer le YAML et voir le résultat sur le site.

Solution choisie : il installe node.js (via nvm-windows) directement sur son poste, puis lance des commandes yarn.

On a essayé Docker mais les volumes sont extrêmement lents (inutilisables) sur Windows.
Sinon il aurait fallu combiner WSL avec Docker mais ça avait l'air encore plus compliqué.

# Process d'installation complet :

Installer nvm-windows (c'est un installer en .exe)

Lui montrer le terminal (en faisant "New terminal" dans VSCode, c'est plus simple et il est directement dans le bon dossier)

Puis :

- nvm install 20.9.0
- nvm use 20.9.0
- node --version [pour vérifier]
- corepack enable [ça permet d'activer yarn dans cette version de Node]
- yarn --version [si on est bien dans le répertoire du projet, on devrait avoir yarn 3.x]
- yarn
- yarn devyaml

/!\ Dans toute cette procédure, il y aura plusieurs fois le besoin d'avoir les droits administrateurs.
Peut-être qu'il faudra lancer VSCode (ou sinon Powershell) avec les droits d'administrateur.

/!\ J'ai aussi un problème de permission à un moment, je n'avais pas la permission de lancer des scripts, une histoire de "execution policy" liée à Powershell. Pour résoudre le problème, il a fallu taper la commande `Set-ExecutionPolicy RemoteSigned` dans Powershell (lancé en mode administrateur).

Les deux commandes que Guillaume devra retenir et taper régulièrement sont les suivantes :

- yarn [car on peut changer des dépendences de temps en temps]
- yarn devyaml

J'ai essayé rapidement d'en faire un script ".bat" avec ces deux commandes, mais je n'ai pas réussi.

J'ai aussi l'impression que les variables d'environnements ne sont pas bien passées au site. Mais il ne devrait pas en avoir besoin pour travailler sur le YAML. On pourra creuser plus tard, s'il en a besoin.

# Pour les variables d'environnement

J'ai montré à Guillaume comment se créer un fichier .env.local à la racine du projet,
et comment y mettre une variable d'environnement comme ça par exemple :

NEXT_PUBLIC_ENABLE_ACCESSIBILITE_SUBCAT=true

Ce qui lui permet d'afficher la sous-catégorie accessibilité.
Il aura peut-être besoin qu'on lui donne d'autres variables d'environnements plus tard au cas par cas.

Je lui ai montré aussi comment mettre des commentaires (`# Comme ça `)dans ce fichier, comme ça il peut
se noter des trucs s'il veut.
