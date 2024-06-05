// Fonction asynchrone pour récupérer les données des photographes
async function getPhotographers() {
  try {
    // Effectue une requête pour récupérer le fichier JSON des photographes
    const response = await fetch("../data/photographers.json");
    // Convertit la réponse en objet JavaScript
    const data = await response.json();
    // Retourne les données récupérées
    return data;
  } catch (error) {
    // Affiche une erreur dans la console en cas de problème
    console.error("Error: ", error);
  }
}

// Fonction asynchrone pour afficher les données des photographes
async function displayData(photographers) {
  // Sélectionne la section HTML où les cartes des photographes seront affichées
  const photographersSection = document.querySelector(".photographer_section");

  // Pour chaque photographe dans le tableau des photographes
  photographers.forEach((photographer) => {
    // Crée un modèle de photographe à partir des données du photographe
    const photographerModel = photographerTemplate(photographer);
    // Génère le DOM de la carte utilisateur pour le photographe
    const userCardDOM = photographerModel.getUserCardDOM();
    // Ajoute la carte utilisateur à la section des photographes
    photographersSection.appendChild(userCardDOM);
  });
}

// Fonction d'initialisation asynchrone
async function init() {
  // Récupère les données des photographes en appelant getPhotographers()
  const { photographers } = await getPhotographers();
  // Affiche les données des photographes en appelant displayData()
  displayData(photographers);
}

// Appelle la fonction d'initialisation pour démarrer le processus
init();
