import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import "./App.css"


export default function App(){

  return(
    <div>
      <Header/>
      <NavBar/>
       <AppRoutes/>
      <main className="main-content"></main>
      <Footer/>
    </div>
  )
}

