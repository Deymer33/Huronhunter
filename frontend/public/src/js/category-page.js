// category-page.js

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryName = urlParams.get('categoryName');
  const categoryTitle = document.getElementById('categoryTitle');
  const productsContainer = document.getElementById('productsContainer');
  const apiUrl = "http://localhost:8001";

  if (categoryName) {
    categoryTitle.textContent = capitalizeFirstLetter(categoryName);

    // Obtener los productos de esa categoría usando el nombre
    // Tu endpoint es: /tools/category?name=nombre_de_la_categoria
    fetch(`${apiUrl}/tools/category?name=${categoryName}`)
      .then(response => {
        if (!response.ok) throw new Error("Error al obtener los productos");
        return response.json();
      })
      .then(tools => {
        if (tools && tools.length > 0) {
          renderTools(tools, productsContainer);
        } else {
          productsContainer.innerHTML = `<p class="text-center text-muted mt-5">No se encontraron herramientas para esta categoría.</p>`;
        }
      })
      .catch(error => {
        console.error("Error al cargar las herramientas:", error);
        productsContainer.innerHTML = `<p class="text-center text-danger mt-5">Hubo un error al cargar las herramientas. Por favor, inténtalo de nuevo más tarde.</p>`;
      });

  } else {
    categoryTitle.textContent = 'Categoría no especificada';
    productsContainer.innerHTML = `<p class="text-center text-muted mt-5">Por favor, selecciona una categoría para ver las herramientas.</p>`;
  }
});

function renderTools(tools, container) {
  container.innerHTML = '';
  tools.forEach(tool => {
    const toolCard = document.createElement('div');
    toolCard.className = 'col';
    toolCard.innerHTML = `
      <div class="card h-100">
          <img src="${tool.image || 'https://via.placeholder.com/400x300?text=Herramienta'}" class="card-img-top" alt="${tool.name}">
          <div class="card-body d-flex flex-column">
              <h5 class="card-title">${tool.name}</h5>
              <p class="card-text">${tool.description || 'Descripción no disponible.'}</p>
              <div class="mt-auto">
                  <h4 class="text-primary mb-3">${tool.price || 'Precio no disponible'}</h4>
                  <a href="#" class="btn btn-primary w-100">Ver detalles</a>
              </div>
          </div>
      </div>
    `;
    container.appendChild(toolCard);
  });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}