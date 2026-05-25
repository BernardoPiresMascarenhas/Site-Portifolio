export default function About() {
  return (
    <section id="sobre" style={{ padding: '7rem 0', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="about-grid">
          
          {/* Left: text */}
          <div>
            <div className="section-label" style={{ marginBottom: '1.25rem' }}>Sobre mim</div>
            <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '2rem' }}>
              Código limpo,<br />
              <span className="text-gradient">soluções reais.</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, fontSize: '0.95rem', fontWeight: 300 }}>
                Sou estudante de Ciência da Computação na PUC Minas e desenvolvedor Full Stack com foco em criar 
                interfaces modernas e sistemas eficientes. Meu objetivo é transformar problemas complexos em 
                soluções digitais intuitivas e de alto desempenho.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, fontSize: '0.95rem', fontWeight: 300 }}>
                Tenho experiência prática com clientes reais — desde plataformas de e-commerce completas com painéis 
                administrativos até landing pages otimizadas para conversão. Escrevo código limpo, escalável e sempre 
                focado na experiência do usuário final.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              {[
                { label: 'React / Next.js', icon: '⚛' },
                { label: 'TypeScript', icon: '📘' },
                { label: 'Node.js', icon: '🟢' },
                { label: 'Tailwind CSS', icon: '💨' },
              ].map((item) => (
                <span
                  key={item.label}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.72rem',
                    padding: '0.4rem 0.9rem',
                    borderRadius: '0.35rem',
                    background: 'rgba(32,240,136,0.07)',
                    color: '#20F088',
                    border: '1px solid rgba(32,240,136,0.2)',
                    letterSpacing: '0.03em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <span>{item.icon}</span> {item.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: card with details */}
          <div
            className="glass-card"
            style={{
              borderRadius: '1.25rem',
              padding: '2.5rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glow accent */}
            <div style={{
              position: 'absolute',
              top: '-30%',
              right: '-20%',
              width: '250px',
              height: '250px',
              background: 'radial-gradient(circle, rgba(32,240,136,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', zIndex: 1 }}>
              {[
                {
                  icon: '🎓',
                  title: 'Ciência da Computação',
                  sub: 'PUC Minas · 2024–2028',
                  desc: 'Algoritmos, POO, Eng. de Software e Banco de Dados',
                },
                {
                  icon: '💼',
                  title: 'Desenvolvedor Freelancer',
                  sub: 'Projetos Autônomos · 2024–Presente',
                  desc: 'React, TypeScript, Tailwind, Node.js, Prisma',
                },
                {
                  icon: '🌎',
                  title: 'Inglês',
                  sub: 'Wizard by Pearson · 2024–2027',
                  desc: 'Foco em conversação técnica e leitura',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '1.25rem',
                    paddingBottom: i < 2 ? '2rem' : '0',
                    borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}
                >
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '0.6rem',
                    background: 'rgba(32,240,136,0.08)',
                    border: '1px solid rgba(32,240,136,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#fff', marginBottom: '0.2rem' }}>
                      {item.title}
                    </div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', color: '#20F088', marginBottom: '0.4rem', letterSpacing: '0.03em' }}>
                      {item.sub}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
