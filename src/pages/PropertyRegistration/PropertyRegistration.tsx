import { useState, useEffect } from "react";
import "./PropertyRegistration.css";

export default function PropertyRegistration() {
  const [dados, setDados] = useState({
    tipo: "", 
    finalidade: "", 
    valor: "", 
    bairro: "", 
    cidade: "",
    quartos: "", 
    banheiros: "", 
    vagas: "", 
    descricao: ""
  });

  const [erros, setErros] = useState<string[]>([]);
  const [mostrarSucesso, setMostrarSucesso] = useState(false);

  useEffect(() => {
    if (mostrarSucesso) {
      const timer = setTimeout(() => setMostrarSucesso(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [mostrarSucesso]);

  const quandoDigitar = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });

    if (value.trim() !== "") {
      setErros(erros.filter(item => item !== name));
    }
  };

  const limparFormulario = () => {
    setDados({ tipo: "", finalidade: "", valor: "", bairro: "", cidade: "", quartos: "", banheiros: "", vagas: "", descricao: "" });
    setErros([]);
  };

  const clicarFinalizar = (e: React.FormEvent) => {
    e.preventDefault();
    
    const listaErros: string[] = [];

    if (dados.tipo.trim() === "") listaErros.push("tipo");
    if (dados.finalidade.trim() === "") listaErros.push("finalidade");
    if (dados.valor.trim() === "") listaErros.push("valor");
    if (dados.bairro.trim() === "") listaErros.push("bairro");
    if (dados.cidade.trim() === "") listaErros.push("cidade");

    if (listaErros.length > 0) {
      setErros(listaErros);
      return;
    }

    setErros([]);
    setMostrarSucesso(true);
  };

  return (
    <div className="area-total-centralizada">
      <div className="cartao-formulario">
        <h2>Cadastrar Imóvel</h2>
        <p className="subtitulo">Informações principais do imóvel</p>
        <hr className="linha-divisora" />

        <form onSubmit={clicarFinalizar}>
          <p className="sessao-titulo">Dados do Imóvel</p>
          
          <label className={erros.includes("tipo") ? "texto-erro" : ""}>Tipo de Imóvel *</label>
          <div className="opcoes-alinhadas">
            <label><input type="radio" name="tipo" value="Casa" checked={dados.tipo === "Casa"} onChange={quandoDigitar} /> Casa</label>
            <label><input type="radio" name="tipo" value="Apartamento" checked={dados.tipo === "Apartamento"} onChange={quandoDigitar} /> Apartamento</label>
            <label><input type="radio" name="tipo" value="Terreno" checked={dados.tipo === "Terreno"} onChange={quandoDigitar} /> Terreno</label>
          </div>

          <label className={erros.includes("finalidade") ? "texto-erro" : ""}>Finalidade *</label>
          <div className="opcoes-alinhadas">
            <label><input type="radio" name="finalidade" value="Venda" checked={dados.finalidade === "Venda"} onChange={quandoDigitar} /> Venda</label>
            <label><input type="radio" name="finalidade" value="Aluguel" checked={dados.finalidade === "Aluguel"} onChange={quandoDigitar} /> Aluguel</label>
          </div>

          <div className="caixa-entrada-vertical">
            <label className={erros.includes("valor") ? "texto-erro" : ""}>Valor *</label>
            <input 
              type="text" 
              name="valor" 
              placeholder="R$" 
              value={dados.valor} 
              onChange={quandoDigitar} 
              className={`tamanho-medio ${erros.includes("valor") ? "borda-erro" : ""}`} 
            />
          </div>

          <p className="sessao-titulo">Localização</p>
          <div className="linha-dupla-campos">
            <div className="caixa-entrada-vertical">
              <label className={erros.includes("bairro") ? "texto-erro" : ""}>Bairro *</label>
              <input 
                type="text" 
                name="bairro" 
                value={dados.bairro} 
                onChange={quandoDigitar} 
                className={erros.includes("bairro") ? "borda-erro" : ""} 
              />
            </div>
            <div className="caixa-entrada-vertical">
              <label className={erros.includes("cidade") ? "texto-erro" : ""}>Cidade *</label>
              <input 
                type="text" 
                name="cidade" 
                value={dados.cidade} 
                onChange={quandoDigitar} 
                className={erros.includes("cidade") ? "borda-erro" : ""} 
              />
            </div>
          </div>

          <p className="sessao-titulo">Características</p>
          <div className="linha-tripla-campos">
            <div className="caixa-entrada-vertical">
              <label>Quartos</label>
              <input type="number" name="quartos" value={dados.quartos} onChange={quandoDigitar} className="tamanho-mini" />
            </div>
            <div className="caixa-entrada-vertical">
              <label>Banheiros</label>
              <input type="number" name="banheiros" value={dados.banheiros} onChange={quandoDigitar} className="tamanho-mini" />
            </div>
            <div className="caixa-entrada-vertical">
              <label>Vagas garagem</label>
              <input type="number" name="vagas" value={dados.vagas} onChange={quandoDigitar} className="tamanho-mini" />
            </div>
          </div>

          <div className="caixa-entrada-vertical">
            <label>Descrição</label>
            <textarea 
              name="descricao" 
              placeholder="Descreva detalhes do imóvel" 
              value={dados.descricao} 
              onChange={quandoDigitar} 
            />
          </div>

          <div className="botoes-final">
            <button type="button" className="botao-cinza-limpar" onClick={limparFormulario}>Limpar</button>
            <button type="submit" className="botao-verde-confirmar">Finalizar</button>
          </div>
        </form>

        {mostrarSucesso && (
          <div className="notificacao-sucesso">
            <button className="x-fechar" onClick={() => setMostrarSucesso(false)}>×</button>
            <div className="icone-check">✔</div>
            <p>Imóvel cadastrado com sucesso!</p>
          </div>
        )}
      </div>
    </div>
  );
}