import React, { useState, useRef } from 'react';
import { Mail, Loader2 } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setIsLoading(true);

    if (!formRef.current) return;

    try {
      
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, 
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
        formRef.current, 
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSuccessMessage("Mensagem enviada com sucesso! Responderei em breve.");
      formRef.current.reset();
    } catch (error) {
      console.error("Erro:", error);
      setErrorMessage("Erro ao enviar. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
      
      // Limpa as mensagens após 5 segundos
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <section id="contato" className="py-20 container mx-auto px-6 mb-20">
      <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-3xl grid md:grid-cols-2 gap-12">
        
        {/* Info de Contato (Mantido igual) */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Vamos conversar?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Estou sempre aberto a novas oportunidades e projetos interessantes. Me mande uma mensagem!
          </p>
          
          <div className="space-y-4">
            <a href="mailto:bernardomasca3008@gmail.com" className="flex items-center gap-3 text-lg hover:text-blue-500 transition-colors">
              <Mail className="text-blue-500" /> bernardomasca3008@gmail.com
            </a>
            <a href="https://github.com/BernardoPiresMascarenhas" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-lg hover:text-blue-500 transition-colors">
              <FaGithub className="text-blue-500" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/bernardo-pires-/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-lg hover:text-blue-500 transition-colors">
              <FaLinkedin className="text-blue-500" /> LinkedIn
            </a>
          </div>
        </div>

        {/* Formulário com EmailJS e o botão do Império dos Pets adaptado */}
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
          
          {errorMessage && <p className="text-red-500 text-sm font-medium">{errorMessage}</p>}

          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            {/* O atributo 'name' é crucial para o EmailJS identificar os campos */}
            <input 
              type="text" 
              name="user_name" 
              required
              placeholder="Seu nome" 
              className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input 
              type="email" 
              name="user_email" 
              required
              placeholder="seu@email.com" 
              className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mensagem</label>
            <textarea 
              rows={4} 
              name="message" 
              required
              placeholder="Como posso ajudar?" 
              className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-3 mt-2 rounded-lg font-semibold transition-all flex justify-center items-center ${
              isLoading 
                ? 'bg-blue-400 cursor-not-allowed text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" /> Enviando...
              </span>
            ) : (
              'Enviar Mensagem'
            )}
          </button>

          {successMessage && (
            <div className="absolute -bottom-14 left-0 w-full bg-green-100 dark:bg-green-900/30 border border-green-500 text-green-700 dark:text-green-400 px-4 py-2 rounded-lg text-center text-sm font-medium animate-pulse">
              {successMessage}
            </div>
          )}
        </form>

      </div>
    </section>
  );
}