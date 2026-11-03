/**
 * Conteúdo do site centralizado: contatos, projetos, serviços, processo e FAQ.
 * Para atualizar textos, valores ou links, edite apenas este arquivo.
 */

export const contact = {
  whatsappNumber: '5531975370628',
  whatsappDisplay: '(31) 97537-0628',
  email: 'bernardopiresdev@gmail.com',
  instagram: { handle: 'bernardopires.dev', url: 'https://www.instagram.com/bernardopires.dev/' },
  linkedin: { handle: 'bernardo-pires', url: 'https://www.linkedin.com/in/bernardo-pires-/' },
  github: { handle: 'BernardoPiresMascarenhas', url: 'https://github.com/BernardoPiresMascarenhas' },
};

export const whatsappMessages = {
  orcamento: 'Olá, Bernardo! Vim pelo seu site e gostaria de solicitar um orçamento para um site.',
  duvida: 'Olá, Bernardo! Vim pelo seu site e tenho uma dúvida sobre a criação de sites.',
};

export const whatsappLink = (message: string = whatsappMessages.orcamento) =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const navLinks = [
  { label: 'Projetos', id: 'projetos' },
  { label: 'Serviços', id: 'servicos' },
  { label: 'Como funciona', id: 'processo' },
  { label: 'Sobre', id: 'sobre' },
  { label: 'Dúvidas', id: 'faq' },
];

/**
 * Situação do projeto. É a única propriedade usada pelos filtros da seção de projetos:
 *  - completed   → trabalho real, finalizado e entregue a um cliente
 *  - concept     → projeto autoral/demonstrativo (nunca apresentar como trabalho contratado)
 *  - in-progress → site, plataforma ou sistema ainda em construção
 */
export type ProjectStatus = 'completed' | 'concept' | 'in-progress';

export type Project = {
  slug: string;
  title: string;
  segment: string;
  status: ProjectStatus;
  /** Endereço público. Sem URL, o card não exibe links de "Visitar site". */
  url?: string;
  /** Nome base das imagens em /public/projetos ({image}-800.webp e {image}-1600.webp) */
  image: string;
  /** Cor de destaque da marca do cliente, usada em brilhos e detalhes */
  accent: string;
  summary: string;
  highlights: string[];
  techs: string[];
  /** Destaque visual: card grande com prévia. Os demais aparecem na lista "Outros trabalhos". */
  featured: boolean;
};

/** Textos de cada categoria: rótulo do filtro, etiqueta do card e mensagem quando estiver vazia. */
export const projectStatuses: Record<ProjectStatus, { filter: string; tag: string; empty: { title: string; text: string } }> = {
  completed: {
    filter: 'Concluídos',
    tag: 'Projeto entregue',
    empty: { title: 'Nenhum projeto concluído por aqui.', text: 'Os sites entregues a clientes aparecem nesta categoria.' },
  },
  concept: {
    filter: 'Conceituais',
    tag: 'Projeto conceitual',
    empty: {
      title: 'Nenhum projeto conceitual publicado ainda.',
      text: 'Esta categoria reúne projetos autorais, criados para demonstrar ideias de design e desenvolvimento.',
    },
  },
  'in-progress': {
    filter: 'Em desenvolvimento',
    tag: 'Em desenvolvimento',
    empty: {
      title: 'Nenhum projeto em desenvolvimento listado no momento.',
      text: 'Aqui aparecem os sites, plataformas e sistemas que ainda estou construindo ou aperfeiçoando.',
    },
  },
};

/** Ordem da categoria "Todos": entregues primeiro, depois conceituais e em desenvolvimento. */
export const projectStatusOrder: ProjectStatus[] = ['completed', 'concept', 'in-progress'];

export const projects: Project[] = [
  {
    slug: 'casa-acp',
    title: 'Casa ACP',
    segment: 'Psicologia & formação',
    status: 'completed',
    url: 'https://casaacp.com.br/',
    image: 'casa-acp',
    accent: '#a3a77f',
    summary:
      'Espaço de psicologia e desenvolvimento humano, com conteúdo organizado para apresentar atendimentos, formações e a Abordagem Centrada na Pessoa.',
    highlights: ['Atendimentos e formações bem organizados', 'Contato direto pelo WhatsApp', 'Estrutura otimizada para o Google'],
    techs: ['Next.js', 'React', 'Node.js', 'SEO'],
    featured: true,
  },
  {
    slug: 'progus-contabilidade',
    title: 'Progus Contabilidade',
    segment: 'Escritório de contabilidade',
    status: 'completed',
    url: 'https://www.proguscontabilidade.com.br/',
    image: 'progus-contabilidade',
    accent: '#3b82f6',
    summary:
      'Site institucional para um escritório com mais de 35 anos de mercado: identidade sóbria, que transmite confiança, e um caminho claro para novos clientes entrarem em contato.',
    highlights: ['Apresentação clara dos serviços', 'Formulário com envio direto por e-mail', 'Animações discretas e profissionais'],
    techs: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    featured: false,
  },
  {
    slug: 'plante-comigo',
    title: 'Plante Comigo',
    segment: 'Estúdio de paisagismo',
    status: 'completed',
    url: 'https://www.plantecomigo.com',
    image: 'plante-comigo',
    accent: '#8fa889',
    summary:
      'Um site institucional sofisticado, feito para valorizar os projetos do estúdio e transmitir o cuidado que a marca tem com cada ambiente.',
    highlights: ['Visual de inspiração editorial', 'Animações suaves e efeito de profundidade', 'Estrutura preparada para o Google'],
    techs: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    featured: true,
  },
  {
    slug: 'clinica-fono',
    title: 'Clínica de Fonoaudiologia',
    segment: 'Saúde & fonoaudiologia',
    status: 'completed',
    url: 'https://www.fonoanamascarenhas.com.br/',
    image: 'clinica-fono',
    accent: '#e879a6',
    summary:
      'Um site acolhedor que apresenta a clínica, permite conhecer o consultório antes da primeira visita e simplifica o agendamento.',
    highlights: ['Tour virtual 360° do consultório', 'Agendamento pelo WhatsApp', 'Mapa interativo com a localização'],
    techs: ['React', 'TypeScript', 'Framer Motion', 'Integração WhatsApp'],
    featured: true,
  },
  {
    slug: 'imperio-dos-pets',
    title: 'Império dos Pets',
    segment: 'Clínica veterinária & pet shop',
    status: 'completed',
    url: 'https://www.clinicaimperiodospets.com.br/',
    image: 'imperio-dos-pets',
    accent: '#8b5cf6',
    summary:
      'Uma experiência digital personalizada para apresentar os serviços da clínica, facilitar o contato dos tutores e reunir informações importantes em um só lugar.',
    highlights: ['Catálogo de produtos com filtros', 'Pedidos e contato direto pelo WhatsApp', 'Mapa com a localização da clínica'],
    techs: ['React', 'TypeScript', 'Tailwind CSS', 'Integração WhatsApp'],
    featured: true,
  },
  {
    slug: 'itatiaia-304',
    title: 'Itatiaia 304',
    segment: 'Bar & gastronomia',
    status: 'completed',
    url: 'https://itatiaia304.com.br/',
    image: 'itatiaia',
    accent: '#f59e0b',
    summary:
      'Site para um bar de bairro, com cardápio de pratos do dia e porções, valorizando a identidade local e facilitando o contato dos clientes.',
    highlights: ['Cardápio de pratos do dia', 'Identidade local valorizada'],
    techs: ['React', 'Vite', 'Tailwind CSS'],
    featured: false,
  },

  /* Conceituais: projetos autorais de portfólio, nunca apresentados como trabalho contratado */
  {
    slug: 'isadora-vale',
    title: 'Isadora Vale | Nutrição',
    segment: 'Nutrição & saúde',
    status: 'concept',
    url: 'https://site-nutricionista-blue.vercel.app/',
    image: 'isadora-vale',
    accent: '#8a9a6b',
    summary:
      'Site demonstrativo de nutricionista, com design editorial premium, animações sofisticadas e experiência responsiva. Marca fictícia, criada para mostrar como uma presença digital moderna pode valorizar profissionais da saúde.',
    highlights: [
      'Animações vinculadas à rolagem, com galeria horizontal',
      'Tipografia editorial e fotografia em destaque',
      'Respeita a preferência por movimento reduzido',
    ],
    techs: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Motion'],
    featured: true,
  },

  /* Em desenvolvimento */
  {
    slug: 'rbs-uniformes',
    title: 'RBS Uniformes',
    segment: 'Confecção de uniformes',
    status: 'in-progress',
    url: 'https://site-rbs-uniformes.vercel.app/',
    image: 'rbs-uniformes',
    accent: '#c9a227',
    summary:
      'Site institucional para uma confecção de uniformes corporativos, industriais, hospitalares e escolares, com identidade premium construída a partir das cores da marca.',
    highlights: [],
    techs: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    featured: false,
  },
  {
    slug: 'dentarium',
    title: 'Dentarium',
    segment: 'Odontologia · redesign',
    status: 'in-progress',
    url: 'https://site-dentarium.vercel.app/',
    image: 'dentarium',
    accent: '#9a6847',
    summary:
      'Estudo de redesign, não oficial, para uma clínica de odontologia funcional e estética em Belo Horizonte, com catálogo de tratamentos com filtro e busca.',
    highlights: [],
    techs: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Motion', 'Playwright'],
    featured: false,
  },
  {
    slug: 'daniel-franca',
    title: 'Daniel P. França',
    segment: 'Advocacia',
    status: 'in-progress',
    url: 'https://site-daniel-six.vercel.app/',
    image: 'daniel-franca',
    accent: '#b08d57',
    summary:
      'Site institucional para advocacia em Direito de Família, do Trabalho e Previdenciário. Versão de demonstração, com o conteúdo em validação antes da publicação oficial.',
    highlights: [],
    techs: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Motion'],
    featured: false,
  },
  {
    slug: 'brinque-e-descomplique',
    title: 'Brinque & Descomplique',
    segment: 'Plataforma · fonoaudiologia infantil',
    status: 'in-progress',
    url: 'https://site-jogos-fono.vercel.app/',
    image: 'brinque-e-descomplique',
    accent: '#308994',
    summary:
      'Plataforma de jogos educativos para sessões de fonoaudiologia infantil, com acesso individual para cada profissional e atividades pensadas primeiro para o tablet.',
    highlights: [],
    techs: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Motion', 'Auth.js'],
    featured: false,
  },
  {
    slug: 'jat-veiculos',
    title: 'JAT Veículos',
    segment: 'Revenda de veículos · redesign',
    status: 'in-progress',
    url: 'https://site-jat-veiculos.vercel.app/',
    image: 'jat-veiculos',
    accent: '#d4a017',
    summary:
      'Conceito de redesign, não oficial, para uma revenda de novos e seminovos em Belo Horizonte, com showroom digital e estoque com busca e filtros.',
    highlights: [],
    techs: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Motion'],
    featured: false,
  },
];

/** Apenas trabalhos entregues a clientes (usado no Hero, que fala de sites publicados). */
export const clientProjects = projects.filter((p) => p.status === 'completed');

export const projectImage = (p: Project, width: 800 | 1600) => `/projetos/${p.image}-${width}.webp`;

export type ServiceIcon = 'institucional' | 'landing' | 'reformulacao' | 'manutencao';

export const services: { icon: ServiceIcon; title: string; description: string; idealFor: string[] }[] = [
  {
    icon: 'institucional',
    title: 'Sites institucionais',
    description:
      'Sites personalizados para empresas, consultórios, profissionais e negócios locais, com a identidade da sua marca e as informações que seu cliente procura.',
    idealFor: ['Clínicas e consultórios', 'Escritórios', 'Profissionais liberais', 'Comércio local'],
  },
  {
    icon: 'landing',
    title: 'Landing pages',
    description:
      'Páginas focadas em apresentar um serviço ou campanha e transformar o interesse do visitante em contato.',
    idealFor: ['Campanhas', 'Lançamentos', 'Serviços específicos'],
  },
  {
    icon: 'reformulacao',
    title: 'Reformulação de sites',
    description:
      'Modernização visual, navegação mais clara, melhor experiência no celular e reorganização do conteúdo do site que você já tem.',
    idealFor: ['Sites desatualizados', 'Sites difíceis de usar no celular'],
  },
  {
    icon: 'manutencao',
    title: 'Manutenção e suporte',
    description:
      'Hospedagem, acompanhamento técnico e alterações no site conforme o serviço contratado.',
    idealFor: ['Site sempre no ar', 'Atualizações de conteúdo'],
  },
];

export const steps = [
  {
    title: 'Conversa inicial',
    description: 'Conversamos sobre o seu negócio, seu público e o que o site precisa resolver.',
  },
  {
    title: 'Escopo e proposta',
    description: 'Defino páginas, funcionalidades e prazo, e envio uma proposta clara para sua aprovação.',
  },
  {
    title: 'Desenvolvimento e revisão',
    description: 'Desenvolvo o site e apresento para você revisar e pedir ajustes antes da publicação.',
  },
  {
    title: 'Publicação',
    description: 'Colocamos o site no ar no seu domínio e combinamos manutenção, suporte e próximos passos.',
  },
];

/**
 * Valores comerciais de referência. Ajuste aqui quando mudarem — o FAQ usa estas constantes.
 */
export const pricing = {
  projetoAPartirDe: 'R$ 1.000',
  manutencaoAPartirDe: 'R$ 50',
};

export const faq = [
  {
    q: 'Quanto custa desenvolver um site?',
    a: `Cada projeto é orçado de acordo com o escopo: quantidade de páginas, funcionalidades e conteúdo. Como referência, os projetos começam a partir de ${pricing.projetoAPartirDe}. Depois de entender o que você precisa, envio uma proposta com o valor final.`,
  },
  {
    q: 'O site funciona no celular?',
    a: 'Sim. Todos os sites são desenvolvidos para funcionar bem em celulares, tablets e computadores, com o layout adaptado a cada tamanho de tela.',
  },
  {
    q: 'Preciso comprar um domínio?',
    a: 'Sim. O domínio (por exemplo, seunegocio.com.br) fica registrado no seu nome e é pago por você. Se precisar, eu oriento o registro e cuido da configuração para o site funcionar nele.',
  },
  {
    q: 'A hospedagem está incluída?',
    a: `A hospedagem faz parte do serviço de manutenção mensal, que normalmente começa a partir de ${pricing.manutencaoAPartirDe} e pode incluir acompanhamento técnico e alterações, conforme o que for combinado.`,
  },
  {
    q: 'Posso solicitar alterações depois da entrega?',
    a: 'Sim. Antes da publicação há uma etapa de revisão para ajustes. Depois que o site está no ar, as alterações entram no plano de manutenção ou são orçadas à parte, conforme combinado.',
  },
  {
    q: 'Quanto tempo demora o desenvolvimento?',
    a: 'Depende do tamanho do projeto e de quando o conteúdo (textos, fotos e logotipo) fica pronto. O prazo é definido junto com a proposta, antes de começarmos.',
  },
  {
    q: 'Como funciona o pagamento?',
    a: 'As condições de pagamento são combinadas na proposta, de acordo com o escopo de cada projeto.',
  },
];

export const techStack = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Framer Motion', 'Prisma', 'SQL', 'Git'];

export const timeline = [
  { period: '2024 — hoje', title: 'Desenvolvedor freelancer', place: 'Projetos para negócios locais' },
  { period: '2024 — 2028', title: 'Ciência da Computação', place: 'PUC Minas · em andamento' },
  { period: '2024 — 2027', title: 'Inglês', place: 'Wizard by Pearson · em andamento' },
];
