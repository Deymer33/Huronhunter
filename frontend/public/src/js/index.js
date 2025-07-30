// index.js

document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:8001";

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener datos");
      return response.json();
    })
    .then(data => {
      const primerosSeis = data.slice(0, 6);
      renderCards(primerosSeis);
    })
    .catch(error => {
      console.error("Error al consumir la API:", error);
    });
});

function renderCards(categories) {
  const container = document.getElementById("card-container");
  container.innerHTML = '';

  categories.forEach((category) => {
    const card = document.createElement("div");
    card.className = "col mb-4";

    const imgPath = `/Huronhunter/frontend/public/src/util/Baner.png`;

    card.innerHTML = `
      <div class="card" style="width: 18rem;">
        <img src="${imgPath}" class="card-img-top" alt="${category.name}">
        <div class="card-body text-center">
          <button class="btn btn-outline-primary btn-sm mt-2" onclick="handleCategoryClick('${category.name}')">
            ${category.name}
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function handleCategoryClick(name) {
  // Redirigimos a la nueva página de categoría, pasando el nombre
  window.location.href = `category-page.html?categoryName=${name}`;
}