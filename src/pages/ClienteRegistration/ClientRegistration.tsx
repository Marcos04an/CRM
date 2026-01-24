import { useState, type ChangeEvent, type FormEvent } from "react";
import { FiCheckCircle } from "react-icons/fi";
import "./ClientRegistration.css";

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

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState<"success" | "warning">("success");

  const showToast = (msg: string, type: "success" | "warning" = "success") => {
    setToastType(type);
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.interest
    ) {
      showToast("Preencha os campos obrigatórios.", "warning");
      setLoading(false);
      return;
    }

    try {
      await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      localStorage.setItem("ultimoLead", JSON.stringify(formData));

      showToast(
        "Cliente cadastrado! Agora clique em Adicionar Lead no Dashboard.",
        "success"
      );

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        interest: "",
        priceRange: "",
        origin: "",
      });
    } catch (error) {
      showToast("Erro ao cadastrar cliente.", "warning");
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
              onClick={() => window.history.back()}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      {toast && (
        <div
          className={toastType === "success" ? "toast-success" : "toast-warning"}
        >
          <div className="toast-row">
            {toastType === "success" && (
              <FiCheckCircle className="toast-icon" />
            )}
            <span>{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientRegistration;
