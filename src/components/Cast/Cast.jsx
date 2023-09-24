import { Item } from './Cast.styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from 'services/api';
import Notiflix from 'notiflix';

const Cast = () => {
  const [actors, setActors] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const fetchActors = async () => {
      try {
        const actors = await fetchMovieCredits(movieId);
        if (actors.length > 0) {
          setActors(actors);
        }
      } catch (error) {
        Notiflix.Notify.failure(error);
      }
    };
    fetchActors();
  }, [movieId]);

  return (
    <section>
      <ul>
        {actors.map(({ profile_path, id, name, character }) => (
          <Item key={id}>
            {profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                alt="Actor"
                width={80}
                height={110}
              />
            )}

            <p>{name}</p>
            <p>Character: {character}</p>
          </Item>
        ))}
      </ul>
    </section>
  );
};

export default Cast;
