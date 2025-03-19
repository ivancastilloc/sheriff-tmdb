import React, { useState, useEffect } from "react";
import userFavouritesService from "../../services/userFavourites.service";
import authService from "../../services/auth.service";

const Card = (props) => {
  const { info, width, height, favourites, onToggleFavourite } = props;
  const [isFavourite, setIsFavourite] = useState(false);

  const user_id = authService.getUserId();

  useEffect(() => {
    const isAlreadyFavourite = favourites.some(
      (fav) => fav.content_id === info.id
    );
    setIsFavourite(isAlreadyFavourite);
  }, [favourites, info.id]);

  const handleToggleFavourite = () => {
    if (isFavourite) {
      userFavouritesService
        .deleteFavourite(user_id, info.id)
        .then(() => {
          setIsFavourite(false);
          onToggleFavourite(info.id, false);
        })
        .catch((error) => {
          console.error("Error al eliminar de favoritos:", error);
        });
    } else {
      userFavouritesService
        .addFavourite(user_id, info.id)
        .then(() => {
          setIsFavourite(true);
          onToggleFavourite(info.id, true);
        })
        .catch((error) => {
          console.error("Error al añadir a favoritos:", error);
        });
    }
  };

  return (
    <div style={{ width: "190px" }}>
      {info.poster_path ? (
        <img
          key={`${info.poster_path}`}
          alt={`${info.poster_path}`}
          src={`https://image.tmdb.org/t/p/original/${info.poster_path}`}
          width={width || 190}
          height={height || 285}
        />
      ) : (
        <div
          style={{
            width: width || 190,
            height: height || 285,
            backgroundColor: "#d3d3d3",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Image not found
        </div>
      )}

      <div>
        <p className="mb-0 mw-100 text-truncate font-weight-bold">
          {info.title || info.original_title || info.name || info.original_name}
        </p>
        <p className="mb-0">{info.release_date || info.first_air_date}</p>
        <p className="mb-0 ">{info.vote_average} / 10</p>
        <button onClick={handleToggleFavourite} className="btn btn-primary">
          {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
        </button>
      </div>
    </div>
  );
};

export default Card;
