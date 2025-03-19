import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart  } from "react-icons/fa";
import userFavouritesService from "../../services/userFavourites.service";
import authService from "../../services/auth.service";
import "./Card.css";

const Card = (props) => {
  const { info, width, height, favourites, onToggleFavourite, cardId = info.id, genres = [] } = props;
  const [isFavourite, setIsFavourite] = useState(false);

  const user_id = authService.getUserId();

  console.log(info);
  console.log(genres);

  useEffect(() => {
    const isAlreadyFavourite = favourites.some(
      (fav) => fav.content_id === cardId
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
        .addFavourite(
          user_id,
          info.id,
          info.title || info.original_title || info.name || info.original_name,
          info.release_date || info.first_air_date,
          info.vote_average,
          info.poster_path || null
        )
        .then(() => {
          setIsFavourite(true);
          onToggleFavourite(info.id, true);
        })
        .catch((error) => {
          console.error("Error al añadir a favoritos:", error);
        });
    }
  };

  const genreNames = info.genre_ids
    .map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre ? genre.name : null;
    })
    .filter((name) => name !== null);

  return (
    <div className="card__container">
      {info.poster_path ? (
        <img
          key={`${info.poster_path}`}
          alt={`${info.poster_path}`}
          src={`https://image.tmdb.org/t/p/original/${info.poster_path}`}
          className="card__image"
          width={width || 190}
          height={height || 285}
        />
      ) : (
        <div className="card__image-not-found">
          Image not found
        </div>
      )}

      <div className="card__details">
        <p className="card__title">
          {info.title || info.original_title || info.name || info.original_name}
        </p>
        <p className="card__release-date">
          {info.release_date || info.first_air_date}
        </p>
        {genreNames.length > 0 ? (
          <p className="card__release-date">{genreNames.join(", ")}</p>
        ) : (
          <p className="card__release-date">No genres found</p>
        )}
      </div>

      <div className="card__hover-info">
        <button onClick={handleToggleFavourite} className="card__button" title={isFavourite ? "Remove from favourites" : "Add to favourites"}>
          {isFavourite ? (
            <FaHeart/>
          ) : (
            <FaRegHeart/>
          )}
        </button>
        <p className="card__vote-average">{info.vote_average} / 10</p>
      </div>
    </div>
  );
};

export default Card;
