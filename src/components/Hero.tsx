
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Star, Sparkles, ArrowDown } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import VideoSection from "./VideoSection";

// Memoizando componentes que não mudam frequentemente para evitar re-renderizações
import React from 'react';

const MemoizedVideoSection = React.memo(VideoSection);

// Optimização de animações para melhorar performance
const particleVariants: Variants = {
  animate: {
    opacity: [0.1, 0.3, 0.1],
    scale: [1, 1.2, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror",
    }
  }
};

// Animação para a seta
const arrowVariants: Variants = {
  animate: {
    y: [0, 10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }
  }
};

const Hero = () => {
  const isMobile = useIsMobile();
  
  // Pré-calculando partículas para evitar recalculos durante renderização
  const particles = React.useMemo(() => 
    Array.from({ length: 6 }).map((_, i) => ({
      key: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: i * 0.7
    })), []);
    
  // Função para rolar suavemente para a próxima seção
  const scrollToNextSection = () => {
    const sobreSection = document.getElementById('sobre');
    if (sobreSection) {
      sobreSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="início" 
      className="relative min-h-screen bg-cover bg-center flex flex-col items-center overflow-hidden pt-24 md:pt-32" 
      style={{
        backgroundImage: "url('https://cnkcoxooaetehlufjwbr.supabase.co/storage/v1/object/public/avatars//bg_site%202.png')",
        backgroundPosition: "center top"
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side - Card */}
          <motion.div 
            initial={{
              opacity: 0,
              y: 30
            }} 
            animate={{
              opacity: 1,
              y: 0
            }} 
            transition={{
              duration: 1,
              delay: 0.8
            }} 
            className="w-full md:w-1/2 text-white rounded-xl py-6 md:py-[30px] px-4 md:px-8 relative bg-gradient-to-br from-white/40 to-white/30 backdrop-blur-md border border-white/10 shadow-lg overflow-hidden"
          >
            {/* Premium shine animation element - Otimizada */}
            <motion.div 
              className="absolute inset-0 opacity-30 bg-gradient-to-r from-transparent via-white to-transparent" 
              style={{
                backgroundSize: "200% 100%"
              }} 
              animate={{
                backgroundPosition: ["100% 0%", "-100% 0%"]
              }} 
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 6,
                ease: "easeInOut"
              }} 
            />
            
            {/* Subtle glowing particles - Otimizadas */}
            <div className="absolute inset-0 overflow-hidden">
              {particles.map((particle) => (
                <motion.div 
                  key={particle.key} 
                  className="absolute w-12 md:w-16 h-12 md:h-16 rounded-full bg-white/10 blur-xl" 
                  style={{
                    left: particle.left,
                    top: particle.top
                  }} 
                  variants={particleVariants}
                  animate="animate"
                  transition={{
                    delay: particle.delay
                  }}
                />
              ))}
            </div>

            {/* Badge element */}
            <motion.div 
              initial={{
                y: -20,
                opacity: 0
              }} 
              animate={{
                y: 0,
                opacity: 1
              }} 
              transition={{
                delay: 2,
                duration: 0.5
              }} 
              className="mb-2"
            >
              <Badge className="bg-Heitoraí-green/90 text-white px-3 py-1 gap-1 uppercase text-xs font-semibold">
                <Sparkles className="h-3 w-3" /> Exclusivo
              </Badge>
            </motion.div>
            
            <motion.h2 
              initial={{
                opacity: 0
              }} 
              animate={{
                opacity: 1
              }} 
              transition={{
                duration: 1,
                delay: 1.2
              }} 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-medium mb-3 md:mb-4 text-zinc-950"
            >
              Seu paraíso, sua reserva.
            </motion.h2>
            
            <motion.p 
              initial={{
                opacity: 0
              }} 
              animate={{
                opacity: 1
              }} 
              transition={{
                duration: 1,
                delay: 1.7
              }} 
              className="mb-6 md:mb-10 max-w-lg font-medium text-base md:text-lg text-zinc-950"
            >
              Loteamento premium ao lado rio Uru próximo da cidade de Heitoraí. Com acesso privilegiado ao cristalino Rio Uru, cada detalhe foi meticulosamente planejado para proporcionar uma experiência de vida sem igual, onde sofisticação e sustentabilidade caminham juntas.
            </motion.p>
            
            <motion.div 
              initial={{
                opacity: 0,
                y: 20
              }} 
              animate={{
                opacity: 1,
                y: 0
              }} 
              transition={{
                duration: 0.8,
                delay: 2
              }} 
              className="w-full text-center md:text-left"
            >
              <motion.a 
                href="#fale-conosco" 
                className="btn-primary block md:inline-block text-center w-full md:w-auto relative group overflow-hidden" 
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(42, 122, 75, 0.3)"
                }} 
                whileTap={{
                  scale: 0.95
                }}
              >
                <motion.span className="relative z-10 flex items-center justify-center gap-2">
                  GARANTA SEU LOTE PREMIUM
                  <Star className="w-4 h-4" />
                </motion.span>
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 w-full bg-white/30" 
                  initial={{
                    width: "0%"
                  }} 
                  whileHover={{
                    width: "100%"
                  }} 
                  transition={{
                    duration: 0.3
                  }} 
                />
              </motion.a>
            </motion.div>
              
            {/* Floating elements for premium feeling - Otimizadas */}
            <motion.div 
              className="absolute -bottom-6 -right-6 w-16 md:w-24 h-16 md:h-24 bg-Heitoraí-blue/10 rounded-full blur-xl" 
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }} 
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }} 
            />
            
            <motion.div 
              className="absolute -top-6 -left-6 w-14 md:w-20 h-14 md:h-20 bg-Heitoraí-green/10 rounded-full blur-xl" 
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.7, 0.5]
              }} 
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }} 
            />
          </motion.div>

          {/* Right side - Video - Only visible on desktop - Memoizado */}
          <motion.div 
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              duration: 0.6,
              delay: 0.2
            }}
            className="hidden md:block md:w-1/2 h-[450px]"
          >
            <MemoizedVideoSection />
          </motion.div>
        </div>
        
        {/* Video for mobile - Only visible on mobile - Memoizado */}
        <div className="md:hidden w-full mt-8">
          <motion.div 
            className="w-full h-60"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MemoizedVideoSection />
          </motion.div>
        </div>
      </div>
      
      {/* Seta animada para descer - Nova adição */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        onClick={scrollToNextSection}
        whileHover={{ scale: 1.2 }}
        variants={arrowVariants}
        animate="animate"
      >
        <div className="flex flex-col items-center">
          <span className="text-white text-sm mb-2 font-medium bg-Heitoraí-green/80 px-3 py-1 rounded-full backdrop-blur-sm">
            Saiba mais
          </span>
          <div className="bg-Heitoraí-green rounded-full p-2 shadow-lg border-2 border-white/30">
            <ArrowDown className="h-6 w-6 text-white" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// Exportando como componente memoizado para evitar re-renderizações desnecessárias
export default React.memo(Hero);
