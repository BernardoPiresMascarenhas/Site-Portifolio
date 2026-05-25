export default function Experience() {
  const experiences = [
    {
      title: "Desenvolvedor Full Stack",
      company: "Freelancer Autônomo",
      period: "2024 — Presente",
      description: "Desenvolvimento de soluções digitais para negócios locais: levantamento de requisitos, prototipagem UI/UX, desenvolvimento e deploy. Principais entregas: Império dos Pets, A Criação Gráfica, Clínica de Fonoaudiologia e Itatiaia 304.",
      type: "Trabalho",
      color: "#20F088",
    },
    {
      title: "Ciência da Computação",
      company: "PUC Minas",
      period: "Fev 2024 — Jul 2028",
      description: "Base sólida em Algoritmos e Estruturas de Dados, POO, Engenharia de Software e modelagem de Bancos de Dados. Controle de versão com Git e metodologias ágeis.",
      type: "Formação",
      color: "#60a5fa",
    },
    {
      title: "Inglês Técnico",
      company: "Wizard by Pearson",
      period: "Jan 2024 — Dez 2027",
      description: "Estudo contínuo focado em conversação, leitura técnica e escrita. Preparação para atuação em times globais de tecnologia.",
      type: "Idioma",
      color: "#a78bfa",
    },
  ];

  return (
    <section id="experiencia" style={{ padding: '7rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="section-label" style={{ marginBottom: '1.25rem' }}>Trajetória</div>
          <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff' }}>
            Experiência &<br />
            <span className="text-gradient">Formação</span>
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: '800px' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '5px',
            top: '12px',
            bottom: '12px',
            width: '1px',
            background: 'linear-gradient(to bottom, rgba(32,240,136,0.5), rgba(32,240,136,0.05))',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {experiences.map((exp, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '2rem',
                  position: 'relative',
                }}
              >
                {/* Dot */}
                <div style={{
                  width: '11px',
                  height: '11px',
                  borderRadius: '50%',
                  background: exp.color,
                  boxShadow: `0 0 15px ${exp.color}60`,
                  flexShrink: 0,
                  marginTop: '1.5rem',
                  zIndex: 1,
                }} />

                {/* Card */}
                <div
                  className="glass-card"
                  style={{
                    borderRadius: '1rem',
                    padding: '2rem 2.25rem',
                    flex: 1,
                    borderLeft: `3px solid ${exp.color}40`,
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.borderLeftColor = `${exp.color}`;
                    el.style.background = `${exp.color}06`;
                    el.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.borderLeftColor = `${exp.color}40`;
                    el.style.background = 'rgba(255,255,255,0.03)';
                    el.style.transform = 'translateX(0)';
                  }}
                >
                  {/* Top row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                    <h3 style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: '#fff',
                      letterSpacing: '-0.01em',
                    }}>
                      {exp.title}
                    </h3>
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '0.65rem',
                      color: exp.color,
                      background: `${exp.color}12`,
                      border: `1px solid ${exp.color}30`,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '0.25rem',
                      whiteSpace: 'nowrap',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}>
                      {exp.type}
                    </span>
                  </div>

                  {/* Company & period */}
                  <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                  }}>
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '0.72rem',
                      color: exp.color,
                      letterSpacing: '0.03em',
                    }}>{exp.company}</span>
                    <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.7rem' }}>·</span>
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '0.7rem',
                      color: 'rgba(255,255,255,0.3)',
                    }}>{exp.period}</span>
                  </div>

                  <p style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.45)',
                    lineHeight: 1.8,
                    fontWeight: 300,
                  }}>
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
