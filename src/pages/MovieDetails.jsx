import { useEffect, useState } from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import { fetchMovieById } from 'services/api';
import {
  Container,
  DescrWrap,
  GenresWrap,
  Title,
  Text,
  Genres,
  Overview,
  InfoWrap,
  StyledBackLink,
  FullWidthStripe,
} from './MovieDetails.styled';
import { Suspense } from 'react';
import Notiflix from 'notiflix';

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const location = useLocation();
  const [previousLocation, setPreviousLocation] = useState(
    location.state?.from ?? '/'
  );

  useEffect(() => {
    const getMovie = async () => {
      try {
        const movie = await fetchMovieById(movieId);
        setMovie(movie);
      } catch (error) {
        Notiflix.Notify.failure(error);
      }
    };
    getMovie();
    if (!location.state?.from) {
      setPreviousLocation(location.pathname);
    }
  }, [movieId, location]);

  const {
    poster_path,
    title,
    release_date,
    vote_average,
    overview,
    genres,
    id,
  } = movie;
  const shouldDisplayInfo =
    poster_path &&
    title &&
    release_date &&
    vote_average &&
    overview &&
    genres &&
    genres.length > 0;

  return (
    <>
      {shouldDisplayInfo ? (
        <>
          <StyledBackLink to={previousLocation}>Go back</StyledBackLink>
          <Container>
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt="Movie poster"
              width={300}
              height={400}
            />
            <DescrWrap>
              <Title>
                {title} {`(${release_date.split('-')[0]})`}
              </Title>
              <Text>User Score: {Number(vote_average).toFixed(1)}</Text>
              <Overview>Overview</Overview>
              <Text>{overview}</Text>
              <Genres>Genres</Genres>
              <GenresWrap>
                {genres.map(({ id, name }) => (
                  <p key={id}>{name}</p>
                ))}
              </GenresWrap>
            </DescrWrap>
          </Container>
          <FullWidthStripe></FullWidthStripe>
          <InfoWrap>
            <p>Additional information</p>
            <ul>
              <li>
                <Link to={`/movies/${id}/cast`} state={{ from: location }}>
                  Cast
                </Link>
              </li>
              <li>
                <Link to={`/movies/${id}/reviews`} state={{ from: location }}>
                  Reviews
                </Link>
              </li>
            </ul>
            <Suspense fallback={<div>Loading info...</div>}>
              <FullWidthStripe></FullWidthStripe>
              <Outlet />
            </Suspense>
          </InfoWrap>
        </>
      ) : (
        <div>No information</div>
      )}
    </>
  );
};

export default MovieDetails;
