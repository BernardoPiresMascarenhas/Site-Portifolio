import { ArrowUp } from 'lucide-react';
import { contact, navLinks, whatsappLink } from '../../data/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <p className="footer__pitch">
            Sites sob medida para empresas e profissionais. <span>Belo Horizonte, MG.</span>
          </p>
          <nav className="footer__col" aria-label="Seções">
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`}>{l.label}</a>
            ))}
            <a href="#contato">Contato</a>
          </nav>
          <div className="footer__col">
            <a href={whatsappLink()} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.instagram.url} target="_blank" rel="noreferrer">Instagram</a>
            <a href={contact.linkedin.url} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={contact.github.url} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>

        <a href="#inicio" className="footer__wordmark" aria-label="Voltar ao início">
          B.Pires
        </a>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Bernardo Pires Mascarenhas</p>
          <a href="#inicio" className="footer__top-link">
            Voltar ao topo <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
