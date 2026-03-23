import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

export default function Header() {
  // Alterado para isMenuOpen para compatibilidade com sua função
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Lógica do Dark Mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Facilitei mudando de 'href' para 'id' para passar direto para a função
  const navLinks = [
    { name: 'Sobre', id: 'sobre' },
    { name: 'Projetos', id: 'projetos' },
    { name: 'Habilidades', id: 'habilidades' },
    { name: 'Experiência', id: 'experiencia' },
    { name: 'Contato', id: 'contato' },
  ];

  // Sua função de rolagem suave com offset
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    
    if (element) {
      const headerOffset = 112; 
      const elementPosition = element.getBoundingClientRect().top;
      // window.scrollY é o padrão moderno para window.pageYOffset
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 glass-card border-b-0">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Usando a mesma função para o logo voltar ao topo */}
        <a 
          href="#topo" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500"
        >
          B. Mascarenhas
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className="text-sm font-medium hover:text-blue-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => setIsDark(!isDark)} 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setIsDark(!isDark)}>
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass-card border-t border-gray-200 dark:border-gray-800 flex flex-col items-center py-6 gap-6 shadow-xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.id}`} 
              onClick={(e) => scrollToSection(e, link.id)} 
              className="text-lg font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}