import { photographerTemplate } from "./templates/photographers.js";
import "./css/style.css";
import "../public/photographers.json";
import "./css/photographer.css";
import "./templates/photographers.js";

// Fonction asynchrone pour récupérer les données des photographes
async function getPhotographers() {
  try {
    const response = await fetch("public/photographers.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Photographers data:", data);
    return data;
  } catch (error) {
    console.error("Get photographers error:", error);
  }
}

// Fonction pour précharger les images
function preloadImages(photographers) {
  return new Promise((resolve, reject) => {
    let loadedImages = 0;
    const totalImages = photographers.length;

    photographers.forEach((photographer) => {
      const img = new Image();
      img.src = `../public/Photographers_ID_Photos/${photographer.portrait}`;
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

// Fonction asynchrone pour afficher les données des photographes
async function displayData(photographers) {
  try {
    const photographersSection = document.querySelector(
      ".photographer_section"
    );
    if (!photographersSection) {
      throw new Error("Photographer section not found");
    }

    photographers.forEach((photographer) => {
      console.log("Photographer:", photographer);
      const photographerModel = photographerTemplate(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      console.log("UserCardDOM:", userCardDOM);
      photographersSection.appendChild(userCardDOM);
    });
  } catch (error) {
    console.error("Display data error:", error);
  }
}

// Fonction d'initialisation asynchrone
async function init() {
  try {
    const data = await getPhotographers();
    if (data && data.photographers) {
      await preloadImages(data.photographers); // Précharge les images avant d'afficher les données
      displayData(data.photographers);
    } else {
      throw new Error("No photographers data found");
    }
  } catch (error) {
    console.error("Init error:", error);
  }
}

// Appelle la fonction d'initialisation pour démarrer le processus
init();
