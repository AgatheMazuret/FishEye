const lightbox = document.querySelector(".lightbox");
const lightboxTitle = document.querySelector(".lightbox-title");
const closeBtn = document.querySelector(".fa-xmark");
const prevBtn = document.querySelector(".fa-chevron-left");
const nextBtn = document.querySelector(".fa-chevron-right");

// Fonction pour récupérer les éléments médias
const getMediaElements = () => {
  const mediaElements = document.querySelectorAll(
    ".media-container img, .media-container video"
  );
  return mediaElements;
};

let currentMediaIndex = 0;

// Fonction pour afficher la lightbox
export const displayLightbox = (element) => {
  lightbox.style.display = "block";
  // Appel de la fonction getMediaElements() pour obtenir une collection d'éléments média (images, vidéos, etc.)
  const items = getMediaElements();
  // Itère sur chaque élément de la collection items
  items.forEach((item, index) => {
    // Vérifie si la source (src) de l'élément actuel dans la boucle correspond
    // à la source (src) de l'élément donné (element)
    if (item.src === element.src) {
      // Si les sources correspondent, met à jour currentMediaIndex avec l'indice de cet élément
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
};

// Fonction pour fermer la lightbox
const closeLightbox = () => {
  lightbox.style.display = "none";
};

// Fonction pour afficher la photo suivante
const nextPhoto = () => {
  // aller à la photo suivante dans le tableau

  // On récupère tous les éléments médias (comme des images ou des vidéos)
  const items = getMediaElements();

  // On avance à l'élément suivant dans la liste
  currentMediaIndex++;

  // Si on a atteint la fin de la liste (au-delà du dernier élément)
  if (currentMediaIndex >= items.length) {
    // On revient au début de la liste
    currentMediaIndex = 0;
  }

  // On sélectionne l'élément média actuel
  const mediaElement = items[currentMediaIndex];

  // On affiche cet élément dans une lightbox (une fenêtre qui se superpose sur la page)
  displayLightbox(mediaElement);
};

// Fonction pour afficher la photo précédente
const prevPhoto = () => {
  const items = getMediaElements();
  // aller à la photo précédente dans le tableau
  currentMediaIndex--;
  if (currentMediaIndex < 0) {
    currentMediaIndex = items.length - 1;
  }
  const mediaElement = items[currentMediaIndex];
  displayLightbox(mediaElement);
};

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
