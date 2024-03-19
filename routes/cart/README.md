# [Page Principale](../../README.md)

## Routes du Panier (Cart)

### 1. Ajouter un Article au Panier

- **URL:** `/esogbea/api/cart/item/add`
- **Méthode:** `POST`
- **Description:** Ajoute un article au panier de l'utilisateur.
- **Corps de la Requête (Request Body):**
  - `userID`: String (obligatoire) - L'ID de l'utilisateur ajoutant l'article au panier.
  - `itemID`: String (obligatoire) - L'ID de l'article ajouté au panier.
  - `itemType`: String (obligatoire) - ( les valeurs possibles: <span style="color:magenta;">food, drink</span> ): il
  represente le type d'article ajouté au panier.
  - `quantity`: Number (obligatoire) - La quantité de l'article ajouté.
- **Réponse (Response):**
  - `200 OK` - Article ajouté au panier avec succès.
  - `409 Conflict` - L'article existe déjà dans le panier.
  - `500 Internal Server Error` - Erreur lors de l'ajout de l'article au panier.

### 2. Mettre à Jour un Article dans le Panier

- **URL:** `/esogbea/api/cart/item/update/:cartID/:itemID`
- **Méthode:** `PUT`
- **Description:** Met à jour la quantité d'un article dans le panier de l'utilisateur.
- **Paramètres de la Requête:**
  - `cartID`: String - L'ID du panier.
  - `itemID`: String - L'ID de l'article à mettre à jour.
- **Corps de la Requête:**
  - `quantity`: Number (optional) - La nouvelle quantité de l'article.
  - `itemType`: String (optional) - Le nouveau type d'article .
- **Réponse:**
  - `200 OK` - Quantité de l'article mise à jour avec succès.
  - `404 Not Found` - Panier ou article non trouvé.
  - `400 Bad Request` - Aucun champs fourni pour la mise à jour.
  - `500 Internal Server Error` - Erreur lors de la mise à jour de l'article dans le panier.

### 3. Supprimer un Article du Panier

- **URL:** `/esogbea/api/cart/item/delete`
- **Méthode:** `DELETE`
- **Description:** Supprime un article du panier de l'utilisateur.
- **Paramètres de la Requête:**
  - `cartID`: String - L'ID du panier.
  - `itemID`: String - L'ID de l'article à supprimer.
- **Réponse:**
  - `200 OK` - Article supprimé du panier avec succès.
  - `400 Bad Request` - Req's body not allowed.
  - `404 Not Found` - Panier ou article non trouvé.
  - `500 Internal Server Error` - Erreur lors de la suppression de l'article du panier.

### 4. Vider le Panier

- **URL:** `/esogbea/api/cart/empty`
- **Méthode:** `DELETE`
- **Description:** Supprime tous les articles du panier de l'utilisateur.
- **Paramètres de la Requête:**
  - `cartID`: String - L'ID du panier à vider.
- **Réponse:**
  - `200 OK` - Panier vidé avec succès.
  - `400 Bad Request` - Req's body not allowed.
  - `404 Not Found` - Panier non trouvé.
  - `500 Internal Server Error` - Erreur lors de la suppression des articles du panier.


### 5. Récupérer le panier de l'utilisateur

- **URL:** `/esogbea/api/user/cart/get`
- **Méthode:** `GET`
- **Description:** Récupère le panier de l'utilisateur présent
- **Paramètres de la Requête:**
  - `userID`: String - L'ID de l'utilisateur dont il faut récupérer le panier.
- **Réponse:**
  - `200 OK` - Panier récupérer avec succès.
  - `400 Bad Request` - Req's body not allowed.
  - `404 Not Found` - Panier non trouvé pour l'utilisateur.
  - `500 Internal Server Error` - Erreur lors de la récupération du panier
</br></br>
# [Page Principale](../../README.md)
