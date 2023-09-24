import { fetchMovieReviews } from 'services/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Item } from 'components/Cast/Cast.styled';
import Notiflix from 'notiflix';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await fetchMovieReviews(movieId);
        setReviews(reviews);
      } catch (error) {
        Notiflix.Notify.failure(error);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <section>
      <ul>
        {reviews.length > 0 ? (
          reviews.map(({ id, author, content }) => (
            <Item key={id}>
              <h3>Author: {author}</h3>
              <p>{content}</p>
            </Item>
          ))
        ) : (
          <p>We don't have any reviews for this movie</p>
        )}
      </ul>
    </section>
  );
};

export default Reviews;
