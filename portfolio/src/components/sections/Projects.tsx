import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useGithubRepos } from '../../hooks/useGithubRepos';

// Lista completa dos seus projetos principais
const highlightedProjects = [
  {
    title: "Império dos Pets | Clínica & Pet Shop",
    desc: "Solução digital completa focada em conversão. A plataforma apresenta os serviços clínicos com mapa integrado e conta com um catálogo interativo de produtos — incluindo filtros, carrinho de compras e selos de novidade —, tudo integrado a um sistema ágil de atendimento via WhatsApp.",
    techs: ["React", "TypeScript", "Tailwind CSS", "WhatsApp API"],
    link: "https://www.clinicaimperiodospets.com.br/",
  },
  {
    title: "A Criação Gráfica",
    desc: "Plataforma completa de e-commerce e gestão gráfica. Conta com vitrine dinâmica, carrinho com upload de artes, portal do cliente para rastreio de pedidos e um painel administrativo (BI) com métricas de faturamento em tempo real.",
    techs: ["Next.js", "Tailwind CSS", "Node.js", "Prisma ORM", "JWT", "Recharts"],
    link: "https://site-a-criacao-grafica.vercel.app/",
  },
  {
    title: "Clínica de Fonoaudiologia | Experiência Imersiva",
    desc: "Single-page application de alto nível para consultório fonoaudiológico. A plataforma proporciona uma jornada fluida para o paciente — com animações suaves e um mapa interativo —, culminando em um agendamento direto pelo WhatsApp. O destaque é a implementação de uma visualização imersiva 360º do consultório, permitindo que os pacientes conheçam o espaço acolhedor antes da visita.",
    techs: ["React", "TypeScript", "Framer Motion", "WhatsApp API", "360º View"],
    link: "https://site-fono-rosy.vercel.app/",
  },
  {
    title: "Itatiaia 304 | Bar e Gastronomia",
    desc: "Single-page application desenvolvida para um autêntico bar e restaurante de bairro. O projeto destaca a essência do local com foco em 'comida de verdade', apresentando o cardápio de pratos do dia, porções e facilitando o contato dos clientes.",
    techs: ["React", "Tailwind CSS", "Vite", "UI/UX"],
    link: "https://site-itatiaia-304-bar-restaurante-j.vercel.app/",
  }
];

export default function Projects() {
  // Chamada do hook para buscar seus repositórios reais no GitHub
  const repos = useGithubRepos('BernardoPiresMascarenhas');

  return (
    <section id="projetos" className="py-20 container mx-auto px-6">
      <h2 className="text-3xl font-bold mb-12 text-center">Projetos em Destaque</h2>
      
      {/* Grid de Projetos Principais */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {highlightedProjects.map((project, i) => (
          <div key={i} className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col h-full">
            <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{project.desc}</p>
            
            {/* Badges das Tecnologias */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techs.map(tech => (
                <span key={tech} className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium shadow-sm">
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Link do Projeto */}
            <a href={project.link} target="_blank" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline w-fit">
              Ver Projeto <ExternalLink size={16} />
            </a>
          </div>
        ))}
      </div>

      {/* Seção de Repositórios Recentes do GitHub */}
      <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2">
        <FaGithub size={28} /> Atualizações Recentes do GitHub
      </h3>
      
      <div className="grid md:grid-cols-4 gap-4">
        {repos.length > 0 ? (
          repos.map(repo => (
            <a 
              key={repo.id} 
              href={repo.html_url} 
              target="_blank" 
              rel="noreferrer" 
              className="glass-card p-4 rounded-xl hover:-translate-y-1 transition-transform border border-gray-200 dark:border-gray-800 flex flex-col justify-between h-full"
            >
              <h4 className="font-bold truncate" title={repo.name}>
                {repo.name}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
                {repo.language || 'Code'}
              </p>
            </a>
          ))
        ) : (
          <p className="text-center col-span-4 text-gray-500 dark:text-gray-400">
            Carregando repositórios...
          </p>
        )}
      </div>
    </section>
  );
}