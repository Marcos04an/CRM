import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


export default function App(){

  return(
    <div>
      <Header/>
      <AppRoutes/>
      <Footer/>
    </div>
  )
}

