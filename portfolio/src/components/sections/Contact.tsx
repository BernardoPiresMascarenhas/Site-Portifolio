import React, { useState, useRef } from 'react';
import { Mail, Loader2, ArrowRight } from 'lucide-react';
import { FaInstagram , FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setIsLoading(true);

    if (!formRef.current) return;

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSuccessMessage('Mensagem enviada! Responderei em breve.');
      formRef.current.reset();
    } catch (error) {
      console.error('Erro:', error);
      setErrorMessage('Erro ao enviar. Tente novamente.');
    } finally {
      setIsLoading(false);
      setTimeout(() => { setSuccessMessage(''); setErrorMessage(''); }, 5000);
    }
  };

  const contacts = [
    {
      icon: <FaWhatsapp size={18} />,
      label: 'Whatsapp',
      value: '31 994947303',
      href: 'https://wa.me/5531994947303',
    },
    {
      icon: <FaInstagram  size={18} />,
      label: 'Instagram',
      value: 'bernardopires.dev',
      href: 'https://www.instagram.com/bernardopires.dev/',
    },
    {
      icon: <Mail size={18} />,
      label: 'E-mail',
      value: 'bernardomasca3008@gmail.com',
      href: 'mailto:bernardomasca3008@gmail.com',
    },
    {
      icon: <FaLinkedin size={18} />,
      label: 'LinkedIn',
      value: 'bernardo-pires',
      href: 'https://www.linkedin.com/in/bernardo-pires-/',
    },
  ];

  return (
    <section id="contato" style={{ padding: '7rem 0 5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label" style={{ marginBottom: '1.25rem', justifyContent: 'center' }}>Contato</div>
          <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '1rem' }}>
            Vamos construir<br />
            <span className="text-gradient">algo incrível?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto', fontWeight: 300 }}>
            Estou aberto a novos projetos e oportunidades. Manda uma mensagem!
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '2.5rem',
          alignItems: 'start',
        }} className="contact-grid">
          
          {/* Left: contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {contacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noreferrer"
                className="glass-card"
                style={{
                  padding: '1.5rem 1.75rem',
                  borderRadius: '0.875rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'rgba(32,240,136,0.3)';
                  el.style.background = 'rgba(32,240,136,0.04)';
                  el.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'rgba(255,255,255,0.07)';
                  el.style.background = 'rgba(255,255,255,0.03)';
                  el.style.transform = 'translateX(0)';
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '0.6rem',
                  background: 'rgba(32,240,136,0.1)',
                  border: '1px solid rgba(32,240,136,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#20F088',
                  flexShrink: 0,
                }}>
                  {contact.icon}
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.65rem',
                    color: 'rgba(255,255,255,0.3)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '0.2rem',
                  }}>
                    {contact.label}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.82rem',
                    color: 'rgba(255,255,255,0.7)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {contact.value}
                  </div>
                </div>
                <ArrowRight size={16} style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
              </a>
            ))}

            {/* Availability badge */}
            <div className="glass-card" style={{
              padding: '1.25rem 1.75rem',
              borderRadius: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginTop: '0.5rem',
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#20F088',
                boxShadow: '0 0 10px rgba(32,240,136,0.8)',
                animation: 'pulse-green 2s ease-in-out infinite',
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.05em',
              }}>
                Disponível para novos projetos
              </span>
            </div>
          </div>

          {/* Right: form */}
          <div className="glass-card" style={{ borderRadius: '1.25rem', padding: '2.5rem' }}>
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.68rem',
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                  }}>
                    Nome
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    placeholder="Seu nome"
                    className="form-input"
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.68rem',
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                  }}>
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    placeholder="seu@email.com"
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.68rem',
                  color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}>
                  Mensagem
                </label>
                <textarea
                  rows={5}
                  name="message"
                  required
                  placeholder="Conte sobre o seu projeto..."
                  className="form-input"
                  style={{ resize: 'none' }}
                />
              </div>

              {errorMessage && (
                <div style={{
                  padding: '0.75rem 1rem',
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: '0.5rem',
                  color: '#f87171',
                  fontSize: '0.82rem',
                  fontFamily: "'DM Mono', monospace",
                }}>
                  {errorMessage}
                </div>
              )}
              {successMessage && (
                <div style={{
                  padding: '0.75rem 1rem',
                  background: 'rgba(32,240,136,0.1)',
                  border: '1px solid rgba(32,240,136,0.3)',
                  borderRadius: '0.5rem',
                  color: '#20F088',
                  fontSize: '0.82rem',
                  fontFamily: "'DM Mono', monospace",
                }}>
                  ✓ {successMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  opacity: isLoading ? 0.7 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  border: 'none',
                  fontSize: '0.9rem',
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar Mensagem <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}