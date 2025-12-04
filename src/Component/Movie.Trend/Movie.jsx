import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Movie.css"

export default function Movie() {
  const [movietrend, setMovieTrend] = useState([]);

  async function TrendMovie() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=44ee5523e457e74020effc2bddc4592e"
    );
    setMovieTrend(data.results);
  }

  useEffect(() => {
    TrendMovie();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 ">
            <hr />
            <h1 className="text-center">MovieTrend</h1>
            <hr />
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {movietrend.map((item) => (
  <div className="col-md-3 mb-4" key={item.id}>
    <Link
      to={`/movie/${item.id}`}
      className="movie-card d-block text-decoration-none text-dark"
    >
      <div className="position-relative overflow-hidden">
        <img
          src={"https://image.tmdb.org/t/p/w500/" + item.poster_path}
          className="w-100 rounded shadow"
          alt={item.title}
        />
        {/* ✅ البادج بتاع الراتينج */}
        <span
          className="badge bg-warning text-dark position-absolute"
          style={{ top: "10px", right: "10px", fontSize: "14px" }}
        >
          ⭐ {item.vote_average.toFixed(1)}
        </span>
      </div>
      <h2 className="h6 mt-2 text-center">{item.title}</h2>
    </Link>
  </div>
))}




        </div>
      </div>
    </>
  );
}
