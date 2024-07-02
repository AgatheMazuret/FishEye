export function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";

  const firstNameInput = document.getElementById("prenom").value;
  const lastNameInput = document.getElementById("nom").value;
  const emailInput = document.getElementById("email").value;
  const messageInput = document.getElementById("message").value;

  console.log(firstNameInput, lastNameInput, emailInput, messageInput);
}

export function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
