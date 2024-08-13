export const displayModal = () => {
  const modal = document.getElementById("contact_modal");
  if (modal) {
    modal.style.display = "block";
  } else {
    console.error("Modal element not found");
    return;
  }

  // Récupérer l'ID depuis l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  console.log("Photographer ID from URL:", id);

  fetch("/photographers.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("Fetched data:", data);

      // Trouve le photographe spécifique en fonction de son identifiant
      const photographer = data.photographers.find(
        (photographer) => photographer.id == id
      );

      // Affiche le photographe trouvé dans la console pour vérification
      console.log("Found photographer:", photographer);

      // Sélectionne l'élément du formulaire qui contient le nom du photographe dans la modal
      const nameForm = document.querySelector(".modalContactName");

      // Affiche l'élément du formulaire dans la console pour vérification
      console.log("Name form element:", nameForm);

      // Vérifie si l'élément du formulaire (nameForm) et le photographe ont bien été trouvés
      if (nameForm && photographer) {
        // Si les deux existent, met à jour le contenu textuel de l'élément du formulaire
        // avec le nom du photographe trouvé
        nameForm.textContent = photographer.name;
      } else {
        // Si l'un des deux est manquant, affiche un message d'erreur dans la console
        console.error("Element not found or photographer not found");
      }
    })
    .catch((error) => {
      // En cas d'échec de la récupération des données, affiche l'erreur dans la console
      console.error("Error fetching photographers.json:", error);
    });
};

export const closeModal = () => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
};
