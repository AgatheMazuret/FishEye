import "../css/style.css";
import "../css/photographer.css";
import { displayModal } from "../scripts/outils/contactForm";
import { closeModal } from "../scripts/outils/contactForm";

// Présentation section
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

    if (!photographer) {
      throw new Error(`Photographe avec l'ID ${id} non trouvé`);
    }

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

    // Récupérer et afficher les médias du photographe
    getPhotographGallery(data.media, photographer.id, photographer.name);
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

  // const priceDiv = document.createElement("div");
  // priceDiv.textContent = `${price}€/jour`;
  // priceDiv.classList.add("price");

  const closeBtn = document.querySelector(".closeBtn");
  closeBtn.addEventListener("click", closeModal);
}

// Gallery section
// Sélectionner l'élément du DOM où les images du photographe seront ajoutées
function getPhotographGallery(media, photographerId, photographerName) {
  const photographGallery = document.querySelector(".photograph-gallery");

  // Filtrer les médias pour ne garder que ceux appartenant au photographe actuel
  const photographerMedia = media.filter(
    (item) => item.photographerId == photographerId
  );

  // Créer et ajouter les éléments de la galerie
  // Parcourir chaque élément des médias du photographe
  photographerMedia.forEach((item) => {
    let element;

    // Vérifier si le média est une image et s'il a un attribut 'title'
    if (item.type === "image" && item.title) {
      // Créer un élément image
      element = document.createElement("img");
      // Définir l'attribut 'src' de l'image avec le chemin du média
      element.setAttribute("src", `/${id}/${image}`);
    }
    // Vérifier si le média est une vidéo et s'il a un attribut 'title'
    else if (item.type === "video" && item.title) {
      // Créer un élément vidéo
      element = document.createElement("video");
      // Activer les contrôles de la vidéo
      element.setAttribute("controls", "");
      // Définir l'attribut 'src' de la vidéo avec le chemin du média
      element.setAttribute("src", `/${id}/${video}`);
    }
    // Si le média n'est ni une image ni une vidéo valide, afficher une erreur
    else {
      console.error("Média non valide :", item);
      return; // Sortir de la boucle pour cet élément non valide
    }

    // Définir l'attribut 'alt' de l'élément média avec le nom du photographe
    element.setAttribute("alt", photographerName);
    // Ajouter l'élément média au DOM dans la galerie du photographe
    photographGallery.appendChild(element);
  });
}
