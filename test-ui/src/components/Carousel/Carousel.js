import React, { useState, useEffect, useRef } from "react";
import Card from "../Card/Card";
import "./Carousel.css";

const Carousel = ({ fetchMethod, favourites }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [atStart, setAtStart] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (!fetchMethod) return;

    fetchMethod(page)
      .then(response => {
        setItems(prevItems => [...prevItems, ...(response.data || [])]);
        if (page > 1) {
          scrollCarousel("right");
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [fetchMethod, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return;
      setAtStart(carouselRef.current.scrollLeft === 0);
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;

    const scrollAmount = window.innerWidth;
    if (direction === "left") {
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      const atEnd =
        carouselRef.current.scrollLeft + carouselRef.current.clientWidth >=
        carouselRef.current.scrollWidth - 10;

      if (atEnd) {
        setPage(prevPage => prevPage + 1);
      } else {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="carousel__wrapper" style={{ position: "relative" }}>
      {!atStart && !loading && (
        <button className="carousel__button carousel__button--left" onClick={() => scrollCarousel("left")}>
          {"<"}
        </button>
      )}

      <div className="carousel__container" ref={carouselRef}>
        {loading ? (
          <p>Loading...</p>
        ) : items.length > 0 ? (
          items.map(item => <Card key={item.id} info={item} favourites={favourites} />)
        ) : (
          <p>No items found.</p>
        )}
      </div>

      {!loading && (
        <button className="carousel__button carousel__button--right" onClick={() => scrollCarousel("right")}>
          {">"}
        </button>
      )}
    </div>
  );
};

export default Carousel;
