import React, { useState, useEffect } from "react";
import Card from "../Card/Card";

const Carousel = ({ fetchMethod, favourites }) => {
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);  

  useEffect(() => {
    if (!fetchMethod) return;

    fetchMethod(page)
      .then(response => {
        setItems(prevItems => [...prevItems, ...(response.data || [])]);  
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [fetchMethod, page]);  

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1); 
  };
  

  return (
    <div className="customCarousel"
    >
      {loading ? (
        <p>Loading...</p>
      ) : items.length > 0 ? (
        items.map(item => <Card key={item.id} info={item} favourites={favourites} />) 
      ) : (
        <p>No items found.</p> 
      )}

      <div style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
        <button 
          onClick={handleLoadMore} 
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Carousel;
