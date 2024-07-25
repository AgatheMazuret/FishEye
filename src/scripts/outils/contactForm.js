export function displayModal() {
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

      console.log("Found photographer:", photographer);

      const nameForm = document.querySelector(".modalContactName");
      console.log("Name form element:", nameForm);

      if (nameForm && photographer) {
        nameForm.textContent = photographer.name;
      } else {
        console.error("Element not found or photographer not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching photographers.json:", error);
    });
}

export function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
