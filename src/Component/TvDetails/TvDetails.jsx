import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TvDetails() {
  const { id } = useParams(); // بناخد id من الرابط
  const [tv, setTv] = useState(null);

  async function getTvDetails() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=44ee5523e457e74020effc2bddc4592e&language=en-US`
    );
    setTv(data);
  }

  useEffect(() => {
    getTvDetails();
  }, [id]);

  if (!tv) return <h2 className="text-center mt-5">Loading...</h2>;

  return (
    <div className="container mt-5">
      <div className="row">
        {/* صورة المسلسل */}
        <div className="col-md-4">
          <img
            src={"https://image.tmdb.org/t/p/w500/" + tv.poster_path}
            alt={tv.name}
            className="w-100 rounded shadow"
          />
        </div>

        {/* تفاصيل المسلسل */}
        <div className="col-md-8">
          <h2>{tv.name}</h2>
          <p><strong>First Air Date:</strong> {tv.first_air_date}</p>
          <p><strong>Number of Seasons:</strong> {tv.number_of_seasons}</p>
          <p><strong>Number of Episodes:</strong> {tv.number_of_episodes}</p>
          <p><strong>Rating:</strong> ⭐ {tv.vote_average.toFixed(1)}</p>
          <p><strong>Overview:</strong> {tv.overview}</p>
        </div>
      </div>
    </div>
  );
}
