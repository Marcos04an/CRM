import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Enterprise from "../pages/Enterprise/Enterprise";
import LeadProfile from "../pages/LeadProfile/LeadProfile";
import PropertyRegistration from "../pages/PropertyRegistration/PropertyRegistration";
import ClientRegistration from "../pages/ClienteRegistration/ClientRegistration";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/empreendimentos" element={<Enterprise />} />
      <Route path="/perfil-lead" element={<LeadProfile />} />
      <Route path="/cadastro-lead" element={<ClientRegistration/>}/>
      <Route path="/cadastro-imovel" element={<PropertyRegistration />} />
      <Route path="/cadastro-cliente" element={<ClientRegistration />} />
    </Routes>
  );
}