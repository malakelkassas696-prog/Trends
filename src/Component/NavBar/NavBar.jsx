import { Link, useNavigate} from "react-router-dom";
import "./NavBar.css";

export default function NavBar({ loginData,setLoginData }) {
  let navigate = useNavigate()

  function Logout() {
    localStorage.removeItem("token")
    setLoginData(null)
    navigate("/")
    
  }
  return <>
    <nav className="navbar navbar-expand-lg bg-secondary-subtle">
      <div className="container-fluid">
        <Link className="navbar-brand">TRENDS</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {/* لو المستخدم عامل Login */}
          {loginData && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="tv">Tv.Trend</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="movie">Movie.Trend</Link>
              </li>
            </ul>
          )}

          {/* الناحية التانية - يمين */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {loginData ? (
              <li className="nav-item">
                <Link onClick={Logout} className="nav-link" to="">Logout</Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  </>
}
