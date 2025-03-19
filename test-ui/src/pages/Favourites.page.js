import React, { useState, useEffect, useRef } from "react";
import userFavouritesService from "../services/userFavourites.service";
import authService from "../services/auth.service";
import Card from "../components/Card/Card";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const user_id = authService.getUserId();
  const loadMoreRef = useRef(null);

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

        if (page >= response.data.totalPages || response.data.favourites.length < 20) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los favoritos:", error);
      });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore]);

  return (
    <div>
      <h2>Your favourites 😍</h2>
      
      <div className="favourites_grid">
        {favourites.map((fav) => (
          <Card key={fav.content_id} info={fav} favourites={favourites} cardId={fav.content_id} />
        ))}
      </div>

      {hasMore && <div ref={loadMoreRef} style={{ height: "20px" }} />}
    </div>
  );
};

export default Favourites;
