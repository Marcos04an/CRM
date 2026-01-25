import { useState } from "react";
// 1. Importamos o hook de navegação
import { useNavigate } from "react-router-dom"; 
import "./NavBar.css";

type NavItem =
  | "Dashboard"
  | "Empreendimentos"
  | "Profissionais"
  | "Unidades"
  | "Atendimentos"
  | "Configurações"
  | "Cadastro-Cliente" // Ajustei para bater com o nome no menuItems
  | "Sair";

export default function NavBar() {
  const [activeItem, setActiveItem] = useState<NavItem>("Dashboard");
  
  // 2. Inicializamos a função de navegação
  const navigate = useNavigate();

  // 3. Adicionamos a propriedade 'path' para cada item saber para onde ir
  const menuItems = [
    { name: "Dashboard", icon: "📈", path: "/" },
    { name: "Empreendimentos", icon: "🏢", path: "/empreendimentos" },
    { name: "Profissionais", icon: "👥", path: "/profissionais" },
    { name: "Unidades", icon: "🏠", path: "/unidades" },
    { name: "Atendimentos", icon: "🎧", path: "/atendimentos" },
    // Aqui está o caminho que criamos no AppRoutes.tsx:
    /* { name: "Cadastro-Cliente", icon: "📝", path: "/cadastro-cliente" },  */
    { name: "Configurações", icon: "⚙️", path: "/configuracoes" },
  ];

  const handleNavigation = (name: string, path: string) => {
    // Atualiza o visual (qual botão fica colorido)
    setActiveItem(name as NavItem);
    // Realiza a navegação real (muda a URL)
    navigate(path);
  };

  return (
    <aside className="navbar">
      <div className="navbar-header">
        <div className="navbar-title">
          <span className="navbar-logo-icon">📁</span>
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
            // 4. Chamamos nossa nova função que navega E pinta o botão
            onClick={() => handleNavigation(item.name, item.path)}
            style={{ cursor: "pointer" }} // Garante que a mãozinha apareça
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