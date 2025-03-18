const TMDB_API_KEY = 'Bearer ' + process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3/";
const TMDB_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: TMDB_API_KEY
  }
};

exports.findAllMovies = async (req, res) => {
  try {
    const response = await fetch(TMDB_BASE_URL + 'discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', TMDB_OPTIONS);
    const data = await response.json();
    
    res.send(data.results || []);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).send({ message: "Error retrieving movies" });
  }
};

exports.findAllTV = async (req, res) => {
  try {
    const response = await fetch(TMDB_BASE_URL + 'discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', TMDB_OPTIONS);
    const data = await response.json();
    
    res.send(data.results || []);
  } catch (error) {
    console.error("Error fetching TV Shows:", error);
    res.status(500).send({ message: "Error retrieving TV Shows" });
  }
};

exports.findPopularMovies = async (req, res) => {
  try {
    const response = await fetch(TMDB_BASE_URL + 'movie/popular?language=en-US&page=1', TMDB_OPTIONS);
    const data = await response.json();
    
    res.send(data.results || []);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    res.status(500).send({ message: "Error retrieving popular movies" });
  }
};

exports.findPopularTV = async (req, res) => {
  try {
    const response = await fetch(TMDB_BASE_URL + 'tv/popular?language=en-US&page=1', TMDB_OPTIONS);
    const data = await response.json();
    
    res.send(data.results || []);
  } catch (error) {
    console.error("Error fetching popular TV Shows:", error);
    res.status(500).send({ message: "Error retrieving popular TV Shows" });
  }
};


