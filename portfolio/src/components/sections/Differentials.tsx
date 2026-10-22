import { Check, Gauge, LifeBuoy, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { projects } from '../../data/site';

export default function Differentials() {
  return (
    <section className="section diffs" aria-labelledby="diffs-title">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow" data-reveal>Por que trabalhar comigo</p>
          <h2 className="h2" id="diffs-title" data-reveal>
            Um processo próximo, <br className="br-desktop" />do briefing ao <em>site no ar</em>.
          </h2>
        </header>

        <div className="bento">
          <article className="tile tile--direct" data-reveal>
            <div className="direct-visual" aria-hidden="true">
              <span className="direct-visual__node">Você</span>
              <span className="direct-visual__line"><i /></span>
              <span className="direct-visual__node is-me">Bernardo</span>
            </div>
            <h3 className="tile__title">Atendimento direto com quem desenvolve</h3>
            <p className="tile__text">
              Sem intermediários: conversas, ajustes e decisões acontecem diretamente comigo, do primeiro contato à publicação.
            </p>
          </article>

          <article className="tile tile--mobile" data-reveal style={{ '--d': '80ms' } as React.CSSProperties}>
            <h3 className="tile__title">Pensado para o celular</h3>
            <p className="tile__text">Cada página é ajustada para celulares, tablets e computadores, não apenas reduzida.</p>
            <div className="phone" role="img" aria-label="Site Plante Comigo aberto no celular">
              <div className="phone__screen">
                <img src="/projetos/plante-comigo-mobile.webp" alt="" loading="lazy" decoding="async" width={520} height={1067} />
              </div>
            </div>
          </article>

          <article className="tile tile--design" data-reveal>
            <div className="swatches" aria-hidden="true">
              {projects.map((p, i) => (
                <span key={p.slug} style={{ background: p.accent, '--i': i } as React.CSSProperties} title={p.title} />
              ))}
            </div>
            <h3 className="tile__title">Design feito para o seu negócio</h3>
            <p className="tile__text">Cores, tipografia e layout partem da identidade da sua marca. Nada de modelo pronto.</p>
          </article>

          <article className="tile tile--integrations" data-reveal style={{ '--d': '80ms' } as React.CSSProperties}>
            <div className="chips" aria-hidden="true">
              <span><FaWhatsapp size={15} /> WhatsApp</span>
              <span><Mail size={15} /> Formulário</span>
            </div>
            <h3 className="tile__title">WhatsApp e formulários integrados</h3>
            <p className="tile__text">Botões de conversa e formulários que levam o contato do cliente direto até você.</p>
          </article>

          <article className="tile tile--perf" data-reveal>
            <Gauge className="tile__icon" size={22} strokeWidth={1.6} aria-hidden="true" />
            <h3 className="tile__title">Rápido e bem organizado</h3>
            <p className="tile__text">Imagens otimizadas, carregamento ágil e conteúdo fácil de encontrar, inclusive pelo Google.</p>
            <div className="loadbar" aria-hidden="true"><i /></div>
          </article>

          <article className="tile tile--support" data-reveal style={{ '--d': '80ms' } as React.CSSProperties}>
            <div className="support__copy">
              <LifeBuoy className="tile__icon" size={22} strokeWidth={1.6} aria-hidden="true" />
              <h3 className="tile__title">Suporte depois da entrega</h3>
              <p className="tile__text">Hospedagem, manutenção e alterações conforme o serviço contratado. O site não fica abandonado depois de publicado.</p>
            </div>
            <ul className="support__list" aria-label="O que pode estar incluído">
              <li><span className="support__status" aria-hidden="true" /> Site no ar</li>
              <li><Check size={16} aria-hidden="true" /> Hospedagem</li>
              <li><Check size={16} aria-hidden="true" /> Acompanhamento técnico</li>
              <li><Check size={16} aria-hidden="true" /> Alterações de conteúdo</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
