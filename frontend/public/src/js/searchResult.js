document.addEventListener("DOMContentLoaded", async () => {
  const query = localStorage.getItem('searchQuery');
  const resultsContainer = document.getElementById('resultsContainer');
  const responseText = document.getElementById('responseText');
  const loadingSpinner = document.getElementById('loadingSpinner');

  if (!query) {
    resultsContainer.innerHTML = '<p>No se encontró ningún término de búsqueda.</p>';
    return;
  }

  try {
    // Mostrar spinner
    responseText.textContent = '';
    loadingSpinner.style.display = 'block';

    const response = await fetch('http://127.0.0.1:8000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    const results = data.results;
    const message = data.message;

    // Mostrar texto generado
    loadingSpinner.style.display = 'none';
    responseText.textContent = message;

    // Mostrar herramientas
    if (results.length === 0) {
      resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
      return;
    }

    results.forEach(result => {
      const card = document.createElement('div');
      card.className = 'card my-2';
      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${result.name || 'Herramienta sugerida'}</h5>
          <p class="card-text">${result.tool}</p>
          <a href="${result.link}" target="_blank" class="btn btn-sm btn-primary">Visitar</a>
        </div>
      `;
      resultsContainer.appendChild(card);
    });

  } catch (error) {
    console.error("Error al buscar:", error);
    loadingSpinner.style.display = 'none';
    responseText.innerHTML = '<p> Error al obtener la explicación.</p>';
    resultsContainer.innerHTML = '<p> Error al cargar los resultados.</p>';
  }
});
