const lightbox = document.querySelector(".lightbox");
const lightboxTitle = document.querySelector(".lightbox-title");
lightboxTitle.textContent = "Titre de la photo";
const closeBtn = document.querySelector(".fa-xmark");
const prevBtn = document.querySelector(".fa-chevron-left");
const nextBtn = document.querySelector(".fa-chevron-right");

// Fonction pour récupérer les éléments médias
function getMediaElements() {
  const mediaElements = document.querySelectorAll(
    ".media-container img, .media-container video"
  );
  return mediaElements;
}

let currentMediaIndex = 0;

// Fonction pour afficher la lightbox
export function displayLightbox(element) {
  lightbox.style.display = "block";
  // Récupérer l'index de l'élément actuel
  const items = getMediaElements();
  items.forEach((item, index) => {
    if (item.src === element.src) {
      currentMediaIndex = index;
    }
  });
  // Sélectionner l'élément où ajouter les médias (par exemple, un conteneur div)
  const lightboxImg = document.querySelector(".lightbox-img");

  // Supprimer l'image précédente si elle existe
  while (lightboxImg.firstChild) {
    lightboxImg.removeChild(lightboxImg.firstChild);
  }

  // Cloner l'image
  const clone = element.cloneNode();

  lightboxImg.appendChild(clone);

  // Récupérer le titre de l'image
  const title = element.getAttribute("alt");
  lightboxTitle.textContent = title;
}

// Fonction pour fermer la lightbox
function closeLightbox() {
  lightbox.style.display = "none";
}

// Fonction pour afficher la photo suivante
function nextPhoto() {
  // aller à la photo suivante dans le tableau

  const items = getMediaElements();
  currentMediaIndex++;
  if (currentMediaIndex >= items.length) {
    // revenir au début du tableau si on est arrivé à la fin
    currentMediaIndex = 0;
  }
  const mediaElement = items[currentMediaIndex];
  displayLightbox(mediaElement);
}

// Fonction pour afficher la photo précédente
function prevPhoto() {
  const items = getMediaElements();
  // aller à la photo précédente dans le tableau
  currentMediaIndex--;
  if (currentMediaIndex < 0) {
    currentMediaIndex = items.length - 1;
  }
  const mediaElement = items[currentMediaIndex];
  displayLightbox(mediaElement);
}

export function initLightbox() {
  //  **********************************Ecouter le clic pour fermer, afficher la photo suivante ou précédente**********************************

  // Ecouter le clic sur le bouton de fermeture de la lightbox
  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
    });
  }

  // Ecouter le clic sur le bouton de la photo suivante
  if (nextBtn) {
    nextBtn.addEventListener("click", nextPhoto);
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        nextPhoto();
      }
    });
  }

  // Ecouter le clic sur le bouton de la photo précédente
  if (prevBtn) {
    prevBtn.addEventListener("click", prevPhoto);
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        prevPhoto();
      }
    });
  }
}
