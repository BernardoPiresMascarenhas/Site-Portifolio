import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useGithubRepos } from '../../hooks/useGithubRepos';

const highlightedProjects = [
  {
    title: "Império dos Pets",
    subtitle: "Clínica & Pet Shop",
    desc: "Solução digital completa focada em conversão. Plataforma com mapa integrado, catálogo interativo com filtros, carrinho de compras e selos de novidade — integrado ao WhatsApp.",
    techs: ["React", "TypeScript", "Tailwind CSS", "WhatsApp API"],
    link: "https://www.clinicaimperiodospets.com.br/",
    imgSrc: "/imperio-dos-pets.png", 
    accent: "#20F088",
    placeholderColor: "from-emerald-900/40 to-teal-900/40",
    icon: "🐾",
  },
  {
    title: "Plante Comigo",
    subtitle: "Estúdio de Paisagismo & Design Verde",
    desc: "Plataforma institucional de alto padrão com design editorial. Focada em UX/UI, conta com animações fluidas, efeitos de parallax e otimização SEO para conversão no mercado de luxo.",
    techs: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    link: "https://www.plantecomigo.com",
    imgSrc: "/plante-comigo.png", 
    accent: "#6b7c67", 
    placeholderColor: "from-green-900/40 to-emerald-900/40",
    icon: "🌿",
  },
  {
    title: "Clínica de Fonoaudiologia",
    subtitle: "Experiência Imersiva 360°",
    desc: "SPA com animações Framer Motion, visualização imersiva 360° do consultório, mapa interativo e agendamento direto via WhatsApp. Experiência premium para o paciente.",
    techs: ["React", "TypeScript", "Framer Motion", "WhatsApp API", "360° View"],
    link: "https://site-fono-rosy.vercel.app/",
    imgSrc: "/clinica-fono.png", 
    accent: "#38bdf8",
    placeholderColor: "from-sky-900/40 to-cyan-900/40",
    icon: "🗣",
  },
  {
    title: "Itatiaia 304",
    subtitle: "Bar & Gastronomia",
    desc: "SPA para bar e restaurante de bairro com cardápio dinâmico de pratos do dia e porções, foco na identidade local e contato facilitado para os clientes.",
    techs: ["React", "Tailwind CSS", "Vite", "UI/UX"],
    link: "https://itatiaia304.com.br/",
    imgSrc: "/itatiaia.png", 
    accent: "#f59e0b",
    placeholderColor: "from-amber-900/40 to-orange-900/40",
    icon: "🍺",
  }
];

// REMOVIDO o gradient daqui
interface ProjectMediaProps {
  imgSrc?: string;
  title: string;
  icon: string;
  accent: string;
}

// REMOVIDO o gradient dos parâmetros
function ProjectMedia({ imgSrc, title, icon, accent }: ProjectMediaProps) {
  const containerStyle: React.CSSProperties = {
    height: '220px', 
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  };

  if (imgSrc) {
    return (
      <div style={containerStyle}>
        <img 
          src={imgSrc} 
          alt={`Screenshot do projeto ${title}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', 
            objectPosition: 'center top', 
          }}
        />
      </div>
    );
  }

  return (
    <div style={{
      ...containerStyle,
      background: 'linear-gradient(135deg, #0d1a12 0%, #0a1510 100%)',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(${accent}10 1px, transparent 1px), linear-gradient(90deg, ${accent}10 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse at center, ${accent}12 0%, transparent 70%)`,
      }} />
      <div style={{
        fontSize: '3.5rem',
        position: 'relative',
        zIndex: 1,
        filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))',
        lineHeight: 1,
      }}>
        {icon}
      </div>
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        fontFamily: "'DM Mono', monospace",
        fontSize: '0.6rem',
        color: accent,
        background: `${accent}15`,
        border: `1px solid ${accent}30`,
        borderRadius: '0.25rem',
        padding: '0.2rem 0.5rem',
        letterSpacing: '0.1em',
        zIndex: 1,
      }}>
        PREVIEW
      </div>
    </div>
  );
}

export default function Projects() {
  const repos = useGithubRepos('BernardoPiresMascarenhas');

  return (
    <section id="projetos" style={{ padding: '7rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        
        <div style={{ marginBottom: '4rem' }}>
          <div className="section-label" style={{ marginBottom: '1.25rem' }}>Portfólio</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff' }}>
              Projetos em<br />
              <span className="text-gradient">Destaque</span>
            </h2>
            <a
              href="https://github.com/BernardoPiresMascarenhas"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
              style={{ fontSize: '0.8rem', padding: '0.6rem 1.25rem' }}
            >
              <FaGithub size={16} /> Ver todos no GitHub
            </a>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
          gap: '1.5rem',
          marginBottom: '5rem',
        }} className="projects-grid">
          {highlightedProjects.map((project, i) => (
            <div
              key={i}
              className="glass-card glass-card-hover"
              style={{
                borderRadius: '1rem',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%', 
              }}
            >
              {/* REMOVIDO o envio da prop gradient aqui */}
              <ProjectMedia
                imgSrc={project.imgSrc}
                title={project.title}
                icon={project.icon}
                accent={project.accent}
              />

              <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.65rem',
                    color: project.accent,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '0.35rem',
                  }}>
                    {project.subtitle}
                  </div>
                  <h3 style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    color: '#fff',
                    letterSpacing: '-0.01em',
                  }}>
                    {project.title}
                  </h3>
                </div>

                <p style={{
                  color: 'rgba(255,255,255,0.6)', 
                  fontSize: '0.85rem',
                  lineHeight: 1.75,
                  marginBottom: '1.5rem',
                  flex: 1, 
                  fontWeight: 300,
                }}>
                  {project.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', marginTop: 'auto' }}>
                  {project.techs.map((tech) => (
                    <span key={tech} className="tech-badge">{tech}</span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    color: project.accent,
                    textDecoration: 'none',
                    transition: 'gap 0.2s ease',
                    width: 'fit-content',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.gap = '0.75rem')}
                  onMouseLeave={e => (e.currentTarget.style.gap = '0.5rem')}
                >
                  Acessar projeto <ExternalLink size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div className="section-label">Atividade recente</div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '0.75rem',
          }}>
            {repos.length > 0 ? (
              repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card"
                  style={{
                    padding: '1.25rem',
                    borderRadius: '0.75rem',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(32,240,136,0.3)';
                    el.style.transform = 'translateY(-3px)';
                    el.style.background = 'rgba(32,240,136,0.04)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(255,255,255,0.07)';
                    el.style.transform = 'translateY(0)';
                    el.style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    color: '#fff',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {repo.name}
                  </div>
                  {repo.language && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: repo.language === 'TypeScript' ? '#3178c6'
                          : repo.language === 'JavaScript' ? '#f7df1e'
                          : repo.language === 'Python' ? '#3572a5'
                          : repo.language === 'Java' ? '#b07219'
                          : '#20F088',
                      }} />
                      <span style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '0.65rem',
                        color: 'rgba(255,255,255,0.35)',
                        letterSpacing: '0.05em',
                      }}>
                        {repo.language}
                      </span>
                    </div>
                  )}
                </a>
              ))
            ) : (
              Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="glass-card"
                  style={{
                    padding: '1.25rem',
                    borderRadius: '0.75rem',
                    height: '80px',
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
}