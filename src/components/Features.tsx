import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

const Features = () => {
  const featureItems = [
    {
      title: "NATUREZA E RIO EXCLUSIVOS",
      icon: <img src="https://cnkcoxooaetehlufjwbr.supabase.co/storage/v1/object/public/avatars//Natureza.svg" alt="Natureza" className="w-10 h-10" />,
      description: "Um santuário natural com acesso privilegiado às margens do Rio Uru, onde cada amanhecer revela uma paisagem deslumbrante de águas cristalinas e vegetação exuberante, criando um cenário perfeito para a sua qualidade de vida."
    }, 
    {
      title: "PAISAGISMO PREMIADO",
      icon: <img src="https://cnkcoxooaetehlufjwbr.supabase.co/storage/v1/object/public/avatars//Natureza%202.svg" alt="Natureza" className="w-10 h-10" />,
      description: "Projeto paisagístico assinado por especialistas renomados, integrando espécies nativas à infraestrutura do condomínio, criando um ambiente onde a biodiversidade local é preservada e valorizada em cada detalhe."
    }, 
    {
      title: "SEGURANÇA PREMIUM",
      icon: <img src="https://cnkcoxooaetehlufjwbr.supabase.co/storage/v1/object/public/avatars//Seguranca.png" alt="Segurança" className="w-10 h-10" />,
      description: "Sistema de segurança completo com monitoramento 24 horas, controle de acesso biométrico e equipe altamente treinada, garantindo tranquilidade total para você e sua família desfrutarem do melhor que a natureza oferece."
    }, 
    {
      title: "HARMONIA PERFEITA",
      icon: <img src="https://cnkcoxooaetehlufjwbr.supabase.co/storage/v1/object/public/avatars//balance.png" alt="Harmonia" className="w-10 h-10" />,
      description: "Arquitetura biofílica revolucionária que respeita o meio ambiente e maximiza o bem-estar dos moradores, com construções que se integram à paisagem natural, proporcionando uma experiência de vida verdadeiramente sustentável."
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };
  
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section id="sobre" className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-Heitoraí-light-green/20 via-white to-white pointer-events-none -z-10" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-Heitoraí-light-green/20"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(40px)'
            }}
            animate={{
              x: [0, Math.random() * 30 - 15, 0],
              y: [0, Math.random() * 30 - 15, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative mb-16 flex flex-col items-center"
        >
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-32 h-32 rounded-full border border-Heitoraí-green/20 -z-10"
          />
          <motion.span
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-44 h-44 rounded-full border border-Heitoraí-light-green/20 -z-10"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-Heitoraí-green/10 p-3 rounded-full mb-4"
          >
            <Sparkles className="text-Heitoraí-green h-6 w-6" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center font-serif text-3xl md:text-5xl text-Heitoraí-dark mb-6"
          >
            EXCLUSIVIDADE EM HARMONIA COM A NATUREZA
          </motion.h2>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-Heitoraí-green rounded-full mb-6"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center max-w-2xl text-Heitoraí-dark/80 mb-10"
          >
            O Condomínio Reserva Rio Uru Heitoraí representa um conceito inovador de moradia que integra sofisticação e consciência ambiental, onde cada elemento foi cuidadosamente planejado para elevar sua experiência de vida em conexão com a natureza.
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {featureItems.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.3 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border border-Heitoraí-light-green/30 bg-white/90 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-500">
                <CardContent className="p-6 flex flex-col items-center h-full">
                  <motion.div
                    animate={floatingAnimation}
                    className="mb-6 bg-gradient-to-br from-Heitoraí-light-green/60 to-Heitoraí-green/30 p-4 rounded-full transform transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-Heitoraí-green/60 group-hover:to-Heitoraí-light-green/30 flex items-center justify-center" style={{ width: '80px', height: '80px' }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="font-serif text-center text-lg font-medium mb-4 text-Heitoraí-dark group-hover:text-Heitoraí-green transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "40px" }}
                    transition={{ duration: 0.8, delay: 0.2 * index }}
                    className="h-0.5 bg-Heitoraí-light-green rounded-full mb-4 group-hover:bg-Heitoraí-green transition-colors duration-300"
                  />
                  <p className="text-center text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              animate={{ 
                rotate: [0, 2, 0, -2, 0],
                scale: [1, 1.02, 1, 1.02, 1] 
              }}
              transition={{ 
                duration: 12, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="absolute -z-10 -top-6 -left-6 w-24 h-24 rounded-full bg-Heitoraí-green/10"
            />
            
            <h3 className="section-title relative">
              Uma oportunidade exclusiva para poucos
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "30%" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-Heitoraí-green to-transparent rounded-full"
              />
            </h3>
            
            <p className="mb-6 text-lg text-Heitoraí-dark/80">
              O Condomínio Reserva Rio Uru Heitoraí é a materialização de um sonho para quem valoriza exclusividade e contato direto com a natureza. Não é apenas um empreendimento imobiliário — é uma declaração de valores e um novo conceito de vida, onde sustentabilidade e sofisticação andam lado a lado.
            </p>
            
            <p className="text-lg text-Heitoraí-dark/80">
              Com localização estratégica e acesso privilegiado às margens do Rio Uru, cada lote foi projetado para preservar a integração com o ambiente natural enquanto proporciona privacidade absoluta. Aqui, você construirá sua residência dos sonhos em meio a uma infraestrutura completa, cercado pela energia revitalizante das águas cristalinas e da mata preservada.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-8 btn-primary group overflow-hidden relative"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                CONHEÇA NOSSOS TERRENOS PREMIUM
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0 bg-Heitoraí-dark transition-all duration-300 -z-0 group-hover:h-full"></span>
            </motion.button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
            className="aspect-video rounded-lg overflow-hidden shadow-2xl relative"
          >
            {/* Glow effect behind image */}
            <div className="absolute -inset-2 bg-gradient-to-br from-Heitoraí-light-green/20 to-Heitoraí-green/5 rounded-xl blur-xl -z-10"></div>
            
            {/* Frame effect */}
            <div className="absolute inset-0 border-2 border-white/20 rounded-lg z-20 pointer-events-none"></div>
            
            <motion.img 
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 3 }}
              alt="Vista aérea do condomínio" 
              className="w-full h-full object-cover rounded-lg" 
              src="/lovable-uploads/d0cd53f7-90e4-4cb9-bbef-bc2228f62cde.jpg" 
            />
            
            {/* Floating elements */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-5 right-5 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-Heitoraí-dark shadow-lg z-10"
            >
              Exclusividade
            </motion.div>
            
            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-5 left-5 bg-Heitoraí-green/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg z-10"
            >
              Vista Panorâmica
            </motion.div>
          </motion.div>
        </div>
        
        {/* New call-to-action section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-32 text-center"
        >
          <h3 className="font-serif text-2xl md:text-3xl text-Heitoraí-dark mb-4">
            Pronto para investir no futuro da sua família?
          </h3>
          <p className="text-Heitoraí-dark/80 max-w-2xl mx-auto mb-8">
            Os lotes do Condomínio Reserva Rio Uru Heitoraí são limitados. Entre em contato agora mesmo e garanta sua participação neste empreendimento exclusivo.
          </p>
          <motion.a
            href="#contato"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center gap-2"
          >
            AGENDE UMA VISITA EXCLUSIVA
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
