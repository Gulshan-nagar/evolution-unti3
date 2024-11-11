// Function to fetch movie data from Firebase and display it
async function fetchMovies() {
  try {
    // Fetch data from Firebase Realtime Database
    const response = await fetch('https://movie-plateform-default-rtdb.firebaseio.com/movies.json');
    
    // Check if the response is OK (status code 200)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    // Parse the JSON data
    const data = await response.json();

    // Check if the data is an object (which is the case for Firebase Realtime DB response)
    if (data) {
      // Display the fetched movies
      displayMovies(data);
    } else {
      console.log("No movies found.");
    }
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
  }
}

// Function to display movies on the webpage
function displayMovies(movies) {
  // Get the container where you want to display the movie list
  const moviesContainer = document.getElementById('movies-container');
  
  // Clear the container first (in case it's not empty)
  moviesContainer.innerHTML = '';

  // Loop through each movie and create HTML elements to display
  for (const movieId in movies) {
    const movie = movies[movieId];
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    
    // Add movie details (title, description, etc.)
    movieElement.innerHTML = `
      <h3>${movie.title}</h3>
      <p>${movie.description}</p>
      <p><strong>Genre:</strong> ${movie.genre}</p>
      <p><strong>Rating:</strong> ${movie.rating}</p>
    `;

    // Append the movie to the container
    moviesContainer.appendChild(movieElement);
  }
}

// Call the fetchMovies function when the page loads
document.addEventListener('DOMContentLoaded', fetchMovies);
