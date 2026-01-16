import { Link } from "react-router-dom";
import anylai from "../../assets/anylai.jpg"

 export default function Header(){
    return(
        <header className="header">
            <Link to="/" className="logo-container">
            <img src={anylai} alt="AnyLAI" className="anylai-img"/>
            <span className="anylai-texto">AnyLAI</span>
            </Link>

            <nav className="nav">
                <Link to="/">Início</Link>
                <Link to="/imoveis">Meus Imóveis</Link>
                <Link to="/construtora">Construtora Y</Link>

            </nav>


            
        </header>
    )
 }