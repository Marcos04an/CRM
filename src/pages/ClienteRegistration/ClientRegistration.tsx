import { useState, type ChangeEvent, type FormEvent } from "react";
import { FiCheckCircle } from "react-icons/fi";
/* import { api } from "../../services/api";
 */import "./ClientRegistration.css";

interface ClientFormData {
  fullName: string;
  email: string;
  phone: string;
  interest: string;
  priceRange: string;
  origin: string;
}

const ClientRegistration = () => {

  const [formData, setFormData] = useState<ClientFormData>({
    fullName: "",
    email: "",
    phone: "",
    interest: "",
    priceRange: "",
    origin: "",
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {

    // Requisição para cadastrar o cliente
    await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  setShowSuccessPopup(true);

  setTimeout(() => {
    setShowSuccessPopup(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      interest: "",
      priceRange: "",
      origin: "",
    });
  }, 3000);
} catch (error) {
  console.error(error);
  alert("Erro ao cadastrar cliente");
} finally {
  setLoading(false);
}

  };

  return (
    <div className="registration-page">
      <div className="registration-card">
        <div className="card-header">
          <h2>Cadastro Do Cliente</h2>
        </div>

        <form onSubmit={handleSubmit} className="client-form-figma">
          <div className="form-line">
            <label>Nome:</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Maria E. Santos"
            />
          </div>

          <div className="form-line">
            <label>E-mail:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="mariaesantos@gmail.com"
            />
          </div>

          <div className="form-line">
            <label>Telefone:</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(81) 98765-4321"
            />
          </div>

          <div className="form-line">
            <label>Interesse:</label>
            <input
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              placeholder="Comprar"
            />
          </div>

          <div className="form-line">
            <label>Faixa De Preço:</label>
            <input
              name="priceRange"
              value={formData.priceRange}
              onChange={handleChange}
              placeholder="R$ 600.000 - R$ 800.000"
            />
          </div>

          <div className="form-line">
            <label>Origem:</label>
            <input
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              placeholder="Whatsapp"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </button>

            <button
              type="button"
              className="btn-cancel"
              onClick={() => console.log("Cancelar")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      {showSuccessPopup && (
        <div className="success-popup">
          <div className="popup-content">
            <FiCheckCircle className="success-icon" />
            <div>
              <h4>Perfil cadastrado com sucesso!</h4>
              <p>O seu perfil foi cadastrado corretamente.</p>
            </div>
            <button
              className="close-popup"
              onClick={() => setShowSuccessPopup(false)}
            >
              ×
            </button>
          </div>

          <button className="btn-view-profile">Ver Perfil</button>
        </div>
      )}
    </div>
  );
};

export default ClientRegistration;
