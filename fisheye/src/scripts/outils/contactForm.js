export function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";

  // Récupérer l'ID depuis l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  // Trouver le prénom et le nom correspondant à l'ID
  let firstname = "";
  let lastname = "";
  const user = users.find((user) => user.id === id);
  if (user) {
    firstname = user.firstname;
    lastname = user.lastname;
  } else {
    firstname = "Utilisateur inconnu";
    lastname = "";
  }
  // Afficher le prénom et le nom dans le modal
  const firstnameElement = document.getElementById("firstname");
  const lastnameElement = document.getElementById("lastname");

  if (firstnameElement) {
    firstnameElement.textContent = firstname;
  }

  if (lastnameElement) {
    lastnameElement.textContent = lastname;
  }
}

export function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
