import "../css/photographer.css";
import "../pages/photographer.js";

// // Sélectionner l'élément DOM où les médias du photographe seront ajoutés
// const lightbox = document.querySelector(".lightbox");
// const mediaContainer = document.querySelectorAll("img");

// // Fonction pour créer la lightbox
// function createLightbox() {
//   const lightboxGallery = document.createElement("div");
//   lightboxGallery.classList.add("lightbox-gallery");
//   lightbox.appendChild(lightboxGallery);

//   let closeBtn = document.createElement("i");
//   closeBtn.className = "fas fa-times";
//   closeBtn.setAttribute("aria-label", "Fermer la lightbox");
//   lightboxGallery.appendChild(closeBtn);

//   const lightboxContent = document.createElement("div");
//   lightboxContent.classList.add("lightbox-content");
//   lightboxGallery.appendChild(lightboxContent);

//   let leftArrow = document.createElement("i");
//   leftArrow.className = "fas fa-chevron-left";
//   leftArrow.setAttribute("aria-label", "Photo précédente");
//   lightboxGallery.appendChild(leftArrow);

//   const lightboxMedia = document.createElement("img");
//   lightboxMedia.classList.add("lightbox-media");
//   lightboxContent.appendChild(lightboxMedia);

//   let rightArrow = document.createElement("i");
//   rightArrow.className = "fas fa-chevron-right";
//   rightArrow.setAttribute("aria-label", "Photo suivante");
//   lightboxGallery.appendChild(rightArrow);

//   const lightboxTitle = document.createElement("p");
//   lightboxTitle.classList.add("lightbox-title");
//   lightboxTitle.setAttribute("aria-label", "Titre de la photo");
//   lightboxContent.appendChild(lightboxTitle);

//   // Écouter le clic sur le bouton de fermeture de la lightbox
//   closeBtn.addEventListener("click", closeLightbox);
// }

// // Appel de la fonction pour créer la lightbox
// createLightbox();

// // Fonction pour afficher la lightbox avec le contenu pertinent
// function displayLightbox(event) {
//   const media = event.currentTarget;
//   const lightboxMedia = document.querySelector(".lightbox-media");
//   const lightboxTitle = document.querySelector(".lightbox-title");

//   // Mettre à jour le contenu de la lightbox avec les informations de l'élément cliqué
//   lightboxMedia.src = media.src;
//   lightboxTitle.textContent = media.title;

//   lightbox.style.display = "block"; // Afficher la lightbox
// }

// // Écouter les clics sur chaque élément de mediaContainer pour afficher la lightbox
// for (let i = 0; i < mediaContainer.length; i++) {
//   mediaContainer[i].addEventListener("click", displayLightbox);
// }

// // Fonction pour fermer la lightbox
// function closeLightbox() {
//   lightbox.style.display = "none"; // Fermer la lightbox
// }

// const lightbox = document.createElement("div");
// lightbox.classList.add("lightbox");
// document.body.appendChild(lightbox);

// const images = document.querySelectorAll("img");
// images.forEach((image) => {
//   image.addEventListener("click", (e) => {
//     lightbox.classList.add("active");
//     const img = document.createElement("img");
//     img.src = image.src;
//     while (lightbox.firstChild) {
//       lightbox.removeChild(lightbox.firstChild);
//     }
//     lightbox.appendChild(img);
//   });
// });

// Sélection des éléments du DOM
const lightbox = document.querySelector(".lightbox");
const lightboxContent = document.querySelector(".lightbox-content");
