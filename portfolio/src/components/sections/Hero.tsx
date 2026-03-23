import { ArrowRight} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Elemento de fundo para dar um toque "tecnológico" */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10 dark:bg-blue-900/20" />

      <div className="container mx-auto px-6 flex flex-col items-center text-center">
        <h2 className="text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase mb-4">
          Olá, eu sou
        </h2>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Bernardo Pires <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            Mascarenhas
          </span>
        </h1>
        <h3 className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
          Desenvolvedor Full Stack
        </h3>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 italic">
          "Transformando ideias em soluções através da tecnologia"
        </p>

        <div className="flex gap-4">
          <a href="#projetos" className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/30">
            Ver Projetos <ArrowRight size={20} />
          </a>
          <a href="https://github.com/BernardoPiresMascarenhas" target="_blank" rel="noreferrer" className="p-3 glass-card rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}