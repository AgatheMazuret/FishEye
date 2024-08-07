import "../css/style.css";
import "../css/photographer.css";
import { displayModal } from "../scripts/outils/contactForm";
import { closeModal } from "../scripts/outils/contactForm";
import { displayLightbox } from "./lightbox";
import { initLightbox } from "./lightbox";

// ******************************************Récupération des infos d'un photographe par son id******************************************

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

// *****************************************Présentation photographe*****************************************

// Fonction pour construire le DOM avec les données du photographe
function getPhotographPresentation({
  name,
  portrait,
  city,
  country,
  tagline,
  price,
}) {
  // Création de la div pour la présentation du photographe
  const divPresentation = document.createElement("div");
  divPresentation.classList.add("presentation");
  photographHeader.appendChild(divPresentation);

  // Création des éléments pour les informations du photographe
  // Création du nom du photographe
  const photographerName = document.createElement("h1");
  photographerName.textContent = name;
  divPresentation.appendChild(photographerName);

  // Création de la localisation du photographe
  const locationElement = document.createElement("p");
  locationElement.textContent = `${city}, ${country}`;
  locationElement.classList.add("location");
  divPresentation.appendChild(locationElement);

  // Création de la phrase d'accroche du photographe
  const taglineElement = document.createElement("p");
  taglineElement.textContent = tagline;
  divPresentation.appendChild(taglineElement);

  // Création du bouton de contact
  const contactButton = document.createElement("button");
  contactButton.classList.add("contact_button");
  contactButton.textContent = "Contactez-moi";
  contactButton.addEventListener("click", displayModal);
  contactButton.addEventListener(
    "keydown",
    (event) => event.key === "Enter" && displayModal()
  );
  photographHeader.appendChild(contactButton);

  // Récupérer les données de la modale en cliquant sur le bouton envoyer
  const form = document.querySelector("form");

  // Ajouter un gestionnaire d'événements pour la soumission du formulaire
  form.addEventListener("submit", (event) => {
    // Empêcher le comportement par défaut (soumission du formulaire)
    event.preventDefault();

    // Récupérer les données du formulaire
    const firstName = document.querySelector("#prenom").value;
    const lastName = document.querySelector("#nom").value;
    const email = document.querySelector("#email").value;
    const message = document.querySelector("#message").value;

    // Afficher les données dans la console
    console.log("Prénom :", firstName);
    console.log("Nom :", lastName);
    console.log("Email :", email);
    console.log("Message :", message);
  });

  // Fermeture de la modale
  const closeBtn = document.querySelector(".closeBtn");
  closeBtn.addEventListener("click", closeModal);
  document.addEventListener(
    "keydown",
    (event) => event.key === "Escape" && closeModal()
  );

  // Création de la photo de profil du photographe
  const img = document.createElement("img");
  img.setAttribute("src", `/Photographers_ID_Photos/${portrait}`);
  img.setAttribute("alt", name);
  photographHeader.appendChild(img);

  // Création du prix par jour du photographe
  const priceElement = document.createElement("p");
  priceElement.textContent = `${price} €/jour`;
}

// Fonction pour créer un coeur Font Awesome
function createHeartIcon() {
  const heartIcon = document.createElement("i");
  heartIcon.className = "fas fa-heart";
  return heartIcon;
}

// *****************************************Gallery section*****************************************

// Sélectionner l'élément du DOM où les images du photographe seront ajoutées
function getPhotographGallery(media, photographerId, photographerName, price) {
  const photographGallery = document.querySelector(".photograph-gallery");

  // ******************************Footer**********************************

  function renderFooter() {
    const footer = document.querySelector("footer");

    footer.innerHTML = "";

    // Créer la div pour le prix
    const priceDiv = document.createElement("div");
    priceDiv.textContent = `${price} €/jour`;
    priceDiv.classList.add("price");

    //******************Les Likes Footer ********************

    // Déclarer une variable pour suivre le total des likes
    let totalLikes = 0;

    // Sélectionner tous les éléments contenant les likes
    const allLikes = document.querySelectorAll(".media-likes");
    // Calculer le total des likes
    allLikes.forEach((like) => {
      totalLikes += parseInt(like.textContent);
    });

    // Créer la div pour le total des likes
    const totalLikesDiv = document.createElement("div");
    totalLikesDiv.textContent = totalLikes;
    totalLikesDiv.classList.add("total-likes");
    totalLikesDiv.appendChild(createHeartIcon());

    // Créer le conteneur pour le total des likes et le prix
    const totalLikesContainer = document.createElement("div");
    totalLikesContainer.classList.add("total-likes-container");

    // Ajouter les divs de total des likes et de prix au conteneur
    totalLikesContainer.appendChild(totalLikesDiv);
    totalLikesContainer.appendChild(priceDiv);

    footer.appendChild(totalLikesContainer);
  }

  // ****************************Les médias**********************************

  // Filtrer les médias pour ne garder que ceux appartenant au photographe actuel
  const photographerMedia = media
    .filter((item) => item.photographerId === photographerId)
    .sort((a, b) => b.likes - a.likes);

  class MediaFactory {
    // Méthode statique pour créer un élément média (image ou vidéo)
    static createMediaElement(item, id, title, likes, price) {
      let element;

      // Vérifie si l'objet item possède une propriété "image"
      if (item.hasOwnProperty("image")) {
        // Crée un élément img pour une image
        element = document.createElement("img");
        // Définit l'attribut src de l'image en utilisant l'id et le nom de l'image
        element.setAttribute("src", `/${id}/${item.image}`);
        // Ajoute l'attribut tabindex pour rendre l'image focusable
        element.setAttribute("tabindex", "0");
      }
      // Vérifie si l'objet item possède une propriété "video"
      else if (item.hasOwnProperty("video")) {
        // Crée un élément video pour une vidéo
        element = document.createElement("video");
        // Ajoute l'attribut controls pour afficher les contrôles de la vidéo
        element.setAttribute("controls", "");
        // Définit l'attribut src de la vidéo en utilisant l'id et le nom de la vidéo
        element.setAttribute("src", `/${id}/${item.video}`);
      }
      // Si l'objet item n'a ni propriété "image" ni "video"
      else {
        // Affiche un message d'erreur dans la console
        console.error("Média non valide :", item);
        // Retourne null pour indiquer l'échec de la création de l'élément média
        return null;
      }

      // Définit l'attribut data-likes pour stocker le nombre de likes
      element.setAttribute("data-likes", likes);
      // Définit l'attribut alt pour ajouter un titre descriptif à l'élément média
      element.setAttribute("alt", title);
      // Définit l'attribut price pour stocker le prix
      element.setAttribute("price", price);

      //  Ajouter adeventlister pour ouvrir la lightbox
      element.addEventListener("click", () => {
        // Afficher l'image dans la lightbox
        displayLightbox(element);
      });
      element.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          displayLightbox(element.src);
        }
      });

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
      const titleElement = document.createElement("h2");
      titleElement.classList.add("media-title");
      titleElement.textContent = title;
      mediaInfo.appendChild(titleElement);

      //  ***********************Les likes sous les photos************************

      // Créer et ajouter un élément pour les likes avec le cœur de Font Awesome
      const likesElement = document.createElement("div");
      likesElement.classList.add("media-likes");

      // Créer un cœur de Font Awesome
      const heartIcon1 = createHeartIcon();

      // Ajouter le cœur de Font Awesome et le nombre de likes au conteneur des likes
      likesElement.appendChild(heartIcon1);
      likesElement.appendChild(document.createTextNode(` ${likes}`));
      mediaInfo.appendChild(likesElement);

      function addLikeListener(heartIcon, likesElement) {
        // Variable pour suivre si le cœur a été cliqué
        let liked = false;

        heartIcon.addEventListener("click", function () {
          // Vérifie si le cœur a déjà été cliqué
          if (!liked) {
            // Récupère le nombre actuel de likes en convertissant le texte en nombre entier
            const currentLikes = parseInt(likesElement.textContent.trim());

            // Efface tout le contenu existant de likesElement
            likesElement.textContent = ` `; // Efface le contenu

            // Réajoute le cœur Font Awesome à likesElement
            likesElement.appendChild(heartIcon);

            // Ajoute le nouveau nombre de likes à likesElement
            likesElement.appendChild(
              document.createTextNode(` ${currentLikes + 1}`) // Ajoute le nouveau nombre de likes
            );

            // Définit l'indicateur à true pour indiquer que le cœur a été cliqué
            liked = true;

            // Mettre à jour le total des likes

            renderFooter();
          }
        });
      }
      addLikeListener(heartIcon1, likesElement);

      return mediaContainer;
    }
  }
  // Créer et ajouter la div price et likes à la page

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
  renderFooter();
  //******************************************************Tri des médias******************************************************
  const sortPopular = document.querySelector(".popularBtn");
  const sortDate = document.querySelector(".dateBtn");
  const sortTitle = document.querySelector(".titleBtn");
  const sortBtn = document.querySelector(".dropbtn");

  sortBtn.addEventListener("click", function () {
    document.querySelector(".dropdown-content").classList.toggle("show");
  });

  function closeDropdown() {
    document.querySelector(".dropdown-content").classList.remove("show");
  }
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
    closeDropdown();
    displayGallery(photographerMedia);
  });

  // Trier les médias par date
  sortDate.addEventListener("click", function () {
    photographerMedia.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    sortBtn.innerHTML = sortDate.innerHTML;
    closeDropdown();
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
    closeDropdown();
    displayGallery(photographerMedia);
  });
}
initLightbox();
