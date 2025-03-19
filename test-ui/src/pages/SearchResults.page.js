import React, { useState, useEffect } from 'react';
import tmdbService from '../services/tmdb.service';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const query = new URLSearchParams(window.location.search).get('query');

  useEffect(() => {
    if (query) {
      tmdbService.search(query, page).then(response => {
        setResults(response.data.results);
        setHasMore(page !== response.data.total_pages);
      }).catch(error => {
        console.error('Error fetching search results:', error);
      });
    }
  }, [query, page]);

  return (
    <div>
      <h2>Search Results</h2>
      <div>
        {results.length ? (
          results.map(item => (
            <div key={item.id}>
              <h3>{item.title || item.name}</h3>
              {/* Muestra más detalles aquí */}
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
      {hasMore && (
        <button onClick={() => setPage(page + 1)}>Load More</button>
      )}
    </div>
  );
};

export default SearchResults;
