import React, { useState } from 'react';
import './LeadRegistration.css';

interface LeadRegistrationProps {
  onClose: () => void;
}

export default function LeadRegistration({ onClose }: LeadRegistrationProps) {
  const [formData, setFormData] = useState({
    nome: '',
    local: '',
    status: 'Novo Lead',
    mensagem: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados salvos:", formData);
    onClose(); 
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Novo Lead</h2>
        
        <form onSubmit={handleSave} className="modal-form">
          
          
          <div className="form-group">
            <label>Nome do Cliente</label>
            <input type="text" name="nome" placeholder="Ex: Ana Souza" value={formData.nome} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label>Empreendimento/Local</label>
            <input type="text" name="local" placeholder="Ex: Ocean View" value={formData.local} onChange={handleChange} />
          </div>

           <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Novo Lead">Novo Lead</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Fechado">Fechado</option>
            </select>
          </div>

          <div className="form-group">
            <label>Mensagem Inicial</label>
            <textarea name="mensagem" placeholder="Mensagem..." rows={4} value={formData.mensagem} onChange={handleChange} />
          </div>

          <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-save">Salvar Lead</button>
          </div>
        </form>
      </div>
    </div>
  );
}

