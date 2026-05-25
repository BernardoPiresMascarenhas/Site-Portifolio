export default function Skills() {
  const hardSkills = [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Tailwind CSS", level: 92 },
    { name: "Node.js", level: 75 },
    { name: "Next.js", level: 80 },
    { name: "JavaScript", level: 90 },
    { name: "Prisma ORM", level: 70 },
    { name: "SQL", level: 72 },
    { name: "Java", level: 65 },
    { name: "Git / GitHub", level: 88 },
    { name: "Framer Motion", level: 75 },
    { name: "UI/UX Design", level: 78 },
  ];

  const softSkills = [
    "Resolução de Problemas",
    "Comunicação Clara",
    "Trabalho em Equipe",
    "Raciocínio Lógico",
    "Adaptabilidade",
    "Autogestão",
    "Foco em Resultados",
    "Aprendizado Contínuo",
  ];

  return (
    <section id="habilidades" style={{ padding: '7rem 0', position: 'relative' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '300px',
        background: 'radial-gradient(ellipse at center bottom, rgba(32,240,136,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label" style={{ marginBottom: '1.25rem', justifyContent: 'center' }}>
            Stack & Competências
          </div>
          <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff' }}>
            Minhas <span className="text-gradient">Habilidades</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem', alignItems: 'start' }} className="skills-grid">
          
          {/* Hard Skills with bars */}
          <div className="glass-card" style={{ borderRadius: '1.25rem', padding: '2.5rem' }}>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: '1rem',
              color: '#20F088',
              marginBottom: '2rem',
              letterSpacing: '0.02em',
            }}>
              ⚡ Hard Skills
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {hardSkills.map((skill) => (
                <div key={skill.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.65)',
                      letterSpacing: '0.03em',
                    }}>
                      {skill.name}
                    </span>
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '0.65rem',
                      color: '#20F088',
                    }}>
                      {skill.level}%
                    </span>
                  </div>
                  {/* Bar */}
                  <div style={{
                    height: '4px',
                    background: 'rgba(255,255,255,0.07)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${skill.level}%`,
                      background: `linear-gradient(90deg, #20F088, #80ffcc)`,
                      borderRadius: '2px',
                      boxShadow: '0 0 10px rgba(32,240,136,0.4)',
                      transition: 'width 1s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft skills + tools */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-card" style={{ borderRadius: '1.25rem', padding: '2.5rem' }}>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '1.5rem',
                letterSpacing: '0.02em',
              }}>
                🧠 Soft Skills
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {softSkills.map((skill) => (
                  <span key={skill} className="skill-pill">{skill}</span>
                ))}
              </div>
            </div>

            {/* Currently learning */}
            <div className="glass-card" style={{ borderRadius: '1.25rem', padding: '2rem' }}>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '1.25rem',
              }}>
                📚 Aprendendo agora
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { name: 'PostgreSQL', prog: 55 },
                  { name: 'Docker', prog: 40 },
                  { name: 'AWS / Cloud', prog: 30 },
                ].map((item) => (
                  <div key={item.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)' }}>{item.name}</span>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>{item.prog}%</span>
                    </div>
                    <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${item.prog}%`,
                        background: 'linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.15))',
                        borderRadius: '2px',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
