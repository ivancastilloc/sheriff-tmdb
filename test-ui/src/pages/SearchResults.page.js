import React, { useState, useEffect, useRef } from 'react';
import tmdbService from '../services/tmdb.service';
import Card from '../components/Card/Card';
import userFavouritesService from '../services/userFavourites.service';
import authService from '../services/auth.service';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const query = new URLSearchParams(window.location.search).get('query');

  const [favourites, setFavourites] = useState([]);
  const user_id = authService.getUserId();
  const loadMoreRef = useRef(null);

  useEffect(() => {
    userFavouritesService.getFavourites(user_id)
      .then(response => {
        setFavourites(response.data);
      })
      .catch(error => {
        console.error("Error al obtener favoritos:", error);
      });
  }, []);

  useEffect(() => {
    if (query) {
      setResults([]);
      setPage(1);
      tmdbService.search(query, 1).then(response => {
        setResults(response.data.results);
        setHasMore(1 < response.data.total_pages);
      }).catch(error => {
        console.error('Error fetching search results:', error);
      });
    }
  }, [query]);

  useEffect(() => {
    if (query && page > 1) {
      tmdbService.search(query, page).then(response => {
        setResults(prevResults => [...prevResults, ...response.data.results]);
        setHasMore(page < response.data.total_pages);
      }).catch(error => {
        console.error('Error fetching search results:', error);
      });
    }
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
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
      <h2>Search Results 🔍</h2>
      <div className='search__cards'>
        {results.length ? (
          results.map(item => (
            <Card key={item.id} info={item} favourites={favourites} />
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>

      {hasMore && <div ref={loadMoreRef} style={{ height: '20px' }} />}
    </div>
  );
};

export default SearchResults;
