import { useState, type ChangeEvent, type FormEvent } from 'react';
import './ClientRegistration.css';

// Interface para definir os tipos dos dados do formulário
interface ClientFormData {
  fullName: string;
  email: string;
  phone: string;
  document: string; // CPF ou CNPJ
  address: string;
  city: string;
  type: 'individual' | 'company';
}

const ClientRegistration = () => {
  // Estado inicial do formulário
  const [formData, setFormData] = useState<ClientFormData>({
    fullName: '',
    email: '',
    phone: '',
    document: '',
    address: '',
    city: '',
    type: 'individual'
  });

  // Função para lidar com mudanças nos inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // A correção do 'as HTMLInputElement' é necessária aqui
    const { name, value } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Função de envio do formulário
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Aqui você faria a chamada para sua API
    console.log('Dados do Cliente para envio:', formData);
    alert('Cliente cadastrado com sucesso! (Verifique o console)');
  };

  return (
    <div className="registration-container">
      <h2>Cadastro de Cliente</h2>
      
      <form onSubmit={handleSubmit} className="client-form">
        
        <div className="form-group">
          <label htmlFor="type">Tipo de Pessoa:</label>
          <select 
            name="type" 
            value={formData.type} 
            onChange={handleChange}
          >
            <option value="individual">Pessoa Física</option>
            <option value="company">Pessoa Jurídica</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="fullName">Nome Completo / Razão Social:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Digite o nome"
          />
        </div>

        <div className="form-group">
          <label htmlFor="document">CPF / CNPJ:</label>
          <input
            type="text"
            name="document"
            value={formData.document}
            onChange={handleChange}
            required
            placeholder="Apenas números"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="exemplo@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">Endereço:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Rua, número, bairro"
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">Cidade:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Salvar Cliente
        </button>
      </form>
    </div>
  );
};

export default ClientRegistration;