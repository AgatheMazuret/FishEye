export function displayModal(data) {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";

  // On récupère l'ID de l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

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
      } else if (photographer) {
        const modalName = document.querySelector(".modalName");
        modalName.textContent = photographer.name;
      }
    });
}
export function closeModal() {
  const modal = document.querySelector("#contact_modal");
  modal.style.display = "none";
}
