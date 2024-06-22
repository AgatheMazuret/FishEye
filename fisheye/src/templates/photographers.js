export function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `/Photographers_ID_Photos/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.setAttribute("data-id", id); // Ajoutez l'ID en tant qu'attribut data-id
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const a = document.createElement("a");
    // a.href  mettre un href pour ouvrir la page du photographe
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

    // // article.addEventListener("click", function () {
    //   // Récupérer l'ID du photographe à partir de l'attribut data-id
    //   const photographerId = article.getAttribute("data-id");

    //   // Créer l'URL avec le paramètre ID
    //   const url = `photographer.html?id=${photographerId}`;

    //   // Ouvrir la nouvelle page avec l'ID dans l'URL
    //   window.open(url, "_blank"); // Ouvre dans un nouvel onglet
    //   // window.location.href = url; // Ouvre dans le même onglet
    // });

    return article;
  }
  return { name, picture, getUserCardDOM };
}
