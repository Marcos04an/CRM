import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PropertyRegistration.css";

export default function PropertyRegistration() {
  const navigate = useNavigate();
  const [mostrarSucesso, setMostrarSucesso] = useState(false);
  
  const [dados, setDados] = useState({
    tipo: "", finalidade: "", valor: "", bairro: "", cidade: "",
    quartos: "", banheiros: "", vagas: "", descricao: ""
  });
  
  const [erros, setErros] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
    setErros(erros.filter(item => item !== name));
  };

  const handleLimpar = () => {
    setDados({ tipo: "", finalidade: "", valor: "", bairro: "", cidade: "", quartos: "", banheiros: "", vagas: "", descricao: "" });
    setErros([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const novosErros = [];
    if (!dados.tipo) novosErros.push("tipo");
    if (!dados.finalidade) novosErros.push("finalidade");
    if (!dados.valor) novosErros.push("valor");
    if (!dados.bairro) novosErros.push("bairro");
    if (!dados.cidade) novosErros.push("cidade");

    if (novosErros.length > 0) {
      setErros(novosErros);
      return;
    }
    setMostrarSucesso(true);
  };

  return (
    <div className="area-total-centralizada">
      <div className="cartao-formulario">
        <button className="x-fechar-topo" onClick={() => navigate("/empreendimentos")}>×</button>
        
        <h2>Cadastrar Imóvel</h2>
        <p className="subtitulo">Informações principais do imóvel</p>
        <hr className="linha-divisora" />

        <form onSubmit={handleSubmit}>
          <p className="sessao-titulo">Dados do Imóvel</p>
          
          <label className={erros.includes("tipo") ? "texto-erro" : ""}>Tipo de Imóvel *</label>
          <div className="opcoes-alinhadas">
            <label><input type="radio" name="tipo" value="Casa" checked={dados.tipo === "Casa"} onChange={handleChange} /> Casa</label>
            <label><input type="radio" name="tipo" value="Apartamento" checked={dados.tipo === "Apartamento"} onChange={handleChange} /> Apartamento</label>
            <label><input type="radio" name="tipo" value="Terreno" checked={dados.tipo === "Terreno"} onChange={handleChange} /> Terreno</label>
          </div>

          <label className={erros.includes("finalidade") ? "texto-erro" : ""}>Finalidade *</label>
          <div className="opcoes-alinhadas">
            <label><input type="radio" name="finalidade" value="Venda" checked={dados.finalidade === "Venda"} onChange={handleChange} /> Venda</label>
            <label><input type="radio" name="finalidade" value="Aluguel" checked={dados.finalidade === "Aluguel"} onChange={handleChange} /> Aluguel</label>
          </div>

          <div className="caixa-entrada-vertical tamanho-medio">
            <label className={erros.includes("valor") ? "texto-erro" : ""}>Valor *</label>
            <input type="text" name="valor" placeholder="R$" className={erros.includes("valor") ? "borda-erro" : ""} value={dados.valor} onChange={handleChange} />
          </div>

          <p className="sessao-titulo">Localização</p>
          <div className="linha-dupla-campos">
            <div className="caixa-entrada-vertical">
              <label className={erros.includes("bairro") ? "texto-erro" : ""}>Bairro *</label>
              <input type="text" name="bairro" className={erros.includes("bairro") ? "borda-erro" : ""} value={dados.bairro} onChange={handleChange} />
            </div>
            <div className="caixa-entrada-vertical">
              <label className={erros.includes("cidade") ? "texto-erro" : ""}>Cidade *</label>
              <input type="text" name="cidade" className={erros.includes("cidade") ? "borda-erro" : ""} value={dados.cidade} onChange={handleChange} />
            </div>
          </div>

          <p className="sessao-titulo">Características</p>
          <div className="linha-tripla-campos">
            <div className="caixa-entrada-vertical">
              <label>Quartos</label>
              <input type="number" name="quartos" value={dados.quartos} onChange={handleChange} />
            </div>
            <div className="caixa-entrada-vertical">
              <label>Banheiros</label>
              <input type="number" name="banheiros" value={dados.banheiros} onChange={handleChange} />
            </div>
            <div className="caixa-entrada-vertical">
              <label>Vagas Garagem</label>
              <input type="number" name="vagas" value={dados.vagas} onChange={handleChange} />
            </div>
          </div>

          <div className="caixa-entrada-vertical">
            <label>Descrição</label>
            <textarea name="descricao" placeholder="Detalhes do imóvel..." value={dados.descricao} onChange={handleChange} />
          </div>

          <div className="botoes-final">
            <button type="button" className="botao-cinza-limpar" onClick={handleLimpar}>Limpar</button>
            <button type="submit" className="botao-verde-confirmar">Finalizar</button>
          </div>
        </form>

        {mostrarSucesso && (
          <div className="notificacao-sucesso">
            <button className="x-fechar-notif" onClick={() => setMostrarSucesso(false)}>×</button>
            <div className="icone-check">✔</div>
            <p>Imóvel cadastrado com sucesso!</p>
          </div>
        )}
      </div>
    </div>
  );
}