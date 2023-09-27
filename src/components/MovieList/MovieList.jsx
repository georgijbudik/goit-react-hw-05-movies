import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchPopularMovies } from 'services/api';
import Notiflix from 'notiflix';

export const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const results = await fetchPopularMovies();
        setMovies(results);
      } catch (error) {
        Notiflix.Notify.failure(error);
      }
    };
    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <ul>
        {movies.map(({ id, title }) => (
          <li key={id}>
            <Link to={`/movies/${id}`} state={{ from: location }}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
