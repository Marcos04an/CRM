import { useState, type ChangeEvent, type FormEvent } from 'react';
// Importando um ícone de "check" para o popup (pode precisar instalar: npm i react-icons)
import { FiCheckCircle } from 'react-icons/fi'; 
import './ClientRegistration.css';

// Interface atualizada com os campos do Figma
interface ClientFormData {
  fullName: string;
  email: string;
  phone: string;
  interest: string; // Novo campo
  priceRange: string; // Novo campo
  origin: string; // Novo campo
}

const ClientRegistration = () => {
  const [formData, setFormData] = useState<ClientFormData>({
    fullName: '',
    email: '',
    phone: '',
    interest: '',
    priceRange: '',
    origin: ''
  });

  // Estado para controlar a exibição do popup de sucesso
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Dados para envio:', formData);
    
    // Mostra o popup de sucesso
    setShowSuccessPopup(true);

    // Esconde o popup e limpa o formulário após 3 segundos
    setTimeout(() => {
      setShowSuccessPopup(false);
      setFormData({
        fullName: '', email: '', phone: '', interest: '', priceRange: '', origin: ''
      });
    }, 3000);
  };

  return (
    <div className="registration-page">
      {/* O cartão branco centralizado */}
      <div className="registration-card">
        <div className="card-header">
          <h2>Cadastro Do Cliente</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="client-form-figma">
          
          <div className="form-line">
            <label htmlFor="fullName">Nome:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Maria E. Santos"
            />
          </div>

          <div className="form-line">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="mariaesantos@gmail.com"
            />
          </div>

          <div className="form-line">
            <label htmlFor="phone">Telefone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(81) 98765-4321"
            />
          </div>

          <div className="form-line">
            <label htmlFor="interest">Interesse:</label>
            <input
              type="text"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              placeholder="Comprar"
            />
          </div>

          <div className="form-line">
            <label htmlFor="priceRange">Faixa De Preço:</label>
            <input
              type="text"
              name="priceRange"
              value={formData.priceRange}
              onChange={handleChange}
              placeholder="R$ 600.000 - R$ 800.000"
            />
          </div>

          <div className="form-line">
            <label htmlFor="origin">Origem:</label>
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              placeholder="Whatsapp"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-save">
              Salvar
            </button>
            <button type="button" className="btn-cancel" onClick={() => console.log('Cancelar')}>
              Cancelar
            </button>
          </div>
        </form>
      </div>

      {/* Popup de Sucesso */}
      {showSuccessPopup && (
        <div className="success-popup">
          <div className="popup-content">
            <FiCheckCircle className="success-icon" />
            <div>
              <h4>Perfil cadastrado com sucesso!</h4>
              <p>O seu perfil foi cadastrado corretamente.</p>
            </div>
            <button className="close-popup" onClick={() => setShowSuccessPopup(false)}>×</button>
          </div>
          <button className="btn-view-profile">Ver Perfil</button>
        </div>
      )}
    </div>
  );
};

export default ClientRegistration;
