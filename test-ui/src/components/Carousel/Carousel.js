import React, { useState, useEffect } from "react";
import Card from "../Card/Card";

const Carousel = ({ fetchMethod }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!fetchMethod) return;

    fetchMethod()
      .then(response => {
        setItems(response.data || []); 
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [fetchMethod]);

  return (
    <div     
        style={{
        display: "flex",
        gap: "12px",
        maxWidth: "100vw",
        overflowX: "auto", 
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        marginLeft: "20px",
        marginRight: "20px",
      }}>
      {items.length > 0 ? (
        items.map(item => <Card key={item.id} info={item} />)
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
};

export default Carousel;