import SearchBox from 'components/SearchBox/SearchBox';
import { Container } from './Movies.styled';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { fetchMovieByName } from 'services/api';
import Notiflix from 'notiflix';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('query') ?? '';
  const [searchQuery, setSearchQuery] = useState(movieName ? movieName : '');
  const [movies, setMovies] = useState([]);

  const location = useLocation();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    if (form.value === '') return;
    setSearchQuery(movieName);
    updateQueryString(movieName);
    form.reset();
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (!searchQuery) {
          return;
        }
        const movies = await fetchMovieByName(searchQuery);
        setMovies(movies);
      } catch (error) {
        Notiflix.Notify.failure(error);
      }
    };
    fetchMovies();
  }, [searchQuery]);

  const updateQueryString = query => {
    const nextParams = query !== '' ? { query } : {};
    setSearchParams(nextParams);
  };

  return (
    <div>
      <Container>
        <SearchBox onSubmit={handleSubmit} onChange={updateQueryString} />
      </Container>
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

export default Movies;
