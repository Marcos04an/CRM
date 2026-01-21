import { useState } from "react";
import "./Enterprise.css";

import casa1 from "../../assets/casa1.jpg";
import casa2 from "../../assets/casa2.jpg";
import casa3 from "../../assets/casa3.jpg";
import apartamento4 from "../../assets/apartamento4.jpg";

export default function Enterprise() {
  const [menuAberto, setMenuAberto] = useState<number | null>(null);

  const empreendimentosLista = [
    { id: 1, cliente: "Eduardo Couto", imovel: "Casa no Centro do Recife", etapa: "Visita Agendada", status: "Fechada" },
    { id: 2, cliente: "Lucia Lins", imovel: "Casa em Paudalho", etapa: "Proposta", status: "Em negociação" },
    { id: 3, cliente: "Wesley Santos", imovel: "Sobrado na Vila", etapa: "Proposta", status: "Em negociação" },
    { id: 4, cliente: "Sabrina Oliveira", imovel: "Apartamento na Zona Norte", etapa: "Contato Feito", status: "Em andamento" },
  ];

  const cardsDados = [
    { id: 1, img: casa1, titulo: "Casa em Candeias - PE", atualizacao: "Atualizado há 1hr", tag: "Em progresso +" },
    { id: 2, img: casa2, titulo: "Casa em São Lourenço - PE", atualizacao: "Atualizado há 2 dias", tag: "Em progresso +" },
    { id: 3, img: casa3, titulo: "Sobrado em Apipucos", atualizacao: "Atualizado há 2 dias", tag: "Concluído +" },
    { id: 4, img: apartamento4, titulo: "Apartamento em Salvador - BA", atualizacao: "Atualizado há 2 dias", tag: "Em progresso +" }
  ];

  return (
    <div className="enterprise-container">
      <header className="enterprise-header">
        <h1>Empreendimentos</h1>
        <button className="btn-add-verde">+ Novo Imóvel</button>
      </header>

      <section className="filtro-container">
        <div className="filtro-content">
          <p>Filtrar: <span className="texto-verde-bold">Todos</span></p>
          <div className="legenda-cores">
            <span className="dot dot-cinza"></span> Em andamento
            <span className="dot dot-amarelo"></span> Em negociação
            <span className="dot dot-verde"></span> Fechadas
          </div>
        </div>
      </section>

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
            {empreendimentosLista.map((item) => (
              <tr key={item.id}>
                <td>{item.cliente}</td>
                <td>{item.imovel}</td>
                <td>{item.etapa}</td>
                <td>
                  <span className={`badge-status ${
                    item.status === "Fechada" ? "bg-verde" : 
                    item.status === "Em negociação" ? "bg-amarelo" : "bg-cinza"
                  }`}>
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
          {cardsDados.map((card) => (
            <div className="card-imovel" key={card.id}>
              <img src={card.img} alt="Imóvel" />
              <div className="card-body">
                <h3>{card.titulo}</h3>
                <p className="tempo-atualizacao">{card.atualizacao}</p>
                <div className="card-footer-flex">
                  <span className={card.tag === "Concluído +" ? "badge-status bg-verde text-small" : "tag-progresso"}>
                    {card.tag}
                  </span>
                  <button className="btn-tres-pontos" onClick={() => setMenuAberto(menuAberto === card.id ? null : card.id)}>
                    ⋮
                  </button>
                </div>
              </div>

              {menuAberto === card.id && (
                <div className="popup-acoes">
                  <div className="item-menu-acao">👁️ Ver detalhes</div>
                  <div className="item-menu-acao">👤+ Associar lead</div>
                  <div className="item-menu-acao">📅 Registrar visita</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="area-sair-footer">
         <button className="btn-sair-link">
           <span className="icon-seta">↪️</span> Sair
         </button>
      </div>
    </div>
  );
}