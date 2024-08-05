export function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `/Photographers_ID_Photos/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.setAttribute("data-id", id);

    const balise = document.createElement("a");
    balise.classList.add("balise");
    balise.setAttribute("href", `photographer.html?id=${id}`);
    balise.setAttribute("tabindex", "0");
    balise.setAttribute("target", "_blank"); // Ouvrir le lien dans un nouvel onglet

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    // Créer une div pour l'image
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("img-container");
    imgDiv.appendChild(img);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const a = document.createElement("a");
    a.textContent = `${city}, ${country}`;

    const p = document.createElement("p");
    p.textContent = tagline;

    const priceDiv = document.createElement("div");
    priceDiv.textContent = price + "€/jour";
    priceDiv.classList.add("price");

    const presentationDiv = document.createElement("div");
    presentationDiv.classList.add("presentation");
    presentationDiv.appendChild(h2);
    presentationDiv.appendChild(a);
    presentationDiv.appendChild(p);

    article.appendChild(balise);
    article.appendChild(imgDiv); // Ajouter la div contenant l'image
    article.appendChild(presentationDiv);
    article.appendChild(priceDiv);

    return article;
  }
  return { name, picture, getUserCardDOM };
}
