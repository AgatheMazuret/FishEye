import { photographerTemplate } from "../templates/photographers.js";
import "../css/style.css";
import "../css/photographer.css";

// Fonction asynchrone pour récupérer les données des photographes avec la méthode try catch
const getPhotographers = async () => {
  try {
    // Utilise la méthode fetch pour envoyer une requête HTTP GET vers le fichier "photographers.json"
    const response = await fetch("/photographers.json");

    // Vérifie si la réponse n'est pas "ok"
    if (!response.ok) {
      // Si la réponse n'est pas ok, lance une exception avec un message d'erreur
      throw new Error("Network response was not ok");
    }

    // Si la réponse est correcte, extrait les données JSON de la réponse
    const data = await response.json();

    // Affiche les données des photographes dans la console pour les vérifier
    console.log("Photographers data:", data);

    // Retourne les données extraites pour utilisation ultérieure
    return data;
  } catch (error) {
    // Si une erreur survient à n'importe quel moment dans le bloc try, capture l'erreur ici
    // Affiche un message d'erreur dans la console
    console.error("Get photographers error:", error);
  }
};

// Fonction pour charger les images avant de les afficher
const preloadImages = (photographers) => {
  // On retourne une promesse (une sorte de garantie qu'on va faire quelque chose plus tard)
  return new Promise((resolve, reject) => {
    let loadedImages = 0; // On commence à 0 images chargées
    const totalImages = photographers.length; // Le nombre total d'images à charger

    // Pour chaque photographe dans la liste
    photographers.forEach((photographer) => {
      const img = new Image(); // On crée une nouvelle image

      // On dit à l'image où trouver le fichier
      img.src = `/Photographers_ID_Photos/${photographer.portrait}`;

      // Quand l'image a fini de se charger
      img.onload = () => {
        loadedImages++; // On ajoute 1 au compteur des images chargées

        // Si on a chargé toutes les images
        if (loadedImages === totalImages) {
          resolve(); // On dit que tout est prêt
        }
      };

      // Si l'image ne peut pas être chargée (par exemple, fichier manquant)
      img.onerror = (error) => {
        console.error("Error loading image:", error); // On montre l'erreur dans la console
        reject(error); // On dit qu'il y a un problème
      };
    });
  });
};

// Fonction asynchrone pour afficher les informations des photographes
const displayData = async (photographers) => {
  try {
    // On cherche l'endroit sur la page où afficher les photographes
    const photographersSection = document.querySelector(
      ".photographer_section"
    );

    // Si cet endroit n'existe pas sur la page, on arrête tout et on affiche une erreur
    if (!photographersSection) {
      throw new Error("Photographer section not found"); // On dit que la section n'est pas trouvée
    }

    // Pour chaque photographe dans la liste
    photographers.forEach((photographer) => {
      console.log("Photographer:", photographer); // On affiche les détails du photographe dans la console

      // On crée un modèle de ce que le photographe devrait ressembler sur la page
      const photographerModel = photographerTemplate(photographer);

      // On obtient la carte du photographe sous forme d'élément HTML (DOM)
      const userCardDOM = photographerModel.getUserCardDOM();
      console.log("UserCardDOM:", userCardDOM); // On vérifie dans la console ce que ça donne

      // On ajoute la carte du photographe dans la section prévue sur la page
      photographersSection.appendChild(userCardDOM);
    });
  } catch (error) {
    // Si quelque chose ne va pas, on montre une erreur dans la console
    console.error("Display data error:", error);
  }
};

// Fonction d'initialisation asynchrone (elle lance tout le processus)
const init = async () => {
  try {
    // On récupère les données des photographes
    const data = await getPhotographers();

    // Si les données existent et qu'il y a bien une liste de photographes
    if (data && data.photographers) {
      // On précharge toutes les images avant de les afficher
      await preloadImages(data.photographers);

      // Ensuite, on affiche les informations des photographes sur la page
      displayData(data.photographers);
    } else {
      // Si les données sont manquantes ou incorrectes, on affiche une erreur
      throw new Error("No photographers data found");
    }
  } catch (error) {
    // Si quelque chose ne va pas, on affiche une erreur dans la console
    console.error("Init error:", error);
  }
};

// Appelle la fonction d'initialisation pour démarrer le processus
init();
