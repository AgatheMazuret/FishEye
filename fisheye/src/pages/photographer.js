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
    getPhotographGallery(data.media, photographer.id, photographer.name, price);
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

  const priceElement = document.createElement("p");
  priceElement.textContent = `${price} €/jour`;

  const closeBtn = document.querySelector(".closeBtn");
  closeBtn.addEventListener("click", closeModal);
}

// Gallery section
// Sélectionner l'élément du DOM où les images du photographe seront ajoutées
function getPhotographGallery(media, photographerId, photographerName, price) {
  const photographGallery = document.querySelector(".photograph-gallery");

  // Filtrer les médias pour ne garder que ceux appartenant au photographe actuel
  const photographerMedia = media
    .filter((item) => item.photographerId === photographerId)
    .sort((a, b) => b.likes - a.likes);

  // Classe MediaFactory pour créer des éléments médias
  class MediaFactory {
    static createMediaElement(item, id, title, likes, price) {
      let element;

      if (item.hasOwnProperty("image")) {
        element = document.createElement("img");
        element.setAttribute("src", `/${id}/${item.image}`);
      } else if (item.hasOwnProperty("video")) {
        element = document.createElement("video");
        element.setAttribute("controls", "");
        element.setAttribute("src", `/${id}/${item.video}`);
      } else {
        console.error("Média non valide :", item);
        return null;
      }

      element.setAttribute("data-likes", likes);
      element.setAttribute("alt", title);
      element.setAttribute("price", price);

      // Créer un conteneur pour l'élément média et les informations
      const mediaContainer = document.createElement("div");
      mediaContainer.classList.add("media-container");

      // Ajouter l'élément média au conteneur
      mediaContainer.appendChild(element);

      // Créer et ajouter un élément pour les informations média
      const mediaInfo = document.createElement("div");
      mediaInfo.classList.add("media-info");
      mediaContainer.appendChild(mediaInfo);

      // Créer et ajouter un élément pour le titre
      const titleElement = document.createElement("p");
      titleElement.classList.add("media-title");
      titleElement.textContent = title;
      mediaInfo.appendChild(titleElement);

      // Créer et ajouter un élément pour les likes avec le cœur de Font Awesome
      const likesElement = document.createElement("div");
      likesElement.classList.add("media-likes");

      // Créer un cœur de Font Awesome
      const heartIcon1 = document.createElement("i");
      const heartIcon2 = document.createElement("i");
      heartIcon1.className = "fas fa-heart";
      heartIcon2.className = "fas fa-heart";

      // Ajouter le cœur de Font Awesome et le nombre de likes au conteneur des likes
      likesElement.appendChild(heartIcon1);
      likesElement.appendChild(document.createTextNode(` ${likes}`));
      mediaInfo.appendChild(likesElement);

      // Créer et ajouter la div price et likes à la page

      // Créer la div pour le prix
      const priceDiv = document.createElement("div");
      priceDiv.textContent = `${price} €/jour`;
      priceDiv.classList.add("price");

      // Sélectionner tous les éléments contenant les likes
      const allLikes = document.querySelectorAll(".media-likes");
      let totalLikes = 0;

      // Calculer le total des likes
      allLikes.forEach((like) => {
        totalLikes += parseInt(like.textContent);
      });

      // Créer la div pour le total des likes
      const totalLikesDiv = document.createElement("div");
      totalLikesDiv.textContent = totalLikes;
      totalLikesDiv.classList.add("total-likes");
      totalLikesDiv.appendChild(heartIcon2);

      // Créer le conteneur pour le total des likes et le prix
      const totalLikesContainer = document.createElement("div");
      totalLikesContainer.classList.add("total-likes-container");

      // Ajouter les divs de total des likes et de prix au conteneur
      totalLikesContainer.appendChild(totalLikesDiv);
      totalLikesContainer.appendChild(priceDiv);
      // Ajouter le conteneur à la galerie de photographes
      const photographGallery = document.querySelector(".photograph-gallery");
      if (photographGallery) {
        photographGallery.appendChild(totalLikesContainer);
      } else {
        console.error("L'élément photographGallery n'existe pas sur la page.");
      }

      return mediaContainer;
    }
  }

  // Fonction pour afficher la galerie
  function displayGallery(mediaArray) {
    // Effacer le contenu actuel de la galerie
    photographGallery.innerHTML = "";

    // Utilisation de la MediaFactory pour ajouter des éléments médias à la galerie
    mediaArray.forEach((item) => {
      const element = MediaFactory.createMediaElement(
        item,
        photographerId,
        item.title,
        item.likes,
        price
      );

      if (element) {
        photographGallery.appendChild(element);
      }
    });
  }

  // Afficher la galerie initialement
  displayGallery(photographerMedia);

  //Tri des médias
  const sortPopular = document.querySelector(".popularBtn");
  const sortDate = document.querySelector(".dateBtn");
  const sortTitle = document.querySelector(".titleBtn");
  const sortBtn = document.querySelector(".dropbtn");

  // Définir "Populaires" comme sélectionné par défaut
  sortBtn.innerHTML = sortPopular.innerHTML;
  sortPopular.classList.add("active");

  // Trier les médias par popularité par défaut
  photographerMedia.sort((a, b) => b.likes - a.likes);
  displayGallery(photographerMedia);

  // Trier les médias par popularité
  sortPopular.addEventListener("click", function () {
    photographerMedia.sort(function (a, b) {
      return b.likes - a.likes;
    });
    sortBtn.innerHTML = sortPopular.innerHTML;
    displayGallery(photographerMedia);
  });

  // Trier les médias par date
  sortDate.addEventListener("click", function () {
    photographerMedia.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    sortBtn.innerHTML = sortDate.innerHTML;
    displayGallery(photographerMedia);
  });

  // Trier les médias par titre
  sortTitle.addEventListener("click", function () {
    photographerMedia.sort(function (a, b) {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();

      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
    sortBtn.innerHTML = sortTitle.innerHTML;
    displayGallery(photographerMedia);
  });
}
