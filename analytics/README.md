# Projet de Récupération de Statistiques Google Analytics vers Airtable

## Description

Ce projet automatise la récupération de statistiques des landing pages depuis Google Analytics et les pousse vers une base de données Airtable. Il utilise un compte de service Google Cloud pour accéder aux données Google Analytics et une API Airtable pour stocker les données.

## Prérequis

### Compte de Service Google Cloud

1. **Création du Compte de Service :**
    - Créez un compte de service sur la console Google Cloud avec le compte Google associé (voir le gestionnaire de mots de passe pour les détails).
    - Assurez-vous que le compte de service a les droits `Access-search-data`.

2. **Accès à la Search Console :**
    - En tant que propriétaire (owner) dans la Search Console, ajoutez un accès pour l'email du compte de service en lui attribuant le rôle de propriétaire.

### Cryptage et Déchiffrement des Fichiers

- Le fichier contenant les informations d'identification est crypté via GPG.
- Il est déchiffré par la CI (Continuous Integration) pour être utilisé lors des appels à l'API Google.
- Le secret GPG est stocké dans le gestionnaire de mots de passe.
- Pour plus de détails sur le stockage de secrets volumineux, consultez [ce guide](https://docs.github.com/fr/actions/security-guides/using-secrets-in-github-actions#storing-large-secrets).

### Airtable

- Un token API Airtable est nécessaire pour interagir avec la base de données.
- Créez ce token en vous connectant avec le compte Airtable que vous utilisez.

## Fonctionnement

### Récupération des Données

- Le projet récupère les statistiques des landing pages depuis Google Analytics.
- Les données sont ensuite poussées vers Airtable.

### Limites et Contraintes

- **Airtable :** La version gratuite d'Airtable limite les fichiers à 1000 lignes. Pour gérer cela, les lignes supérieures à N mois (actuellement 6) sont supprimées à chaque lancement.
- **Google Analytics :** Il existe des contraintes de limite d'appel côté Google. Pour éviter les problèmes de rate limiting, seules les lignes pour lesquelles les données de page et de requête ont été récupérées sont poussées. Si une limite de taux est atteinte lors d'un appel, une nouvelle tentative sera effectuée lors du prochain lancement du job.

## Installation et Utilisation

1. **Configuration du Compte de Service :**
    - Suivez les étapes mentionnées dans la section "Prérequis" pour configurer le compte de service Google Cloud.

2. **Configuration de GPG :**
    - Assurez-vous que le fichier crypté est accessible et que le secret GPG est configuré dans le gestionnaire de mots de passe.

3. **Configuration d'Airtable :**
    - Générez un token API Airtable et configurez-le dans votre projet.

4. **Lancement du Projet :**
    - Le projet est conçu pour être exécuté via une CI. Configurez votre pipeline CI pour déchiffrer le fichier GPG et exécuter les scripts nécessaires.

## Lancement en Local

Pour lancer le projet en local, suivez ces étapes :

1. **Décrypter le fichier GPG :**
    - Placez-vous dans le répertoire `analytics`.
    - Exportez la variable d'environnement `GOOGLE_SERVICE_ACCOUNT_SECRET_PASSPHRASE` (disponible dans le gestionnaire de mots de passe).
    - Exécutez le script de décryptage :
      ```bash
      sh decrypt_secret.sh
      ```

2. **Démarrer le projet :**
    - Une fois le fichier décrypté, lancez le projet avec la commande :
      ```bash
      yarn start
      ```

## Production

- Le job tourne sur GitHub Actions.
- Le workflow s'appelle `generate-analytics.yml`.
- Il peut être lancé via une cron tab ou manuellement.

## Notes

- Le projet relance plusieurs fois les jobs pour gérer les éventuelles erreurs de rate limiting.
- Assurez-vous de surveiller les quotas d'utilisation pour éviter les interruptions de service.
