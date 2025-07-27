const apiKey = "https://www.omdbapi.com/?apikey=41644e58&t="; // Replace YOUR_API_KEY with your OMDb key
const searchBtn = document.getElementById("search-btn");
const movieInput = document.getElementById("movie-input");
const movieInfo = document.getElementById("movie-info");

searchBtn.addEventListener("click", () => {
  const title = movieInput.value.trim();
  if (title) {
    fetchMovie(title);
  }
});

async function fetchMovie(title) {
  try {
    const response = await fetch(`${apiKey}${title}`);
    const data = await response.json();
    if (data.Response === "False") {
      movieInfo.innerHTML = `<p>Movie not found. Try again!</p>`;
      return;
    }
    displayMovie(data);
  } catch (error) {
    movieInfo.innerHTML = `<p>Error fetching movie data.</p>`;
  }
}

function displayMovie(movie) {
  movieInfo.innerHTML = `
    <div class="movie-card">
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200'}" alt="${movie.Title}">
      <h2>${movie.Title} (${movie.Year})</h2>
      <p><strong>Plot:</strong> ${movie.Plot}</p>
      <p><strong>Genre:</strong> ${movie.Genre}</p>
      <p><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
    </div>
  `;
}

const loadingSpinner = document.getElementById("loading-spinner");

searchBtn.addEventListener("click", () => {
  const title = movieInput.value.trim();
  if (title) {
    getMovie(title);
  }
});

async function getMovie(title) {
  loadingSpinner.classList.remove("hidden"); // Show spinner
  movieInfo.innerHTML = ""; // Clear previous content

  try {
    const response = await fetch(`${apiKey}${title}`);
    const data = await response.json();
    if (data.Response === "False") {
      movieInfo.innerHTML = `<p>Movie not found. Try again!</p>`;
      return;
    }
    displayMovie(data);
  } catch (error) {
    movieInfo.innerHTML = `<p>Error fetching movie data.</p>`;
  } finally {
    loadingSpinner.classList.add("hidden"); // Hide spinner
  }
}
