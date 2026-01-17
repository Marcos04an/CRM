import { useState } from "react";
import "./NavBar.css";

type NavItem =
  | "Dashboard"
  | "Empreendimentos"
  | "Profissionais"
  | "Unidades"
  | "Atendimentos"
  | "Configurações"
  | "Sair";

export default function NavBar() {
  const [activeItem, setActiveItem] = useState<NavItem>("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: "📈" },
    { name: "Empreendimentos", icon: "🏢" },
    { name: "Profissionais", icon: "👥" },
    { name: "Unidades", icon: "🏠" },
    { name: "Atendimentos", icon: "🎧" },
    { name: "Configurações", icon: "⚙️" },
  ];

  return (
    <aside className="navbar">
      <div className="navbar-header">
        <div className="navbar-title">
          <span className="anylai-texto">
         CRM AnyL<span className="ai-green">AI</span>
        </span>
      
        </div>
      </div>

      <nav className="navbar-menu">
        {menuItems.map((item) => (
          <a
            key={item.name}
            className={activeItem === item.name ? "active" : ""}
            onClick={() => setActiveItem(item.name as NavItem)}
          >
            <span className="icon">{item.icon}</span>
            {item.name}
          </a>
        ))}
        
       
        <a className="logout-item" onClick={() => console.log("Sair")}>
          <span className="icon">↪️</span>
          Sair
        </a>
      </nav>
    </aside>
  );
}