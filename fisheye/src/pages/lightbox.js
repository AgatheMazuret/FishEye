import "../css/photographer.css";
import "../pages/photographer.js";

// Sélectionner l'élément DOM où les médias du photographe seront ajoutés
const lightboxImg = document.querySelector(".photograph-lightbox");
const mediaContainer = document.querySelector("img");
const mediaElement = document.querySelectorAll("media");

// Fonction pour créer la lightbox
function createLightbox() {
  const lightboxGallery = document.createElement("div");
  lightboxGallery.classList.add("lightbox-gallery");
  lightboxImg.appendChild(lightboxGallery);

  let closeBtn = document.createElement("i");
  closeBtn.className = "fas fa-times";
  closeBtn.setAttribute("aria-label", "Fermer la lightbox");
  lightboxGallery.appendChild(closeBtn);

  const lightboxContent = document.createElement("div");
  lightboxContent.classList.add("lightbox-content");
  lightboxGallery.appendChild(lightboxContent);

  let leftArrow = document.createElement("i");
  leftArrow.className = "fas fa-chevron-left";
  leftArrow.setAttribute("aria-label", "Photo précédente");
  lightboxGallery.appendChild(leftArrow);

  const lightboxMedia = document.createElement("img");
  lightboxMedia.setAttribute("media", mediaElement.image);
  lightboxMedia.setAttribute("aria-label", mediaElement.title);
  lightboxMedia.classList.add("lightbox-media");
  lightboxContent.appendChild(lightboxMedia);

  let rightArrow = document.createElement("i");
  rightArrow.className = "fas fa-chevron-right";
  rightArrow.setAttribute("aria-label", "Photo suivante");
  lightboxGallery.appendChild(rightArrow);

  const lightboxTitle = document.createElement("p");
  lightboxTitle.classList.add("lightbox-title");
  lightboxTitle.setAttribute("aria-label", "Titre de la photo");
  lightboxContent.appendChild(lightboxTitle);
}

// Appel de la fonction pour créer la lightbox
createLightbox();

// Fonction pour afficher la lightbox
function displayLightbox() {
  lightboxImg.style.display = "block"; // Afficher la lightbox
}

// Écouter les clics sur mediaContainer pour afficher la lightbox
mediaContainer.addEventListener("click", displayLightbox);

// Fonction pour fermer la lightbox
function closeLightbox() {
  lightboxImg.style.display = "none"; // Fermer la lightbox
}

// Ecouter le clic sur le bouton de fermeture de la lightbox
const closeBtn = document.querySelector(".fa-times");
closeBtn.addEventListener("click", closeLightbox);
