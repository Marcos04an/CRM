import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
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
  const navigate = useNavigate();

    const menuItems = [
    { name: "Dashboard", icon: "📈", path: "/" },
    { name: "Empreendimentos", icon: "🏢", path: "/empreendimentos" },
    { name: "Profissionais", icon: "👥", path: "/profissionais" },
    { name: "Unidades", icon: "🏠", path: "/unidades" },
    { name: "Atendimentos", icon: "🎧", path: "/atendimentos" },
        { name: "Configurações", icon: "⚙️", path: "/configuracoes" },
  ];

  const handleNavigation = (name: string, path: string) => {
    setActiveItem(name as NavItem);
    navigate(path);
  };

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
            onClick={() => handleNavigation(item.name, item.path)}
            style={{ cursor: "pointer" }}
          >
            <span className="icon">{item.icon}</span>
            {item.name}
          </a>
        ))}
        
        <a className="logout-item" onClick={() => console.log("Sair")} style={{ cursor: "pointer" }}>
          <span className="icon">↪️</span>
          Sair
        </a>
      </nav>
    </aside>
  );
}