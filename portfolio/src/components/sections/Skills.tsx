export default function Skills() {
  const hardSkills = [
    "JavaScript", "TypeScript", "React", "Tailwind CSS", 
    "Java", "SQL", "Git/GitHub"
  ];
  
  const softSkills = [
    "Resolução de Problemas", "Comunicação Clara", 
    "Trabalho em Equipe", "Raciocínio Lógico", "Adaptabilidade"
  ];

  return (
    <section id="habilidades" className="py-20 container mx-auto px-6">
      <h2 className="text-3xl font-bold mb-12 text-center">Minhas Habilidades</h2>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Hard Skills */}
        <div className="glass-card p-8 rounded-2xl">
          <h3 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-blue-400">Hard Skills</h3>
          <div className="flex flex-wrap gap-3">
            {hardSkills.map((skill) => (
              <span key={skill} className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="glass-card p-8 rounded-2xl">
          <h3 className="text-2xl font-semibold mb-6 text-cyan-600 dark:text-cyan-400">Soft Skills</h3>
          <div className="flex flex-wrap gap-3">
            {softSkills.map((skill) => (
              <span key={skill} className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}