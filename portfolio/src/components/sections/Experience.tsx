export default function Experience() {
  const experiences = [
    {
      title: "Desenvolvedor Front-end Full Stack (Freelancer)",
      company: "Projetos Autônomos",
      period: "2024 - Presente",
      description: "Desenvolvimento de soluções digitais sob demanda para negócios locais. Atuação em todo o ciclo de vida do projeto: levantamento de requisitos com o cliente, prototipagem (UI/UX), desenvolvimento (React, TypeScript, Tailwind) e deploy. Principais projetos entregues: Império dos Pets, A Criação Gráfica, Clínica de Fonoaudiologia e Itatiaia 304.",
      type: "Trabalho",
      color: "border-l-cyan-500"
    },
    {
      title: "Ciência da Computação",
      company: "PUC Minas",
      period: "Fev 2024 - Jul 2028",
      description: "Sólida base em Algoritmos e Estruturas de Dados. Desenvolvimento com o paradigma de Programação Orientada a Objetos (POO). Princípios de Engenharia de Software e modelagem de Bancos de Dados. Conhecimento aprofundado em sistemas de controle de versão (Git) e metodologias ágeis.",
      type: "Estudo",
      color: "border-l-blue-500"
    },
    {
      title: "Inglês",
      company: "Wizard by Pearson",
      period: "Jan 2024 - Dez 2027",
      description: "Estudo contínuo focado em conversação, leitura técnica e escrita. Preparação para comunicação clara e eficiente em ambientes corporativos e times de tecnologia globais.",
      type: "Estudo",
      color: "border-l-blue-500"
    }
  ];

  return (
    <section id="experiencia" className="py-20 container mx-auto px-6">
      <h2 className="text-3xl font-bold mb-12 text-center">Trajetória</h2>
      
      <div className="max-w-3xl mx-auto space-y-8 relative">
        {/* Linha vertical que liga os cards (opcional, dá um efeito de timeline legal) */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-800 ml-[1.5rem] -z-10 rounded-full"></div>

        {experiences.map((exp, index) => (
          <div 
            key={index} 
            // Usamos a cor definida no array para diferenciar trabalho de estudo
            className={`glass-card p-6 md:p-8 rounded-2xl relative border-l-4 ${exp.color} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                {exp.title}
              </h3>
              {/* Badge indicando se é Trabalho ou Estudo */}
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-full w-fit">
                {exp.type}
              </span>
            </div>
            
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
              <span>{exp.company}</span>
              <span className="text-gray-400 dark:text-gray-600">•</span>
              <span>{exp.period}</span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}