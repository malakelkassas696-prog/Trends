
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Tv.css"; // 👈 هنربط ملف CSS

export default function Tv() {
  const [tvtrend, setTvTrend] = useState([]);

  async function TrendTv() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/tv/day?api_key=44ee5523e457e74020effc2bddc4592e"
    );
    setTvTrend(data.results);
  }

  useEffect(() => {
    TrendTv();
  }, []);

  return <>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 ">
            <hr />
            <h1 className="text-center">TvTrend</h1>
            <hr />
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {tvtrend.map((item) => (
            <div className="col-md-3 mb-4" key={item.id}>
              <Link
                to={`/tv/${item.id}`}
                className="tv-card d-block text-decoration-none text-dark"
              >
                <div className="poster-wrapper position-relative">
                  <img
                    src={"https://image.tmdb.org/t/p/w500/" + item.poster_path}
                    className="w-100 rounded shadow"
                    alt={item.name}
                  />
                  <span className="rating badge bg-warning text-dark">
                    ⭐ {item.vote_average.toFixed(1)}
                  </span>
                </div>
                <h2 className="h6 mt-2 text-center">{item.name}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  
}
