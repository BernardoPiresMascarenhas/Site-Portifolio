import React, { useRef, useState } from 'react';
import { AlertCircle, ArrowRight, ArrowUpRight, Check, Loader2, Mail } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { contact, whatsappLink } from '../../data/site';
import SplitWords from '../ui/SplitWords';
import { plain, toWords } from '../../utils/words';

const TITLE = 'Seu negócio merece um site *à altura* do que você oferece.';
const PROJECT_TYPES = ['Site institucional', 'Landing page', 'Reformulação', 'Manutenção', 'Outro'];

type Status = 'idle' | 'loading' | 'success' | 'error';

// (31) 99999-9999 — aceita fixo (10 dígitos) e celular (11)
const formatPhone = (value: string) => {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length === 0) return '';
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || status === 'loading') return;

    setStatus('loading');
    setErrorMessage('');

    const data = Object.fromEntries(new FormData(formRef.current)) as Record<string, string>;
    // O tipo de projeto segue junto da mensagem — a API continua recebendo os mesmos campos
    const payload = {
      ...data,
      mensagem: projectType ? `[Tipo de projeto: ${projectType}]\n\n${data.mensagem}` : data.mensagem,
    };

    try {
      const resposta = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const corpo = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        setErrorMessage(corpo.erro ?? 'Erro ao enviar. Tente novamente.');
        setStatus('error');
        return;
      }

      formRef.current.reset();
      setPhone('');
      setProjectType('');
      setStatus('success');
    } catch (error) {
      console.error('Erro:', error);
      setErrorMessage('Sem conexão com o servidor. Tente novamente.');
      setStatus('error');
    }
  };

  const channels = [
    { icon: <Mail size={17} />, label: 'E-mail', value: contact.email, href: `mailto:${contact.email}` },
    { icon: <FaInstagram size={17} />, label: 'Instagram', value: `@${contact.instagram.handle}`, href: contact.instagram.url },
    { icon: <FaLinkedin size={17} />, label: 'LinkedIn', value: contact.linkedin.handle, href: contact.linkedin.url },
  ];

  return (
    <section id="contato" className="section contact">
      <div className="contact__light" aria-hidden="true" />
      <div className="container">
        <header className="contact__head" data-reveal>
          <p className="eyebrow">Contato</p>
          <h2 className="contact__title" aria-label={plain(TITLE)}>
            <SplitWords words={toWords(TITLE)} step={35} />
          </h2>
          <p className="contact__lead">Vamos conversar sobre sua ideia e encontrar a melhor solução para o seu projeto.</p>
        </header>

        <div className="contact__grid">
          <aside className="contact__side" data-reveal>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="whats-panel">
              <span className="whats-panel__icon" aria-hidden="true"><FaWhatsapp size={26} /></span>
              <span className="whats-panel__label">Prefere conversar?</span>
              <span className="whats-panel__title">Chame no WhatsApp</span>
              <span className="whats-panel__number">{contact.whatsappDisplay}</span>
              <span className="whats-panel__go">
                Abrir conversa <ArrowUpRight size={18} aria-hidden="true" />
              </span>
              <span className="sr-only">(abre o WhatsApp em nova aba)</span>
            </a>

            <ul className="channels">
              {channels.map((c) => (
                <li key={c.label}>
                  <a href={c.href} target={c.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer">
                    <span className="channels__icon" aria-hidden="true">{c.icon}</span>
                    <span className="channels__label">{c.label}</span>
                    <span className="channels__value">{c.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <div className="form-card" data-reveal style={{ '--d': '100ms' } as React.CSSProperties}>
            {status === 'success' ? (
              <div className="form-success" role="status">
                <span className="form-success__icon" aria-hidden="true"><Check size={28} strokeWidth={2.5} /></span>
                <h3>Mensagem enviada!</h3>
                <p>Obrigado pelo contato. Vou ler com atenção e retornar em breve pelo e-mail ou WhatsApp informado.</p>
                <button type="button" className="link-arrow" onClick={() => setStatus('idle')}>
                  Enviar outra mensagem <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="form" aria-describedby="form-hint">
                <div className="form__head">
                  <h3>Solicite um orçamento</h3>
                  <p id="form-hint">Responda o essencial. O resto a gente conversa.</p>
                </div>

                {/* Honeypot: só robôs preenchem */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="honeypot" />

                <fieldset className="field">
                  <legend className="field__label">Tipo de projeto <span>(opcional)</span></legend>
                  <div className="type-chips">
                    {PROJECT_TYPES.map((t) => (
                      <label key={t} className={projectType === t ? 'is-checked' : undefined}>
                        <input
                          type="radio"
                          name="tipo"
                          value={t}
                          checked={projectType === t}
                          onChange={() => setProjectType(t)}
                          onClick={() => projectType === t && setProjectType('')}
                        />
                        {t}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="field">
                  <label className="field__label" htmlFor="f-nome">Nome</label>
                  <input id="f-nome" type="text" name="nome" required maxLength={100} autoComplete="name" placeholder="Como posso te chamar?" className="input" />
                </div>

                <div className="form__row">
                  <div className="field">
                    <label className="field__label" htmlFor="f-email">E-mail</label>
                    <input id="f-email" type="email" name="email" required maxLength={150} autoComplete="email" placeholder="voce@empresa.com.br" className="input" />
                  </div>
                  <div className="field">
                    <label className="field__label" htmlFor="f-tel">WhatsApp</label>
                    <input
                      id="f-tel"
                      type="tel"
                      name="telefone"
                      required
                      inputMode="numeric"
                      autoComplete="tel-national"
                      pattern="\(\d{2}\) \d{4,5}-\d{4}"
                      title="Informe DDD + número, ex: (31) 99999-9999"
                      placeholder="(31) 99999-9999"
                      className="input"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="f-msg">Sobre o projeto</label>
                  <textarea
                    id="f-msg"
                    rows={4}
                    name="mensagem"
                    required
                    maxLength={2900}
                    placeholder="Conte um pouco sobre o seu negócio e o que você precisa."
                    className="input"
                  />
                </div>

                {status === 'error' && (
                  <div className="form-error" role="alert">
                    <AlertCircle size={18} aria-hidden="true" />
                    <span>
                      {errorMessage}{' '}
                      Se preferir, <a href={whatsappLink()} target="_blank" rel="noreferrer">fale pelo WhatsApp</a>.
                    </span>
                  </div>
                )}

                <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={status === 'loading'} aria-busy={status === 'loading'}>
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={18} className="spin" aria-hidden="true" /> Enviando...
                    </>
                  ) : (
                    <>
                      Enviar pedido de orçamento <ArrowRight size={18} aria-hidden="true" className="btn__icon" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
