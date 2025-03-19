import React, { useState, useEffect } from "react";
import userFavouritesService from "../services/userFavourites.service";
import authService from "../services/auth.service";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const user_id = authService.getUserId();

  useEffect(() => {
    loadFavourites(currentPage);
  }, [currentPage]);

  const loadFavourites = (page) => {
    userFavouritesService.getPaginatedFavourites(user_id, page, 20)
      .then((response) => {
        setFavourites((prevFavourites) => [
            ...prevFavourites,
            ...response.data.favourites,
          ]);

        if (currentPage == response.data.totalPages || response.data.favourites.length < 20) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los favoritos:", error);
      });
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h2>Your favourites 😍</h2>
      
      <div className="favourites-grid">
        {favourites.map((fav, index) => (
          <div className="favourite-item" key={index} style={{ width: "calc(20% - 10px)", margin: "5px", display: "inline-block" }}>
            <img
              src={`https://image.tmdb.org/t/p/original/${fav.poster_path}`}
              alt={fav.title}
              style={{ width: "100%", height: "auto", borderRadius: "5px" }}
            />
            <div>
              <p>{fav.title}</p>
              <p>{fav.release_date}</p>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <button onClick={handleLoadMore} className="btn btn-primary">
          Cargar más
        </button>
      )}
    </div>
  );
};

export default Favourites;
