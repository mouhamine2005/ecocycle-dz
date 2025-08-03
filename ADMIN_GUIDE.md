# EcoCycle DZ - Guide d'Administration

## Accès à l'Interface d'Administration

### URL d'accès
```
http://localhost:3001/admin
```

### Authentification
- **Mot de passe administrateur** : `EcoCycle2025Admin!`
- **Durée de session** : 2 heures
- **Type de stockage** : Session Storage (expire à la fermeture du navigateur)

### Fonctionnalités Disponibles

#### 🔐 Sécurité
- Protection par mot de passe
- Session temporaire (2h maximum)
- Déconnexion automatique à la fermeture du navigateur
- Bouton de déconnexion manuelle

#### 📊 Statistiques
- Nombre total d'annonces
- Annonces actives/vendues
- Annonces cette semaine
- Total des vues et likes
- Répartition par catégorie
- Répartition par localisation

#### 💾 Gestion des Données
- **Export** : Téléchargement des données en JSON
- **Import** : Importation de données de sauvegarde
- **Synchronisation** : Sync entre le store local et IndexedDB
- **Suppression** : Suppression individuelle des annonces

#### 🗂️ Gestion des Annonces
- Liste complète des annonces
- Détails de chaque annonce (titre, prix, localisation, date)
- Suppression avec confirmation
- Statut en temps réel

### Instructions d'Utilisation

1. **Connexion**
   - Aller sur `/admin`
   - Entrer le mot de passe : `EcoCycle2025Admin!`
   - Cliquer sur "Accéder à l'administration"

2. **Navigation**
   - Bouton retour vers le dashboard principal
   - Liens rapides vers Marketplace, Scanner, Carte
   - Bouton de déconnexion en haut à droite

3. **Export de Données**
   - Cliquer sur "Exporter les données"
   - Le fichier JSON sera téléchargé automatiquement

4. **Import de Données**
   - Sélectionner un fichier JSON de sauvegarde
   - Cliquer sur "Importer les données"

5. **Déconnexion**
   - Cliquer sur le bouton "Déconnexion" 
   - Ou fermer le navigateur (déconnexion automatique)

### Notes de Sécurité

⚠️ **Important** : 
- Ne partagez jamais le mot de passe administrateur
- Déconnectez-vous toujours après utilisation
- Les sessions expirent automatiquement après 2 heures
- L'accès est limité aux administrateurs autorisés uniquement

### Dépannage

**Si vous ne pouvez pas accéder :**
1. Vérifiez que le mot de passe est correct
2. Actualisez la page si nécessaire
3. Vérifiez que JavaScript est activé
4. Assurez-vous que le serveur fonctionne

**Si la session expire :**
- Reconnectez-vous avec le mot de passe
- La session est valide pendant 2 heures

---

*EcoCycle DZ © 2025 - Interface d'administration sécurisée*
