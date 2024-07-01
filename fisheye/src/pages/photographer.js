import "../css/style.css";
import "../css/photographer.css";
import { displayModal } from "../scripts/outils/contactForm";
import { closeModal } from "../scripts/outils/contactForm";
//Présentation section

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
  const divPresentation = document.createElement("div");
  divPresentation.classList.add("presentation");
  photographHeader.appendChild(divPresentation);

  const photographerName = document.createElement("h2");
  photographerName.textContent = name;
  divPresentation.appendChild(photographerName);

  const locationElement = document.createElement("p");
  locationElement.textContent = `${city}, ${country}`;
  locationElement.classList.add("location");
  divPresentation.appendChild(locationElement);

  const taglineElement = document.createElement("p");
  taglineElement.textContent = tagline;
  divPresentation.appendChild(taglineElement);

  const contactButton = document.createElement("button");
  contactButton.classList.add("contact_button");
  contactButton.textContent = "Contactez-moi";
  contactButton.addEventListener("click", displayModal);
  photographHeader.appendChild(contactButton);

  const img = document.createElement("img");
  img.setAttribute("src", `/Photographers_ID_Photos/${portrait}`);
  img.setAttribute("alt", name);
  photographHeader.appendChild(img);

  /**
   * TODO: Ajouter pour plus tard
   */
  // const priceDiv = document.createElement("div");
  // priceDiv.textContent = `${price}€/jour`;
  // priceDiv.classList.add("price");
  const closeBtn = document.querySelector(".closeBtn");
  closeBtn.addEventListener("click", closeModal);
}
// Gallery section

// Sélectionner l'élément du DOM où les images du photographe seront ajoutées

// Fetch le fichier JSON qui contient les informations des photographes

fetch("/photographers.json")
  .then((response) => {
    // Convertit la réponse en un objet JSON
    return response.json();
  })

  .then((data) => {
    // Trouve le photographe spécifique en fonction de son identifiant
    const photographerWork = data.photographers.find(
      (photographer) => photographer.id == id
    );

    // Déstructure les propriétés de l'objet photographe work
    const { title, image = [], video = [], date, likes } = photographerWork;

    // Crée un nouvel objet avec les données du photographe
    const photographerWorkData = {
      title,
      image,
      video,
      date,
      likes,
    };

    // Appeler la fonction pour afficher les images du photographe
    getPhotographGallery(photographerWorkData);
  });

// Fonction pour construire le DOM avec les images du photographe

function getPhotographGallery(data) {
  const { title, image, video, date, likes } = data;

  const photographGallery = document.querySelector(".photograph-gallery");

  const titleElement = document.createElement("h2");
  titleElement.textContent = title;
  photographGallery.appendChild(titleElement);

  const likesElement = document.createElement("p");
  likesElement.textContent = likes;
  photographGallery.appendChild(likesElement);

  const media = [
    ...image.map((src) => ({ type: "img", src })),
    ...video.map((src) => ({ type: "video", src })),
  ];

  media.forEach((item) => {
    let element;

    if (item.type === "img") {
      element = document.createElement("img");
      element.setAttribute("src", `/${id}/${item.src}`);
    } else if (item.type === "video") {
      element = document.createElement("video");
      element.setAttribute("controls", "");
      element.setAttribute("src", `/${id}/${item.src}`);
    }

    element.setAttribute("alt", title);
    photographGallery.appendChild(element);
  });

  return { title, likes, image, video };
}
