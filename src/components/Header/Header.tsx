import { Link } from "react-router-dom";

 export default function Header(){
    return(
        <header>
            <h1>AnyLAI</h1>
            <nav>
                <Link to="/">Início</Link>
                <Link to="/imoveis">Meus Imóveis</Link>
                <Link to="/construtora">Construtora Y</Link>
            </nav>
        </header>
    )
 }