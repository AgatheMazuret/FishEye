export function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `/Photographers_ID_Photos/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.setAttribute("data-id", id);

    const img = document.createElement("img");
    img.setAttribute("src", picture);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    // Modifiez l'élément <a> pour inclure le lien avec l'ID
    const a = document.createElement("a");
    a.textContent = `${city}, ${country}`;
    a.setAttribute("href", `photographer.html?id=${id}`);

    const p = document.createElement("p");
    p.textContent = tagline;

    const div = document.createElement("div");
    div.textContent = price + "€/jour";

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(a);
    article.appendChild(p);
    article.appendChild(div);

    return article;
  }
  return { name, picture, getUserCardDOM };
}
