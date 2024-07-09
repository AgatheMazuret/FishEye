import "../pages/photographer.js";
import "../css/photographer.css";

window.onload = function () {
  const mediaContainers = document.querySelectorAll(".media-container, img");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const lightboxTitle = document.querySelector(".lightbox-title");
  const closeBtn = document.querySelector(".closeBtn");
  const prevBtn = document.querySelector(".fa-chevron-left");
  const nextBtn = document.querySelector(".fa-chevron-right");

  let currentMediaIndex = 0;
  let mediaArray = Array.from(mediaContainers);

  // Fonction pour afficher la lightbox
  function displayLightbox() {
    lightbox.style.display = "block";
  }

  // Fonction pour fermer la lightbox
  function closeLightbox() {
    lightbox.style.display = "none";
  }

  // Fonction pour afficher la photo suivante
  function nextPhoto() {
    currentMediaIndex++;
    if (currentMediaIndex >= mediaArray.length) {
      currentMediaIndex = 0;
    }
    lightboxImg.src = mediaArray[currentMediaIndex].src;
    lightboxTitle.textContent = mediaArray[currentMediaIndex].alt;
  }

  // Fonction pour afficher la photo précédente
  function prevPhoto() {
    currentMediaIndex--;
    if (currentMediaIndex < 0) {
      currentMediaIndex = mediaArray.length - 1;
    }
    lightboxImg.src = mediaArray[currentMediaIndex].src;
    lightboxTitle.textContent = mediaArray[currentMediaIndex].alt;
  }

  // Ecouter le clic sur le bouton de fermeture de la lightbox
  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  // Ecouter le clic sur le bouton de la photo suivante
  if (nextBtn) {
    nextBtn.addEventListener("click", nextPhoto);
  }

  // Ecouter le clic sur le bouton de la photo précédente
  if (prevBtn) {
    prevBtn.addEventListener("click", prevPhoto);
  }

  // Ajouter des écouteurs d'événements sur chaque mediaContainer pour afficher la lightbox
  mediaArray.forEach((container) => {
    container.addEventListener("click", displayLightbox);
  });
};
