import "../css/style.css";
import "../css/photographer.css";
import { photographerTemplate } from "../templates/photographers.js";

// Sélectionner l'élément DOM où les cartes des photographes seront ajoutées
const photographersSection = document.querySelector(".photographers-section");

// Fonction pour récupérer les données des photographes
async function getPhotographers() {
  try {
    const response = await fetch("/photographers.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.photographers;
  } catch (error) {
    console.error("Fetch photographers error:", error);
  }
}

// Fonction pour afficher tous les photographes
async function displayPhotographers() {
  const photographers = await getPhotographers();
  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// Fonction pour récupérer les données d'un photographe selon son id
async function getPhotographer(id) {
  try {
    const response = await fetch(`/photographers.json`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Photographer data:", data);
    return data;
  } catch (error) {
    console.error("Get photographer error:", error);
  }
}

// Fonction pour afficher le photographe selon son id
async function displayPhotographer(id) {
  try {
    const photographer = await getPhotographer(id);
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  } catch (error) {
    console.error("Display photographer error:", error);
  }
}

async function getPhotographerImages(id) {
  try {
    const response = await fetch(`/Photographers_ID_Photos/${id}.json`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Photographer images data:", data);
    return data;
  } catch (error) {
    console.error("Get photographer images error:", error);
    return []; // Retourner un tableau vide en cas d'erreur
  }
}

// Fonction pour précharger les images
function preloadImages(photographerImages) {
  return new Promise((resolve, reject) => {
    let loadedImages = 0;
    const totalImages = photographerImages.length;

    photographerImages.forEach((image) => {
      const img = new Image();
      img.src = `/Photographers_ID_Photos/${image.image}`;
      img.onload = () => {
        loadedImages++;
        if (loadedImages === totalImages) {
          resolve();
        }
      };
      img.onerror = (error) => {
        console.error("Error loading image:", error);
        reject(error);
      };
    });
  });
}

// Récupérer l'ID du photographe à partir de l'URL
function getPhotographerIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Utiliser l'ID pour afficher les informations du photographe
const photographerId = getPhotographerIdFromUrl();

if (photographerId) {
  displayPhotographer(photographerId);

  getPhotographerImages(photographerId)
    .then(preloadImages)
    .then(() => {
      console.log("All images preloaded");
    })
    .catch((error) => {
      console.error("Error preloading images:", error);
    });
} else {
  console.error("No photographer ID found in URL");
}

// Appeler la fonction pour afficher les photographes
displayPhotographers();
