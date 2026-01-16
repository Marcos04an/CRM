import { useState } from "react";


type NavItem =
| "Dasboard"
| "Empreendimentos"
| "Profissionais"
| "Unidades"
| "Atendimentos"
| "Configurações";

export default function NavBar(){
    const[activeItem, setActiveItem] = useState<NavItem>("Dasboard");

    return(
        <aside className="navbar">
            <div className="navbar-header">
                <span className="navbar-tittle">CRM AnyLAI</span>
            </div>

            <nav className="navbar-menu">
                {[
                    "Dashboard",
                    "Empreendimentos",
                    "Profissionais",
                    "Unidades",
                    "Atendimentos",
                    "Configurações",

                ].map((item)=>(
                    <a key={item}
                    className={activeItem === item ? "active" : ""}
                    onClick={() => setActiveItem(item as NavItem)}>
                        {item}
                    </a>
                ))}

            </nav>

        </aside>
    )
}