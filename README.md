# Documentation d’utilisation de l’application Front-End SportSee

## Structure de l'application

### Points Clés
L’application front-end est construite avec React et TypeScript. Elle utilise les éléments suivants :

1. **Context API** : Pour la gestion globale des utilisateurs.
2. **React Router** : Pour la navigation entre les différentes pages.
3. **Gestion des props** : Les composants utilisent des props fortement typées pour garantir la sécurité et la maintenabilité.

### Organisation des fichiers
- **`App.tsx`** : Point d’entrée principal de l’application.
- **`main.tsx`** : Configuration de la racine React et intégration du `UserProvider`.
- **`UserContext.tsx`** : Gère l’état utilisateur via un `Context`.
- **`UserModels.ts`** : Définit les modèles de données utilisateur. Exemple de modèle :

```typescript
export interface UserModel {
  id: string;
  userInfos: {
    firstName: string;
    lastName: string;
    age: number;
  };
  userActivity: {
    sessions: { day: string; kilogram: number; calories: number }[];
  };
  userAverageSession: {
    sessions: { day: number; sessionLength: number }[];
  };
  userPerformance: {
    data: { value: number; kind: number }[];
  };
  score: number;
  keyData: {
    calorieCount: number;
    proteinCount: number;
    carbohydrateCount: number;
    lipidCount: number;
  };
}
```
- **`UserServices.ts`** : Fournit des fonctions pour interagir avec l’API backend.
- **`utils.ts`** : Fichier utilitaire pour les fonctions communes.
- **Composants principaux** : Fichiers dans le dossier `components` gérant l’affichage des données utilisateur.

---

## Composants principaux

### `App.tsx`

#### Rôle
Gère la navigation dans l'application.

#### Structure des Routes
- `/login` : Page de connexion (composant `Landing`).
- `/home/:id` : Page d’accueil utilisateur (composant `Home`).
- Toute autre route redirige automatiquement vers `/login`.

#### Typages
- `ReactElement` : Chaque route retourne un élément React fortement typé.

---

### `UserContext.tsx`

#### Rôle
Gère l’état utilisateur et fournit des fonctions pour récupérer les données depuis l'API.

#### Flux de données
1. **`APICalls.ts`** : Ce fichier contient les appels directs à l’API backend. Les méthodes définies ici envoient des requêtes HTTP et récupèrent les réponses au format brut.
    - Exemple : une fonction `fetchUserById(id: string)` qui retourne les données utilisateur JSON depuis l’API.

2. **`UserServices.ts`** : Ce fichier sert d’intermédiaire entre `APICalls.ts` et le reste de l’application. Il utilise les méthodes de `APICalls.ts` pour transformer les données brutes en objets plus adaptés à l’application.
    - Exemple : La fonction `getUserData` utilise `fetchUserById` pour récupérer les données, puis mappe les résultats au modèle `UserModel`.

3. **`UserModels.ts`** : Définit la structure des données utilisées dans l’application. Les interfaces définies ici, comme `UserModel`, servent à typifier les objets renvoyés par `UserServices.ts`.
    - Exemple : Les données JSON de l’API sont converties en instances du modèle `UserModel` pour garantir la cohérence des données dans toute l’application.

4. **`UserContext.tsx`** : Fournit un contexte global à l’application pour gérer et partager l’état utilisateur. Il utilise `getUserData` de `UserServices.ts` pour récupérer les données et les stocke localement via le state React.
    - Fonctionnement : La fonction `getUser` appelle `getUserData` et met à jour l’état utilisateur avec les données transformées.

Ce flux garantit que chaque couche a une responsabilité claire, de la récupération des données brutes à leur consommation dans l’interface utilisateur.

#### Interface Typée : `IUserContext`
```typescript
export interface IUserContext {
  getUser: (id: string) => Promise<void>
  user: UserModel | null
}
```

- **`getUser`** : Fonction pour récupérer les informations utilisateur en fonction de l’ID.
- **`user`** : Stocke les données utilisateur sous forme d’un objet `UserModel` ou `null` si aucun utilisateur n’est connecté.

#### Implémentation
Le contexte est créé avec des valeurs par défaut et est géré via un `Provider`. Ce `Provider` enveloppe l’ensemble de l’application ou des sections spécifiques pour fournir les données utilisateur à tous les composants enfants. Il utilise le state React pour maintenir un suivi des données utilisateur en temps réel. Les données sont récupérées via le fichier `UserServices.ts`, qui les transforme à partir des réponses brutes d’`APICalls.ts`, et sont typées selon les modèles définis dans `UserModels.ts`. Ce système garantit une communication fluide et cohérente entre les différentes couches du front-end.

Exemple d’utilisation :
```tsx
<UserContext.Provider value={{ getUser, user }}>
  {children}
</UserContext.Provider>
```

#### Hooks Associés
Utilisation du hook `useState` pour suivre l’état local de l’utilisateur :
```typescript
const [user, setUser] = useState<UserModel | null>(null);
```

---

### `Landing.tsx`

#### Rôle
Page de connexion permettant de saisir un identifiant utilisateur pour accéder aux données associées.

#### Gestion des erreurs
Lorsqu’un utilisateur entre un `userID` invalide ou en cas de problème avec l’API, les erreurs sont gérées comme suit :
1. **Validation côté client** : Vérification que le champ `userID` n’est pas vide avant l’envoi de la requête.
2. **Gestion des erreurs API** :
    - Si l’API ne retourne pas de données valides ou renvoie une erreur, un message d’erreur est affiché à l’utilisateur (ex. : "Utilisateur introuvable").
    - L’erreur est loguée dans la console pour le débogage.
3. **État de l’application** : Le composant utilise un état local pour afficher dynamiquement les erreurs à l’écran grâce à la fonction `setErrorMessage`.

Cette approche garantit une expérience utilisateur fluide tout en facilitant le débogage pour les développeurs.

#### Fonctionnement
1. L’utilisateur saisit son `userID` dans un champ texte.
2. La fonction `getUser` est appelée avec l’ID utilisateur.
3. En cas de succès, l’utilisateur est redirigé vers la page `/home/:id`.
4. En cas d’erreur, un message d’erreur s’affiche.

#### Typages Clés
- `MutableRefObject<HTMLInputElement | null>` : Référence pour accéder à la valeur du champ texte.
- `Dispatch<SetStateAction<string>>` : Gestion de l’état du message d’erreur.

---

### `Home.tsx`

#### Rôle
Affiche les données d’un utilisateur sous forme de graphiques et de sections détaillées.

#### Fonctionnement
1. Récupération de l’ID utilisateur via les `params` de la route.
2. Appel à la fonction `getUser` pour charger les données utilisateur.
3. Redirection vers `/login` si aucune donnée utilisateur n’est disponible.

#### Composants Enfant
- **`Header`** : Barre de navigation.
- **`Aside`** : Menu latéral.
- **Graphiques** :
    - `BarChart` : Activité quotidienne.
    - `LineChart` : Durée moyenne des sessions.
    - `RadarChart` : Performances par catégorie.
    - `RadialBarChart` : Score quotidien.
- **`Nutrition`** : Liste des données nutritionnelles.

#### Typages Clés
- `IUserContext` : Contexte utilisateur pour accéder aux fonctions et à l’état utilisateur.
- `NavigateFunction` : Gestion de la navigation entre les pages.

---

### `BarChart.tsx`

#### Rôle
Affiche un graphique en barres représentant l’activité quotidienne d’un utilisateur.

#### Props
- `datas: IBarChartData[]` : Tableau d’objets contenant les données d’activité.

#### Typages Clés
- `IBarChartData` :
    - `day: string`
    - `kilogram: number`
    - `calories: number`

---

### `LineChart.tsx`

#### Rôle
Affiche un graphique en lignes pour la durée moyenne des sessions.

#### Props
- `datas: ILineChartData[]` : Tableau d’objets contenant les données de durée.

#### Typages Clés
- `ILineChartData` :
    - `day: number`
    - `sessionLength: number`

---

### `RadarChart.tsx`

#### Rôle
Affiche un graphique radar des performances par catégorie.

#### Props
- `datas: IRadarChartDatas[]` : Tableau d’objets contenant les données de performance.

#### Typages Clés
- `IRadarChartDatas` :
    - `value: number`
    - `kind: number`

---

### `RadialBarChart.tsx`

#### Rôle
Affiche un graphique radial représentant le score quotidien de l’utilisateur.

#### Props
- `datas: UserInfos` : Données utilisateur comprenant le score du jour.

#### Typages Clés
- `UserInfos` :
    - `score: number`

---

### `Nutrition.tsx`

#### Rôle
Affiche une liste des données nutritionnelles sous forme d’icônes et de valeurs.

#### Props
- `type: string` : Type de donnée nutritionnelle (calorieCount, proteinCount, etc.).
- `value: number` : Valeur associée au type.

#### Typages Clés
- `INutritionProps` :
    - `type: string`
    - `value: number`

---

## Initialisation

### Configuration
Le fichier `main.tsx` initialise l’application avec le `UserProvider` pour rendre le contexte accessible à tous les composants enfants.

Exemple :
```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <App />
  </UserProvider>,
);
```