
import { useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { motion, useScroll, useSpring } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";
import ChatBubble from "@/components/ChatBot/ChatBubble";

// Importação com lazy loading para melhorar o carregamento inicial
const Hero = lazy(() => import("@/components/Hero"));
const Features = lazy(() => import("@/components/Features"));
const Map = lazy(() => import("@/components/Map"));
const Contact = lazy(() => import("@/components/Contact"));
const AboutUs = lazy(() => import("@/components/AboutUs"));
const TimelineDemo = lazy(() => import("@/components/TimelineDemo").then(module => ({ default: module.TimelineDemo })));
const InvestorSection = lazy(() => import("@/components/InvestorSection"));

// Componente de carregamento simples
const LoadingFallback = () => <div className="w-full h-32 flex items-center justify-center">Carregando...</div>;

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Set the background color of the body to white
    document.body.style.backgroundColor = "white";
    
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-Heitoraí-green origin-left z-50"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <div className="w-full">
        <Suspense fallback={<LoadingFallback />}>
          <Hero />
        </Suspense>
      </div>
      
      <div id="sobre" className="w-full bg-white">
        <AnimatedSection className="relative z-10 bg-white w-full">
          <Suspense fallback={<LoadingFallback />}>
            <Features />
          </Suspense>
        </AnimatedSection>
      </div>
      
      <div id="vantagens" className="w-full bg-white">
        <AnimatedSection delay={0.3} className="relative z-10 bg-white w-full">
          <Suspense fallback={<LoadingFallback />}>
            <TimelineDemo />
          </Suspense>
        </AnimatedSection>
      </div>
      
      <div id="investidores" className="w-full bg-white">
        <AnimatedSection delay={0.35} className="relative z-10 bg-white w-full">
          <Suspense fallback={<LoadingFallback />}>
            <InvestorSection />
          </Suspense>
        </AnimatedSection>
      </div>
      
      <div id="mapa" className="w-full bg-white">
        <AnimatedSection delay={0.4} className="relative z-10 bg-white w-full">
          <Suspense fallback={<LoadingFallback />}>
            <Map />
          </Suspense>
        </AnimatedSection>
      </div>
      
      <div id="sobre-nos" className="w-full bg-white">
        <AnimatedSection delay={0.5} className="relative z-10 bg-white w-full">
          <Suspense fallback={<LoadingFallback />}>
            <AboutUs />
          </Suspense>
        </AnimatedSection>
      </div>
      
      <div id="fale-conosco" className="w-full bg-white">
        <AnimatedSection delay={0.6} className="relative z-10 bg-white w-full">
          <Suspense fallback={<LoadingFallback />}>
            <Contact />
          </Suspense>
        </AnimatedSection>
      </div>
      
      <Footer />
      
      {/* ChatBot */}
      <ChatBubble />
    </div>
  );
};

export default Index;
