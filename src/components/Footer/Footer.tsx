import anylai from "../../assets/anylai.jpg";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src={anylai} alt="AnyLAI" />
      </div>

      <div className="footer-center">
        <a href="#" aria-label="Instagram">Instagram</a>
        <a href="#" aria-label="LinkedIn">LinkedIn</a>
        <a href="#" aria-label="WhatsApp">WhatsApp</a>
      </div>

      <div className="footer-right">
        <p>&copy; 2025 AnyLAI. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
