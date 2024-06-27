import "../css/style.css";
import "../css/photographer.css";

// Sélectionner l'élément DOM où les informations du photographe seront ajoutées
const photographHeader = document.querySelector(".photograph-header");

// Récupérer les données du photographe dont l'ID est dans l'URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

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

    // Appeler la fonction pour afficher les informations du photographe
    getPhotographPresentation(photographerData);
  })
  // Gère les erreurs potentielles lors de la récupération des données
  .catch((error) => {
    console.error("Erreur : " + error);
  });

// Fonction pour construire le DOM avec les données du photographe
function getPhotographPresentation({
  name,
  portrait,
  city,
  country,
  tagline,
  price,
}) {
  const div = document.createElement("div");
  div.classList.add("presentation");

  const h2 = document.createElement("h2");
  h2.textContent = name;

  const a = document.createElement("a");
  a.textContent = `${city}, ${country}`;

  const p = document.createElement("p");
  p.textContent = tagline;

  const img = document.createElement("img");
  img.setAttribute("src", `/Photographers_ID_Photos/${portrait}`);
  img.setAttribute("alt", name);

  const priceDiv = document.createElement("div");
  priceDiv.textContent = `${price}€/jour`;
  priceDiv.classList.add("price");

  photographHeader.appendChild(div);
  photographHeader.appendChild(img);

  div.appendChild(h2);
  div.appendChild(a);
  div.appendChild(p);
}

// Sélectionner l'élément du DOM où les images du photographe seront ajoutées
const photographGallery = document.querySelector(".photograph-gallery");
