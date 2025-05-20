import { MapPin, Navigation, Compass, Route, Sparkles, Mountain, TreePine, Bird } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
const Map = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const mapSection = document.getElementById("mapa");
      if (mapSection) {
        const sectionTop = mapSection.offsetTop;
        const sectionHeight = mapSection.offsetHeight;
        if (scrollPosition > sectionTop - window.innerHeight / 1.5 && scrollPosition < sectionTop + sectionHeight) {
          setIsVisible(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };
  return <section id="mapa" className="py-20 bg-gradient-to-b from-Heitoraí-beige/40 to-white/70 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div initial={{
        opacity: 0,
        scale: 0.8,
        x: "10%"
      }} animate={isVisible ? {
        opacity: 0.05,
        scale: 1,
        x: "0%"
      } : {}} transition={{
        duration: 1.5
      }} className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%]">
          <img src="https://cnkcoxooaetehlufjwbr.supabase.co/storage/v1/object/public/avatars//Background%20(1).png" alt="Nature pattern" className="w-full h-full object-contain opacity-30" />
        </motion.div>
        
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={isVisible ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.8,
        delay: 0.5
      }} className="absolute bottom-10 left-10">
          <TreePine className="w-24 h-24 text-Heitoraí-green/10" />
        </motion.div>
        
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={isVisible ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.8,
        delay: 0.7
      }} className="absolute top-20 left-[5%]">
          <Bird className="w-12 h-12 text-Heitoraí-green/10" />
        </motion.div>
        
        <motion.div initial={{
        opacity: 0,
        x: 20
      }} animate={isVisible ? {
        opacity: 1,
        x: 0
      } : {}} transition={{
        duration: 0.8,
        delay: 0.9
      }} className="absolute top-1/3 right-[10%]">
          <Mountain className="w-16 h-16 text-Heitoraí-green/10" />
        </motion.div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={isVisible ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.8
      }} className="text-center mb-16">
          <h2 className="text-center font-serif text-3xl md:text-5xl text-Heitoraí-dark mb-4 relative inline-block">
            LOCALIZAÇÃO PRIVILEGIADA E MASTERPLAN EXCLUSIVO
            <motion.div initial={{
            width: "0%"
          }} animate={isVisible ? {
            width: "100%"
          } : {}} transition={{
            duration: 1.2,
            delay: 0.6
          }} className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-Heitoraí-green to-Heitoraí-light-green" />
          </h2>
          
          <motion.p initial={{
          opacity: 0
        }} animate={isVisible ? {
          opacity: 1
        } : {}} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="mt-6 text-Heitoraí-dark/80 max-w-3xl mx-auto">
            Desperte para uma nova realidade onde a natureza encontra o luxo sustentável. A apenas 30 minutos 
            de Goiânia, o Reserva Rio Uru Heitoraí redefine o conceito de bem viver com acesso exclusivo ao 
            cristalino Rio Uru e uma infraestrutura completa que respeita e valoriza o meio ambiente.
          </motion.p>
        </motion.div>
        
        {/* Etapas do projeto - com animação */}
        <motion.div variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-16">
          <motion.div variants={itemVariants} className="group flex flex-col items-center text-center">
            <div className="relative mb-6">
              <motion.div whileHover={{
              scale: 1.05,
              rotate: 5
            }} className="w-20 h-20 rounded-xl flex items-center justify-center bg-gradient-to-br from-Heitoraí-green to-Heitoraí-light-green text-white shadow-lg group-hover:shadow-Heitoraí-green/30 transition-all duration-300">
                <Compass className="h-10 w-10 group-hover:text-white transition-all duration-300" />
              </motion.div>
              <motion.div whileHover={{
              scale: 1.1
            }} className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-Heitoraí-dark flex items-center justify-center text-xs font-bold shadow-md border-2 border-Heitoraí-light-green">
                1
              </motion.div>
            </div>
            <h4 className="text-Heitoraí-dark font-medium text-lg mb-2">Planejamento Sustentável</h4>
            <p className="text-gray-600 group-hover:text-Heitoraí-dark/80 transition-colors duration-300">
              Estudo ambiental completo para integração harmônica entre arquitetura e natureza preservada
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="group flex flex-col items-center text-center">
            <div className="relative mb-6">
              <motion.div whileHover={{
              scale: 1.05,
              rotate: -5
            }} className="w-20 h-20 rounded-xl flex items-center justify-center bg-gradient-to-br from-Heitoraí-green to-Heitoraí-light-green text-white shadow-lg group-hover:shadow-Heitoraí-green/30 transition-all duration-300">
                <MapPin className="h-10 w-10 group-hover:text-white transition-all duration-300" />
              </motion.div>
              <motion.div whileHover={{
              scale: 1.1
            }} className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-Heitoraí-dark flex items-center justify-center text-xs font-bold shadow-md border-2 border-Heitoraí-light-green">
                2
              </motion.div>
            </div>
            <h4 className="text-Heitoraí-dark font-medium text-lg mb-2">Zoneamento Bioclimático</h4>
            <p className="text-gray-600 group-hover:text-Heitoraí-dark/80 transition-colors duration-300">
              Distribuição estratégica que maximiza conforto térmico e ventilação natural em cada lote
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="group flex flex-col items-center text-center">
            <div className="relative mb-6">
              <motion.div whileHover={{
              scale: 1.05,
              rotate: 5
            }} className="w-20 h-20 rounded-xl flex items-center justify-center bg-gradient-to-br from-Heitoraí-green to-Heitoraí-light-green text-white shadow-lg group-hover:shadow-Heitoraí-green/30 transition-all duration-300">
                <Route className="h-10 w-10 group-hover:text-white transition-all duration-300" />
              </motion.div>
              <motion.div whileHover={{
              scale: 1.1
            }} className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-Heitoraí-dark flex items-center justify-center text-xs font-bold shadow-md border-2 border-Heitoraí-light-green">
                3
              </motion.div>
            </div>
            <h4 className="text-Heitoraí-dark font-medium text-lg mb-2">Infraestrutura Premium</h4>
            <p className="text-gray-600 group-hover:text-Heitoraí-dark/80 transition-colors duration-300">
              Tecnologia de ponta com sistemas subterrâneos e vias ecoeficientes para máximo conforto e durabilidade
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="group flex flex-col items-center text-center">
            <div className="relative mb-6">
              <motion.div whileHover={{
              scale: 1.05,
              rotate: -5
            }} className="w-20 h-20 rounded-xl flex items-center justify-center bg-gradient-to-br from-Heitoraí-green to-Heitoraí-light-green text-white shadow-lg group-hover:shadow-Heitoraí-green/30 transition-all duration-300">
                <Navigation className="h-10 w-10 group-hover:text-white transition-all duration-300" />
              </motion.div>
              <motion.div whileHover={{
              scale: 1.1
            }} className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-Heitoraí-dark flex items-center justify-center text-xs font-bold shadow-md border-2 border-Heitoraí-light-green">
                4
              </motion.div>
            </div>
            <h4 className="text-Heitoraí-dark font-medium text-lg mb-2">Paisagismo Regenerativo</h4>
            <p className="text-gray-600 group-hover:text-Heitoraí-dark/80 transition-colors duration-300">
              Sistema que recupera e amplia a biodiversidade nativa, criando microclimas agradáveis em todo o condomínio
            </p>
          </motion.div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Coluna da esquerda - Allan Sávio */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} animate={isVisible ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.8,
          delay: 0.2
        }}>
            <Card className="overflow-hidden border-none shadow-xl h-full transform transition-all duration-500 hover:shadow-2xl hover:shadow-Heitoraí-green/20">
              <div className="relative h-full bg-gradient-to-br from-Heitoraí-dark/95 to-Heitoraí-green/90 text-white overflow-hidden">
                <motion.img initial={{
                scale: 1.2
              }} animate={isVisible ? {
                scale: 1
              } : {}} transition={{
                duration: 1.5
              }} src="https://cnkcoxooaetehlufjwbr.supabase.co/storage/v1/object/public/avatars//WhatsApp%20Image%202025-05-07%20at%2010.29.02.jpeg" alt="Vista do condomínio" className="absolute inset-0 w-full h-full object-cover opacity-20 z-0" />
                <div style={{
                backgroundImage: "url('https://cnkcoxooaetehlufjwbr.supabase.co/storage/v1/object/public/avatars//WhatsApp%20Image%202025-05-07%20at%2010.29.02.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundBlendMode: "overlay"
              }} className="relative z-10 p-8 h-full flex flex-col justify-between bg-black/[0.52]">
                  <div className="flex items-center space-x-2 mt-4">
                    <motion.div initial={{
                    width: 0
                  }} animate={isVisible ? {
                    width: "2.5rem"
                  } : {}} transition={{
                    duration: 0.6,
                    delay: 0.6
                  }} className="h-1 bg-Heitoraí-light-green"></motion.div>
                    <motion.span initial={{
                    opacity: 0
                  }} animate={isVisible ? {
                    opacity: 1
                  } : {}} transition={{
                    duration: 0.8,
                    delay: 0.8
                  }} className="text-xs uppercase tracking-wider text-Heitoraí-light-green">
                      Excelência em Bioconstrução
                    </motion.span>
                  </div>
                  
                  <div className="mt-auto">
                    <motion.div initial={{
                    y: 20,
                    opacity: 0
                  }} animate={isVisible ? {
                    y: 0,
                    opacity: 1
                  } : {}} transition={{
                    duration: 0.8,
                    delay: 0.4
                  }}>
                      <p className="text-Heitoraí-light-green font-serif uppercase text-xl mb-4">ALLAN SÁVIO</p>
                      <p className="text-xs uppercase mb-4 font-light tracking-wider">
                        ARQUITETO PREMIADO INTERNACIONAL
                      </p>
                      <Separator className="my-5 bg-white/20" />
                      <p className="text-sm italic leading-relaxed">
                        "O Reserva Rio Uru Heitoraí transcende o conceito tradicional de condomínio ao 
                        criar um verdadeiro santuário entre o céu e a água. Cada detalhe, desde o traçado 
                        das vias até a orientação dos lotes, foi meticulosamente planejado para maximizar 
                        a experiência sensorial de viver em harmonia com a natureza."
                      </p>
                    </motion.div>
                    <motion.div initial={{
                    y: 20,
                    opacity: 0
                  }} animate={isVisible ? {
                    y: 0,
                    opacity: 1
                  } : {}} transition={{
                    duration: 0.8,
                    delay: 0.6
                  }} className="mt-6 flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-Heitoraí-light-green/50 to-Heitoraí-light-green/20 flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-Heitoraí-light-green" />
                      </div>
                      <p className="ml-4 text-xs">
                        Masterplan Premiado em<br />Sustentabilidade 2023
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          
          {/* Coluna do meio - Informações */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={isVisible ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="flex flex-col space-y-8">
            {/* Logo */}
            <motion.div whileHover={{
            scale: 1.05
          }} transition={{
            duration: 0.3
          }} className="flex justify-center mb-6">
              <img src="https://cnkcoxooaetehlufjwbr.supabase.co/storage/v1/object/public/avatars//Logo%20horizontal@2x%201.png" alt="Logo Condomínio Reserva Rio Uru Heitoraí" className="h-auto max-w-full" />
            </motion.div>
            
            {/* Características */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <motion.div whileHover={{
              y: -5
            }} transition={{
              duration: 0.3
            }}>
                <Card className="border border-Heitoraí-green/20 bg-white shadow-md h-full hover:shadow-lg hover:shadow-Heitoraí-green/10 transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-Heitoraí-beige p-3 rounded-full mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#2A7A4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <h4 className="font-medium text-Heitoraí-dark mb-2">Arquitetura Harmônica</h4>
                      <p className="text-sm mb-3 text-gray-600">
                        Projeto que integra beleza estética e funcionalidade com respeito total aos recursos naturais do terreno
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div whileHover={{
              y: -5
            }} transition={{
              duration: 0.3
            }}>
                <Card className="border border-Heitoraí-green/20 bg-white shadow-md h-full hover:shadow-lg hover:shadow-Heitoraí-green/10 transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-Heitoraí-beige p-3 rounded-full mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 22C13.6569 22 15 20.6569 15 19C15 17.3431 13.6569 16 12 16C10.3431 16 9 17.3431 9 19C9 20.6569 10.3431 22 12 22Z" stroke="#2A7A4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M12 16V6" stroke="#2A7A4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M12 6C13.6569 6 15 4.65685 15 3C15 1.34315 13.6569 0 12 0C10.3431 0 9 1.34315 9 3C9 4.65685 10.3431 6 12 6Z" stroke="#2A7A4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <h4 className="font-medium text-Heitoraí-dark mb-2">Paisagismo Sensorial</h4>
                      <p className="text-sm mb-3 text-gray-600">
                        Experiência multissensorial com espécies nativas que criam uma conexão profunda com a natureza local
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            {/* Formulário de contato */}
            <Card className="border-none shadow-xl bg-white overflow-hidden">
              <CardContent className="pt-6">
                <motion.div initial={{
                opacity: 0
              }} animate={isVisible ? {
                opacity: 1
              } : {}} transition={{
                duration: 0.8,
                delay: 0.6
              }}>
                  <h3 className="text-center text-lg font-medium mb-6 text-Heitoraí-dark">
                    Receba informações privilegiadas
                  </h3>
                  
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input type="text" placeholder="Seu nome *" className="border-Heitoraí-green/30 focus-visible:ring-Heitoraí-green transition-all duration-300" />
                      <Input type="email" placeholder="E-mail *" className="border-Heitoraí-green/30 focus-visible:ring-Heitoraí-green transition-all duration-300" />
                    </div>
                    
                    <div className="flex">
                      <div className="bg-gray-100 px-3 py-2 border border-Heitoraí-green/30 rounded-l-md flex items-center">
                        <span className="text-gray-500">+55</span>
                      </div>
                      <Input type="tel" placeholder="Seu telefone *" className="rounded-l-none border-Heitoraí-green/30 focus-visible:ring-Heitoraí-green transition-all duration-300" />
                    </div>
                    
                    <div className="flex items-center">
                      <input type="checkbox" id="terms" className="mr-2 accent-Heitoraí-green" />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        Aceito receber informações exclusivas
                      </label>
                    </div>
                    
                    <motion.div whileHover={{
                    scale: 1.03
                  }} whileTap={{
                    scale: 0.97
                  }}>
                      <Button type="submit" className="w-full py-6 bg-gradient-to-r from-Heitoraí-green to-Heitoraí-dark text-white font-medium hover:shadow-lg hover:shadow-Heitoraí-green/20 transition-all duration-300">
                        Quero conhecer o Reserva Rio Uru
                      </Button>
                    </motion.div>
                  </form>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Coluna da direita - Mapa do condomínio */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} animate={isVisible ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.8,
          delay: 0.2
        }} whileHover={{
          y: -5
        }}>
            <Card className="overflow-hidden border-none shadow-xl h-full hover:shadow-2xl hover:shadow-Heitoraí-green/20 transition-all duration-300">
              <div className="p-5">
                <div className="relative rounded-lg overflow-hidden">
                  <motion.div initial={{
                  scale: 1.1
                }} animate={isVisible ? {
                  scale: 1
                } : {}} transition={{
                  duration: 1
                }} className="absolute inset-0 bg-gradient-to-b from-Heitoraí-green/20 to-transparent z-10" />
                  
                  <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md z-10">
                    <MapPin className="h-5 w-5 text-Heitoraí-green" />
                  </div>
                  
                  <div className="absolute top-4 left-4 bg-Heitoraí-green px-3 py-1 rounded-full text-white text-xs font-medium z-10">
                    Vista Aérea Exclusiva
                  </div>
                  
                  <motion.img whileHover={{
                  scale: 1.05
                }} transition={{
                  duration: 0.5
                }} src="https://cnkcoxooaetehlufjwbr.supabase.co/storage/v1/object/public/avatars//Frame%203.png" alt="Mapa do condomínio" className="w-full h-auto object-contain" />
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-Heitoraí-dark/80 via-Heitoraí-dark/40 to-transparent px-4 py-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white text-sm font-medium">Reserva Rio Uru</p>
                        <p className="text-white/80 text-xs">Acesso exclusivo ao Rio</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <p className="text-white text-xs">2023 © Heitoraí</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-Heitoraí-beige/30 rounded-lg">
                  <h4 className="text-Heitoraí-dark font-medium mb-3 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-Heitoraí-green" />
                    Diferenciais do projeto
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-Heitoraí-light-green/40 flex items-center justify-center mr-2 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-Heitoraí-green"></div>
                      </div>
                      <span>Acesso exclusivo ao cristalino Rio Uru</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-Heitoraí-light-green/40 flex items-center justify-center mr-2 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-Heitoraí-green"></div>
                      </div>
                      <span>Infraestrutura subterrânea completa</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-Heitoraí-light-green/40 flex items-center justify-center mr-2 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-Heitoraí-green"></div>
                      </div>
                      <span>Segurança perimetral avançada 24h</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-Heitoraí-light-green/40 flex items-center justify-center mr-2 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-Heitoraí-green"></div>
                      </div>
                      <span>Área de lazer integrada à natureza</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
        
        {/* Informações adicionais */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isVisible ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.8,
        delay: 0.6
      }} className="bg-white rounded-xl p-8 shadow-xl border border-Heitoraí-light-green/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{
            y: -5
          }} transition={{
            duration: 0.3
          }} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-Heitoraí-beige to-Heitoraí-light-green/30 flex items-center justify-center mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#2A7A4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 6V12L16 14" stroke="#2A7A4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h4 className="font-medium text-Heitoraí-dark mb-2">Cronograma Avançado</h4>
              <p className="text-sm text-gray-600">
                Acompanhamento em tempo real da evolução do empreendimento através de plataforma digital exclusiva para proprietários
              </p>
            </motion.div>
            
            <motion.div whileHover={{
            y: -5
          }} transition={{
            duration: 0.3
          }} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-Heitoraí-beige to-Heitoraí-light-green/30 flex items-center justify-center mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#2A7A4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 4L12 14.01L9 11.01" stroke="#2A7A4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h4 className="font-medium text-Heitoraí-dark mb-2">Segurança Jurídica Total</h4>
              <p className="text-sm text-gray-600">
                Documentação completa e aprovada pelos órgãos competentes, com análise e aprovação de impacto ambiental
              </p>
            </motion.div>
            
            <motion.div whileHover={{
            y: -5
          }} transition={{
            duration: 0.3
          }} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-Heitoraí-beige to-Heitoraí-light-green/30 flex items-center justify-center mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#2A7A4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="#2A7A4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#2A7A4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17 3.13C17.8604 3.35031 18.623 3.85071 19.1676 4.55232C19.7122 5.25392 20.0078 6.11683 20.0078 7.005C20.0078 7.89318 19.7122 8.75608 19.1676 9.45769C18.623 10.1593 17.8604 10.6597 17 10.88" stroke="#2A7A4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h4 className="font-medium text-Heitoraí-dark mb-2">Gestão de Excelência</h4>
              <p className="text-sm text-gray-600">
                Administração condominial premium e suporte pós-entrega por especialistas em empreendimentos de alto padrão
              </p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Elemento UAU - Partículas flutuantes */}
        <div className="relative mt-16 h-24">
          {[...Array(10)].map((_, i) => <motion.div key={i} initial={{
          x: Math.random() * 100 - 50,
          y: Math.random() * 50 - 25,
          opacity: 0
        }} animate={{
          x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
          y: [Math.random() * 50 - 25, Math.random() * 50 - 25],
          opacity: [0, 0.8, 0]
        }} transition={{
          duration: 5 + Math.random() * 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: i * 0.5
        }} className="absolute left-1/2 top-1/2">
              <div className="w-3 h-3 rounded-full bg-Heitoraí-green/40 blur-sm" style={{
            boxShadow: "0 0 8px rgba(42, 122, 75, 0.6)"
          }} />
            </motion.div>)}
          
          <motion.div initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 1,
          delay: 1
        }} className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h3 className="text-Heitoraí-dark/80 text-lg font-medium">
              Seu futuro começa aqui
            </h3>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default Map;