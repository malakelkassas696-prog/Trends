import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MovieDetails() {
  const { id } = useParams(); // هتجيب ID الفيلم من ال URL
  const [movie, setMovie] = useState(null);

  async function getMovieDetails() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=bd7de1002d5d536889f2190d815dc7ec`
    );
    setMovie(data);
  }

  useEffect(() => {
    getMovieDetails();
  }, [id]);

  if (!movie) return <h2 className="text-center">Loading...</h2>;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-4">
          <img
            src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
            className="w-100"
            alt={movie.title}
          />
        </div>
        <div className="col-md-8">
          <h1>{movie.title}</h1>
          <p><strong>Overview:</strong> {movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}</p>
          <p><strong>Language:</strong> {movie.original_language}</p>
        </div>
      </div>
    </div>
  );
}
