import "../css/style.css";
import "../css/photographer.css";
import { photographerTemplate } from "../templates/photographers.js";

// Sélectionner l'élément DOM où les informations du photographe seront ajoutées
const photographHeader = document.querySelector(".photograph-header");

// Récupérer les données du photographe dont l'ID est dans l'URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

//Organiser les données avec photographerTemplate

// Fetch le fichier JSON qui contient les informations des photographes
fetch("/photographers.json")
  .then((response) => {
    // Convertit la réponse en un objet JSON
    return response.json();
  })

  .then((data) => {
    // Trouve le photographe spécifique en fonction de son identifiant
    const photographer = data.photographers.find(
      (photographer) => photographer.id == id
    );

    // Déstructure les propriétés de l'objet photographe
    const { name, portrait, city, country, tagline, price, tags } =
      photographer;

    // Crée un nouvel objet avec les données du photographe
    const photographerData = {
      name,
      portrait,
      city,
      country,
      tagline,
      price,
      tags,
    };

    // Appelle la fonction photographerTemplate avec les données du photographe et obtient getUserCardDOM
    const { getUserCardDOM } = photographerTemplate(photographerData);

    // Ajoute l'élément DOM retourné par getUserCardDOM à l'en-tête des photographes
    photographHeader.appendChild(getUserCardDOM());
  })

  // Gère les erreurs potentielles lors de la récupération des données
  .catch((error) => {
    console.error("Erreur : " + error);
  });

// Sélectionner l'élément du DOM où les images du photographe seront ajoutées
const photographGallery = document.querySelector(".photograph-gallery");
