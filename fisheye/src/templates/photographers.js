export function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `../public/Photographers_ID_Photos/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const a = document.createElement("a");
    a.textContent = `${city}, ${country}`;

    const p = document.createElement("p");
    p.textContent = tagline;
    const div = document.createElement("div");
    div.textContent = price + "€/jour";

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(a);
    article.appendChild(p);
    article.appendChild(div);

    article.addEventListener("click", function () {
      // Remplace 'newPage.html' par l'URL de la page que tu souhaites ouvrir
      window.open("photographer.html", "_blank"); // Ouvre dans un nouvel onglet
      // window.location.href = 'newPage.html'; // Ouvre dans le même onglet
    });

    return article;
  }
  return { name, picture, getUserCardDOM };
}
