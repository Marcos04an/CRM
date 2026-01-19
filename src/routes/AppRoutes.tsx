import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Enterprise from "../pages/Enterprise/Enterprise";
import LeadProfile from "../pages/LeadProfile/LeadProfile";
import LeadRegistration from "../pages/LeadRegistration/LeadRegistration";
import PropertyRegistration from "../pages/PropertyRegistration/PropertyRegistration";
// Importação correta apontando para a pasta ClienteRegistration
import ClientRegistration from "../pages/ClienteRegistration/ClientRegistration";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/empreendimentos" element={<Enterprise />} />
      <Route path="/perfil-lead" element={<LeadProfile />} />
      <Route path="/cadastro-lead" element={<LeadRegistration />} />
      <Route path="/cadastro-imovel" element={<PropertyRegistration />} />
      
      {/* A nova rota deve ficar AQUI dentro */}
      <Route path="/cadastro-cliente" element={<ClientRegistration />} />
    </Routes>
  );
}