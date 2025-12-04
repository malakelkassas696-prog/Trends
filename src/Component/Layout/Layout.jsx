import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

export default function Layout({loginData,setLoginData}) {
  return <>
  <NavBar loginData ={loginData} setLoginData={setLoginData}/>
  <Outlet/>
  <Footer/>
  </>
}
