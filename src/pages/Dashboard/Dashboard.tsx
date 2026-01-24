import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

type LeadStatus = "novo" | "visita" | "proposta";

interface Lead {
  id: number;
  nome: string;
  local: string;
  status: LeadStatus;
  projeto?: string;
  mensagem?: string;
  tempo?: string;
  telefone?: string;
}

interface Agendamento {
  data: string;
  hora: string;
  cliente: string;
  status: "Agendado" | "Pendente";
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  const [funilAtivo, setFunilAtivo] = useState<string>("Leads");

  const [toast, setToast] = useState<string>("");

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [addedLeadName, setAddedLeadName] = useState("");

  useEffect(() => {
    setLeads([
      { id: 1, nome: "Joana Bezerra", local: "North Palace", status: "novo", mensagem: "Oi, gostaria de saber mais sobre...", tempo: "há 15 min", telefone: "(21) 98736-2993" },
      { id: 2, nome: "Alan Braga", local: "Acaú", status: "visita", projeto: "Apartamento 2 quartos", tempo: "há 2 horas", telefone: "(21) 98736-2993" },
      { id: 3, nome: "Eduardo Silva", local: "Beach Lotus", status: "proposta", mensagem: "Oi, gostaria de saber mais...", tempo: "há 45 min", telefone: "(21) 98736-2993" },
    ]);

    setAgendamentos([
      { data: "Hoje", hora: "9hrs", cliente: "Luisa Santos", status: "Agendado" },
      { data: "Hoje", hora: "14hrs", cliente: "Carlos Silva", status: "Agendado" },
      { data: "Amanhã", hora: "16hrs", cliente: "Elio Lima", status: "Pendente" },
      { data: "Amanhã", hora: "18hrs", cliente: "Ana Sobral", status: "Pendente" },
    ]);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 3000);
  };

  const handleNovoLead = () => {
    navigate("/cadastro-lead");
  };

  const handleAdicionarLead = (status: LeadStatus) => {
    const salvo = localStorage.getItem("ultimoLead");

    if (!salvo) {
      showToast("Cadastre um lead para ele aparecer na coluna.");
      return;
    }

    const lead = JSON.parse(salvo) as {
      fullName: string;
      email: string;
      phone: string;
      interest: string;
      priceRange?: string;
      origin?: string;
    };

    const novoLead: Lead = {
      id: Date.now(),
      nome: lead.fullName,
      local: lead.interest || "Projeto não informado",
      status,
      telefone: lead.phone,
      mensagem: "Lead recém cadastrado",
      tempo: "agora",
    };

    setLeads((prev) => [...prev, novoLead]);
    localStorage.removeItem("ultimoLead");

    setAddedLeadName(lead.fullName);
    setShowAddPopup(true);
    window.setTimeout(() => setShowAddPopup(false), 2500);
  };

  const renderLeads = (status: LeadStatus) =>
    leads
      .filter((lead) => lead.status === status)
      .map((lead) => (
        <div key={lead.id} className="lead-card">
          <div className="lead-header">
            <div className="avatar-circle"></div>
            <div className="lead-info">
              <strong>{lead.nome}</strong>
              <span>{lead.telefone || "(21) 98736-2993"}</span>
            </div>
          </div>
          <p className="lead-location">🏢 {lead.local}</p>
          {lead.mensagem && <div className="lead-msg">"{lead.mensagem}"</div>}
          {lead.projeto && <div className="lead-project">{lead.projeto}</div>}
          <div className="lead-footer">
            <span className="ia-badge">🤖 Atendida por IA</span>
            <span className="lead-time">{lead.tempo}</span>
          </div>
        </div>
      ));

  return (
    <div className="dashboard-page-wrapper">
      <main className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Seja bem-vindo(a) de volta!</p>
          </div>
          <button className="btn-new-lead" onClick={handleNovoLead}>
            + Novo Lead
          </button>
        </header>

        <section className="summary-cards">
          <div className="card"><span>Novos Leads</span><h2>{leads.filter((l) => l.status === "novo").length}</h2></div>
          <div className="card"><span>Visitas Agendadas</span><h2>{leads.filter((l) => l.status === "visita").length}</h2></div>
          <div className="card"><span>Propostas Ativas</span><h2>{leads.filter((l) => l.status === "proposta").length}</h2></div>
          <div className="card"><span>Negócios Fechados</span><h2>10</h2></div>
        </section>

        <div className="main-layout-grid">
          <div className="left-content-area">
            <section className="kanban-row">
              <div className="column column-blue">
                <div className="column-title">Novos Leads</div>
                <div className="column-body">
                  {renderLeads("novo")}
                  <button className="add-lead-btn highlight" onClick={() => handleAdicionarLead("novo")}>
                    + Adicionar Lead
                  </button>
                </div>
              </div>

              <div className="column column-yellow">
                <div className="column-title">Visitas Agendadas</div>
                <div className="column-body">
                  {renderLeads("visita")}
                  <button className="add-lead-btn highlight" onClick={() => handleAdicionarLead("visita")}>
                    + Adicionar Lead
                  </button>
                </div>
              </div>

              <div className="column column-propostas">
                <div className="column-title">Propostas</div>
                <div className="column-body">
                  {renderLeads("proposta")}
                  <button className="add-lead-btn highlight" onClick={() => handleAdicionarLead("proposta")}>
                    + Adicionar Lead
                  </button>
                </div>
              </div>
            </section>

            <section className="funil-vendas-container">
              <h3>Funil de Vendas</h3>
              <div className="funil-steps">
                <div className={`funil-step ${funilAtivo === "Leads" ? "active" : ""}`} onClick={() => setFunilAtivo("Leads")}>Leads</div>
                <div className={`funil-step ${funilAtivo === "Contato Feito" ? "active" : ""}`} onClick={() => setFunilAtivo("Contato Feito")}>Contato Feito</div>
                <div className={`funil-step ${funilAtivo === "Visitas Agendadas" ? "active" : ""}`} onClick={() => setFunilAtivo("Visitas Agendadas")}>Visitas Agendadas</div>
                <div className={`funil-step ${funilAtivo === "Propostas" ? "active" : ""}`} onClick={() => setFunilAtivo("Propostas")}>Propostas</div>
                <div className={`funil-step ${funilAtivo === "Fechados" ? "active" : ""}`} onClick={() => setFunilAtivo("Fechados")}>Fechados</div>
              </div>

              <div className="funil-cards-row">
                <div className="funil-item"><strong>Camila Silva</strong><p>Sobrado com 2 quartos</p></div>
                <div className="funil-item"><strong>Julia Mendes</strong><p>Casa com 3 quartos</p></div>
                <div className="funil-item"><strong>Lara Lima</strong><p>Duplex <span className="price-tag">R$ 100.000</span></p></div>
                <div className="funil-item"><strong>Maria Silva</strong><p>Apartamento com suíte</p></div>
              </div>
            </section>
          </div>

          <aside className="right-sidebar">
            <div className="sidebar-section agendamentos-box">
              <div className="sidebar-header-green">Negócios Fechados</div>
              <div className="sidebar-padding">
                <h4>Próximos Agendamentos</h4>
                <div className="table-scroll">
                  <table className="agendamentos-table">
                    <thead>
                      <tr><th>Data</th><th>Cliente</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      {agendamentos.map((item, i) => (
                        <tr key={i}>
                          <td><small>{item.data}</small><br />{item.hora}</td>
                          <td>{item.cliente}</td>
                          <td><span className={`badge-${item.status.toLowerCase()}`}>{item.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="sidebar-section historico-box">
              <div className="sidebar-padding">
                <h4>Histórico de Interações <span className="ai-tag">🤖 IA</span></h4>
                <div className="user-profile-mini">
                  <div className="avatar-circle"></div>
                  <div>
                    <strong>Carlos Lima</strong>
                    <p>Corretor Interno</p>
                  </div>
                </div>
                <div className="interaction-timeline">
                  <div className="timeline-item">
                    <span>10/01 - 14:30</span>
                    <p>🤖 IA respondeu sobre condomínio via WhatsApp.</p>
                  </div>
                  <div className="timeline-item">
                    <span>10/07 - 09:00</span>
                    <p>🤖 IA sugeriu imóvel similar ao buscado.</p>
                  </div>
                </div>
                <button className="btn-assumir">Assumir Conversa</button>
              </div>
            </div>
          </aside>
        </div>

        {toast && <div className="toast-warning">{toast}</div>}

        {showAddPopup && (
          <div className="lead-added-popup">
            Lead <strong>{addedLeadName}</strong> adicionado!
          </div>
        )}
      </main>
    </div>
  );
}
