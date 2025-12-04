import Movie from "../Movie.Trend/Movie";
import Tv from "../Tv.Trend/Tv";


export default function Home() {
  return <>
    <hr />
    <h1 className="text-center">Home</h1>
    <hr />
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <Movie />
        </div>
        <div className="col-md-6">
          <Tv />
        </div>
      </div>
    </div>
  </>
}
