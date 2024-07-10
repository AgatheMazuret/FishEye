const lightbox = document.querySelector(".lightbox");
const lightboxTitle = document.querySelector(".lightbox-title");
lightboxTitle.textContent = "Titre de la photo";
const closeBtn = document.querySelector(".fa-xmark");
const prevBtn = document.querySelector(".fa-chevron-left");
const nextBtn = document.querySelector(".fa-chevron-right");

// Récupérer les données du photographe dont l'ID est dans l'URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const mediaItems = [];
// Fonction pour créer des éléments de média
function createMediaElement(item, id, title) {
  let element;

  if (item.hasOwnProperty("image")) {
    element = document.createElement("img");
    element.setAttribute("src", `/${id}/${item.image}`);
    element.setAttribute("alt", title);
  } else if (item.hasOwnProperty("video")) {
    element = document.createElement("video");
    element.setAttribute("controls", "");
    element.setAttribute("src", `/${id}/${item.video}`);
  } else {
    console.error("Média non valide :", item);
    return null;
  }

  return element;
}

console.log(lightboxTitle);

let currentMediaIndex = 0;

// Fonction pour afficher la lightbox
export function displayLightbox(element) {
  lightbox.style.display = "block";

  // Sélectionner l'élément où ajouter les médias (par exemple, un conteneur div)
  const lightboxImg = document.querySelector(".lightbox-img");

  lightboxImg.appendChild(element);
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

function initLightbox() {
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
}
initLightbox();
