
"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
  AnimatePresence
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }

    const handleScroll = () => {
      if (!ref.current) return;
      
      const items = ref.current.querySelectorAll('.timeline-item');
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    // Update height on resize for responsive layouts
    const handleResize = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 80%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Enhanced animation variants
  const lineVariants = {
    hidden: { height: 0 },
    visible: (i: number) => ({
      height: "100%",
      transition: { 
        delay: 0.2 * i,
        duration: 0.8,
        ease: "easeInOut"
      }
    })
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.3 * i,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.4 * i,
        duration: 0.6,
        type: "spring",
        stiffness: 200
      }
    })
  };

  return (
    <div
      className="w-full bg-gradient-to-b from-white to-Heitoraí-beige/30 dark:from-neutral-950 dark:to-neutral-900 font-sans px-4 md:px-10 py-16"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 lg:px-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center font-serif text-3xl md:text-5xl mb-6 text-Heitoraí-dark dark:text-white max-w-4xl mx-auto"
        >
          Vantagens Exclusivas Heitoraí
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center text-Heitoraí-dark/80 dark:text-neutral-300 text-sm md:text-base max-w-2xl mx-auto mb-16"
        >
          Descubra o que torna o Reserva Rio Uru Heitoraí uma oportunidade única, combinando 
          natureza preservada, infraestrutura de alto padrão e valorização excepcional para 
          criar o refúgio perfeito para sua família e seu patrimônio.
        </motion.p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className={`timeline-item flex justify-start pt-10 md:pt-40 md:gap-10 ${activeIndex === index ? 'active' : ''}`}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            custom={index}
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <motion.div 
                className="h-16 absolute left-2 md:left-2 w-16 rounded-full bg-white dark:bg-black flex items-center justify-center shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <motion.div 
                  className={`h-10 w-10 rounded-full ${activeIndex === index ? 'bg-Heitoraí-green' : 'bg-Heitoraí-light-green/70'} dark:bg-neutral-800 border border-Heitoraí-green/30 dark:border-neutral-700 flex items-center justify-center`}
                  animate={{ 
                    scale: activeIndex === index ? [1, 1.2, 1] : 1,
                    backgroundColor: activeIndex === index ? '#2A7A4B' : 'rgba(197, 226, 165, 0.7)'
                  }}
                  transition={{ duration: 0.7, repeat: activeIndex === index ? Infinity : 0, repeatDelay: 2 }}
                >
                  <motion.div
                    variants={iconVariants}
                    initial="hidden"
                    whileInView="visible"
                    custom={index}
                  >
                    {item.icon}
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.h3 
                className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-Heitoraí-dark dark:text-neutral-500"
                animate={{ 
                  x: activeIndex === index ? [0, 5, 0] : 0,
                  color: activeIndex === index ? '#1E3A29' : '#4A4A4A'
                }}
                transition={{ duration: 0.5 }}
              >
                {item.title}
              </motion.h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <motion.h3 
                className="md:hidden block text-2xl mb-4 text-left font-bold text-Heitoraí-dark dark:text-neutral-500"
                animate={{ 
                  x: activeIndex === index ? [0, 5, 0] : 0,
                  color: activeIndex === index ? '#1E3A29' : '#4A4A4A'
                }}
                transition={{ duration: 0.5 }}
              >
                {item.title}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + (0.1 * index) }}
                className="w-full"
              >
                {item.content}{" "}
              </motion.div>
            </div>
          </motion.div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[3px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-Heitoraí-light-green/30 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-t from-Heitoraí-green via-Heitoraí-light-green to-transparent from-[0%] via-[10%] rounded-full glow"
          />
        </div>
        
        {/* Partículas decorativas animadas */}
        <div className="absolute left-6 top-0 h-full pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-Heitoraí-green/40 blur-sm"
              style={{
                top: `${(i * 10) + Math.random() * 10}%`,
                left: `${Math.random() * 20}px`
              }}
              animate={{
                opacity: [0, 0.7, 0],
                y: [0, -20, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 5,
                delay: i * 0.8,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          ))}
        </div>
        
        {/* Elementos decorativos adicionais */}
        <div className="absolute right-6 top-0 h-full pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-Heitoraí-light-green/30"
              style={{
                top: `${(i * 20) + Math.random() * 10}%`,
                right: `${Math.random() * 40}px`
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                x: [0, 15, 0],
              }}
              transition={{
                duration: 8,
                delay: i * 1.2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Elemento de reflexo inferior */}
      <div className="relative w-full max-w-7xl mx-auto h-40 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute w-full h-full"
          style={{
            background: "linear-gradient(to bottom, rgba(197, 226, 165, 0.1), transparent)",
            transform: "scaleY(-1)"
          }}
        />
      </div>
      
      <style>{`
        .glow {
          box-shadow: 0 0 10px rgba(42, 122, 75, 0.6), 0 0 20px rgba(42, 122, 75, 0.3);
        }
      `}</style>
    </div>
  );
};
