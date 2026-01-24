import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Enterprise.css";

import casa1 from "../../assets/casa1.jpg";
import casa2 from "../../assets/casa2.jpg";
import casa3 from "../../assets/casa3.jpg";
import apartamento4 from "../../assets/apartamento4.jpg";

interface ItemTabela {
  id: number;
  cliente: string;
  imovel: string;
  etapa: string;
  status: string;
}

export default function Enterprise() {
  const navigate = useNavigate();
  const [filtroStatus, setFiltroStatus] = useState("Todos");

  const [listaTabela, setListaTabela] = useState<ItemTabela[]>([
    { id: 1, cliente: "Eduardo Couto", imovel: "Casa no Centro", etapa: "Visita agendada", status: "Em negociação" },
    { id: 2, cliente: "Lucia Lins", imovel: "Casa em Paudalho", etapa: "Proposta", status: "Em negociação" },
    { id: 3, cliente: "Wesley Santos", imovel: "Sobrado na Vila", etapa: "Contato feito", status: "Em andamento" },
    { id: 4, cliente: "Sabrina Oliveira", imovel: "Apartamento Z. Norte", etapa: "Contato feito", status: "Fechada" },
  ]);

  const [listaCards, setListaCards] = useState([
    { id: 1, img: casa1, titulo: "Casa em Candeias - PE", atualizacao: "Atualizado agora", tag: "Em progresso +" },
    { id: 2, img: casa2, titulo: "Casa em São Lourenço - PE", atualizacao: "Atualizado há 2 dias", tag: "Em progresso +" },
    { id: 3, img: casa3, titulo: "Sobrado em Apipucos", atualizacao: "Atualizado há 2 dias", tag: "Concluído +" },
    { id: 4, img: apartamento4, titulo: "Apartamento em Salvador - BA", atualizacao: "Atualizado há 2 dias", tag: "Em progresso +" }
  ]);

  const dadosFiltrados = listaTabela.filter(item => 
    filtroStatus === "Todos" || item.status === filtroStatus
  );

  const alternarEtapa = (id: number) => {
    const ciclo: Record<string, string> = {
      "Contato feito": "Visita agendada",
      "Visita agendada": "Proposta",
      "Proposta": "Contato feito"
    };
    setListaTabela(prev => prev.map(item => 
      item.id === id ? { ...item, etapa: ciclo[item.etapa] || "Contato feito" } : item
    ));
  };

  const alternarStatus = (id: number) => {
    const ciclo: Record<string, string> = {
      "Em andamento": "Em negociação",
      "Em negociação": "Fechada",
      "Fechada": "Em andamento"
    };
    setListaTabela(prev => prev.map(item => 
      item.id === id ? { ...item, status: ciclo[item.status] || "Em andamento" } : item
    ));
  };

  const alternarTagCard = (id: number) => {
    setListaCards(prev => prev.map(card => 
      card.id === id ? { ...card, tag: card.tag === "Em progresso +" ? "Concluído +" : "Em progresso +" } : card
    ));
  };

  return (
    <div className="enterprise-container">
      <header className="enterprise-header">
        <h1>Empreendimentos</h1>
        <button className="btn-add-verde" onClick={() => navigate("/cadastro-imovel")}>+ Novo Imóvel</button>
      </header>

      <div className="barra-filtros-legenda">
        <span className="label-filtrar">Filtrar: <span className="txt-todos" onClick={() => setFiltroStatus("Todos")}>Todos</span></span>
        <div className="grupo-status-filtros">
          <button className="item-status-btn" onClick={() => setFiltroStatus("Em andamento")}>
            <span className="dot dot-cinza"></span> Em andamento
          </button>
          <button className="item-status-btn" onClick={() => setFiltroStatus("Em negociação")}>
            <span className="dot dot-amarelo"></span> Em negociação
          </button>
          <button className="item-status-btn" onClick={() => setFiltroStatus("Fechada")}>
            <span className="dot dot-verde"></span> Fechadas
          </button>
        </div>
      </div>

      <div className="tabela-container">
        <table className="enterprise-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Imóvel</th>
              <th>Etapas</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dadosFiltrados.map((item) => (
              <tr key={item.id}>
                <td>{item.cliente}</td>
                <td>{item.imovel}</td>
                <td>
                  <span className="etapa-clicavel" onClick={() => alternarEtapa(item.id)}>
                    {item.etapa}
                  </span>
                </td>
                <td>
                  <span 
                    className={`badge-status cursor-pointer ${item.status === "Fechada" ? "bg-verde" : item.status === "Em negociação" ? "bg-amarelo" : "bg-cinza"}`}
                    onClick={() => alternarStatus(item.id)}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="secao-cards">
        <div className="cards-header-flex">
          <h2>Últimos Empreendimentos</h2>
          <button className="btn-ver-todos">Ver Todos</button>
        </div>
        <div className="cards-grid-layout">
          {listaCards.map((card) => (
            <div className="card-imovel" key={card.id}>
              <img src={card.img} alt="Imóvel" />
              <div className="card-body">
                <h3>{card.titulo}</h3>
                <p className="tempo-atualizacao">{card.atualizacao}</p>
                <span 
                  className={`cursor-pointer ${card.tag === "Concluído +" ? "badge-status bg-verde small-tag" : "tag-progresso"}`} 
                  onClick={() => alternarTagCard(card.id)}
                >
                  {card.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}