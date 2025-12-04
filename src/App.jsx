import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Component/Layout/Layout"
import Home from "./Component/Home/Home"
import Tv from "./Component/Tv.Trend/Tv"
import Movie from "./Component/Movie.Trend/Movie"
import LogIn from "./Component/LogIn/LogIn"
import TvDetails from "./Component/TvDetails/TvDetails"
import MovieDetails from "./Component/MovieDetails/MovieDetails"
import Register from "./Component/Register/Register"
import {jwtDecode} from "jwt-decode"
import { useEffect, useState } from "react"


export default function App() {
  let [loginData, setLoginData] = useState(null)


  function saveLoginData() {
    let encodedToken=localStorage.getItem("token")
    let decodedToken=jwtDecode(encodedToken)
    setLoginData(decodedToken);
    console.log(decodedToken);
  }

  useEffect(() => {
    if (localStorage.getItem("token")!=null) {
      saveLoginData()
    }
  }
 ,[])
  let routers = createBrowserRouter([
    {
      path: "", element: <Layout loginData={loginData} setLoginData={setLoginData}/>, children: [
        { index: true, element: <LogIn saveLoginData={saveLoginData}/> },
        { path: "tv", element: <Tv /> },
        { path: "movie", element: <Movie /> },
        { path: "movie/:id", element: <MovieDetails /> },
        { path: "tv/:id", element: <TvDetails /> },
        { path: "register", element: <Register /> },
        { path: "home", element: <Home /> },
      ]
    }
  ])
  return <>
    <RouterProvider router={routers} />
  </>
}
