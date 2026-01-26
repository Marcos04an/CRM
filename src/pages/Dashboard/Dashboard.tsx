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
}

interface ClienteFunil {
  nome: string;
  descricao: string;
  etapa: string;
  preco?: string;
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

  //colocamos para controlar a exibição do pop-up
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLead, setNewLead] = useState({ nome: "", telefone: "" });
  const [statusParaAdicionar, setStatusParaAdicionar] = useState<LeadStatus>("novo");

  //aqui controla a etapa ativa do funil
  const [etapaAtiva, setEtapaAtiva] = useState("Leads");
  const [clientesFunil, setClientesFunil] = useState<ClienteFunil[]>([]);
  const etapasFunil = ["Leads", "Contato Feito", "Visitas Agendadas", "Propostas", "Fechados"];



//vai carregar os leads do localstorage
useEffect(() => {
    const leadsSalvos = localStorage.getItem("leads");

    if (leadsSalvos) {
      setLeads(JSON.parse(leadsSalvos));
    } else {
      const iniciais: Lead[] = [
        {
          id: 1,
          nome: "Joana Bezerra",
          local: "North Palace",
          status: "novo",
          tempo: "há 15 min",
        },
        {
          id: 2,
          nome: "Alan Braga",
          local: "Acaú",
          status: "visita",
          tempo: "há 2 horas",
        },
        {
          id: 3,
          nome: "Eduardo Silva",
          local: "Beach Lotus",
          status: "proposta",
          tempo: "há 45 min",
        },
      ];

      setLeads(iniciais);
      localStorage.setItem("leads", JSON.stringify(iniciais));
    }
  }, []);


  //vai salvar automaticamente 
  useEffect(() => {
  if (leads.length > 0) {
    localStorage.setItem("leads", JSON.stringify(leads));
  }
}, [leads]);

  
  //preenchemos os estados com dados fictícios
  useEffect(() => {
    
    setAgendamentos([
      { data: "Hoje", hora: "09:00", cliente: "Luisa Santos", status: "Agendado" },
      { data: "Hoje", hora: "14:00", cliente: "Carlos Silva", status: "Agendado" },
      { data: "Amanhã", hora: "16:00", cliente: "Elio Lima", status: "Pendente" },
    ]);

    setClientesFunil([
      { nome: "Camila Silva", descricao: "Sobrado com 2 quartos", etapa: "Leads" },
      { nome: "Julia Mendes", descricao: "Casa com 3 quartos", etapa: "Leads" },
      { nome: "Ricardo Alves", descricao: "Apartamento Centro", etapa: "Contato Feito" },
      { nome: "Lara Lima", descricao: "Duplex", etapa: "Visitas Agendadas", preco: "R$ 100.000" },
      { nome: "Maria Silva", descricao: "Apartamento com suíte", etapa: "Propostas" },
    ]);
  }, []);

  //abre o pop-up(modal) e vai definir o status que o lead vai ser adicionado
  const abrirModalParaStatus = (status: LeadStatus) => {
    setStatusParaAdicionar(status);
    setShowAddLeadModal(true);
  };

  //vai renderizar de acordo com o status do lead que vai ser criado
  const renderLeads = (status: LeadStatus) =>
    leads
       //vai filtrar por status
      .filter((lead) => lead.status === status)
      .map((lead) => (
        <div key={lead.id} className="lead-card">
          <div className="lead-header">
            <div className="avatar-circle"></div>
            <div className="lead-info">
              <strong>{lead.nome}</strong>
              <span>(21) 98736-2993</span>
            </div>
          </div>
          <p className="lead-location">🏢 {lead.local}</p>
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

          <button className="btn-new-lead" onClick={() => navigate("./cadastro-cliente")}>
            + Novo Lead
          </button>

          
        </header>
        

        {/* cards */}
        <section className="summary-cards">
          <div className="card"><span>Novos Leads</span><h2>{leads.filter(l => l.status === "novo").length}</h2></div>
          <div className="card"><span>Visitas Agendadas</span><h2>{leads.filter(l => l.status === "visita").length}</h2></div>
          <div className="card"><span>Propostas Ativas</span><h2>{leads.filter(l => l.status === "proposta").length}</h2></div>
          <div className="card"><span>Negócios Fechados</span><h2>10</h2></div>
        </section>
        
        {/* layaout principal */}
        <div className="main-layout-grid">
          <div className="left-content-area">



            {/* kanban de leads */}
            <section className="kanban-row">
              <div className="column column-blue">
                <div className="column-title">Novos Leads</div>
                <div className="column-body">
                  <div className="scroll-area">{renderLeads("novo")}</div>
                  <button className="add-lead-btn" onClick={() => abrirModalParaStatus("novo")}>+ Adicionar Lead</button>
                </div>
              </div>
              <div className="column column-yellow">
                <div className="column-title">Visitas Agendadas</div>
                <div className="column-body">
                  <div className="scroll-area">{renderLeads("visita")}</div>
                  <button className="add-lead-btn" onClick={() => abrirModalParaStatus("visita")}>+ Adicionar Lead</button>
                </div>
              </div>
              <div className="column column-propostas">
                <div className="column-title">Propostas</div>
                <div className="column-body">
                  <div className="scroll-area">{renderLeads("proposta")}</div>
                  <button className="add-lead-btn" onClick={() => abrirModalParaStatus("proposta")}>+ Adicionar Lead</button>
                </div>
              </div>
            </section>
           

           {/* funil de vendas */}
            <section className="funil-vendas-container">
              <h3>Funil de Vendas</h3>
              <div className="funil-steps">
                {etapasFunil.map((etapa) => (
                  <div
                    key={etapa}
                    className={`funil-step ${etapaAtiva === etapa ? "active" : ""}`}
                    onClick={() => setEtapaAtiva(etapa)}
                    style={{ cursor: "pointer" }}
                  >
                    {etapa}
                  </div>
                ))}
              </div>
              <div className="funil-cards-row">
                {clientesFunil.filter(c => c.etapa === etapaAtiva).map((cliente, index) => (
                  <div className="funil-item" key={index}>
                    <strong>{cliente.nome} - <span className="etapa-label">{etapaAtiva}</span></strong>
                    <p>{cliente.descricao}</p>
                  </div>
                ))}
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
                    <tbody>
                      {agendamentos.map((item, i) => (
                        <tr key={i}>
                          <td className="date-cell">
                            <span className="calendar-icon">📅 {item.data}</span>
                            <br />
                            <span className="time-label">{item.hora}</span>
                          </td>
                          <td className="client-cell">{item.cliente}</td>
                          <td>
                            <span className={`status-badge badge-${item.status.toLowerCase()}`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="sidebar-section historico-box">
              <div className="sidebar-padding">
                <h4>Histórico de Interações</h4>
                <div className="user-profile-mini">
                  <div className="avatar-circle"></div>
                  <div>
                    <strong>Carlos Lima</strong>
                    <p>Corretor Interno</p>
                  </div>
                </div>

                <div className="interaction-timeline">
                  <div className="timeline-item">
                    <div className="timeline-header">
                      <span className="timeline-date">10/07 - 09:00</span>
                      <span className="badge-user ia">🤖 IA</span>
                    </div>
                    <p className="timeline-msg">"Olá! Sou a assistente virtual. Como posso te ajudar hoje?"</p>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-header">
                      <span className="timeline-date">10/07 - 09:02</span>
                      <span className="badge-user client">👤 Cliente</span>
                    </div>
                    <p className="timeline-msg"><strong>"Olá, estou interessada em um imóvel no North Palace."</strong></p>
                  </div>
                </div>

                <button className="btn-assumir">Assumir Conversa</button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* modal  pra adicionar o lead*/}
      {showAddLeadModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Novo Lead</h3>
            <input
              type="text"
              placeholder="Nome do cliente"
              value={newLead.nome}
              onChange={(e) => setNewLead({ ...newLead, nome: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Telefone"
              value={newLead.telefone}
              onChange={(e) => setNewLead({ ...newLead, telefone: e.target.value })}
            />
            <div className="modal-actions">
              <button onClick={() => setShowAddLeadModal(false)}>Cancelar</button>
              <button
                onClick={() => {
                  if(newLead.nome) {
                    const novo: Lead = { 
                      id: Date.now(), 
                      nome: newLead.nome, 
                      local: "Manual", 
                      status: statusParaAdicionar, 
                      tempo: "agora" 
                    };
                    setLeads([novo, ...leads]);
                    setShowAddLeadModal(false);
                    setNewLead({ nome: "", telefone: "" });
                  }
                }}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}