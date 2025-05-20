
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, CreditCard, ChartBar, PiggyBank, Wallet, BarChart3, Percent } from 'lucide-react';
import { cn } from "@/lib/utils";
import InvestmentCalculator from "./investor/InvestmentCalculator";
import InvestmentGraphs from "./investor/InvestmentGraphs";
import PropertyGrowthVisualization from "./investor/PropertyGrowthVisualization";
import { toast } from "@/hooks/use-toast";

const InvestorSection = () => {
  // Valores iniciais e ranges para os requisitos
  const [initialInvestment, setInitialInvestment] = useState(499);
  const [months, setMonths] = useState(12);
  const [appreciationRate, setAppreciationRate] = useState(2);
  const [propertyValue] = useState(150000); // Valor do imóvel
  
  // Calcula o valor futuro com base na valorização mensal
  const calculateFutureValue = () => {
    return initialInvestment * Math.pow(1 + appreciationRate / 100, months);
  };

  // Calcula o lucro
  const calculateProfit = () => {
    return calculateFutureValue() - initialInvestment;
  };
  
  const futureValue = calculateFutureValue();
  const profit = calculateProfit();
  const roi = (profit / initialInvestment) * 100;
  
  // Formata valores monetários com R$
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL',
      maximumFractionDigits: value < 1000 ? 2 : 0
    }).format(value);
  };
  
  // Dados para os gráficos
  const investmentData = useMemo(() => {
    const data = [];
    for (let i = 0; i <= months; i++) {
      const monthValue = initialInvestment * Math.pow(1 + appreciationRate / 100, i);
      data.push({
        mes: i,
        valor: Number(monthValue.toFixed(2)),
        investimento: initialInvestment
      });
    }
    return data;
  }, [initialInvestment, months, appreciationRate]);
  
  // Dados para o gráfico de composição
  const breakdownData = useMemo(() => {
    return [
      { name: 'Investimento Inicial', value: initialInvestment },
      { name: 'Lucro Estimado', value: profit }
    ];
  }, [initialInvestment, profit]);

  // Configuração de cores para os gráficos
  const chartConfig = {
    valor: {
      label: 'Valor Total',
      theme: { light: '#16A34A', dark: '#16A34A' }
    },
    investimento: {
      label: 'Investimento Inicial',
      theme: { light: '#d1d5db', dark: '#d1d5db' }
    },
    lucro: {
      label: 'Lucro',
      theme: { light: '#86EFAC', dark: '#86EFAC' }
    }
  };
  
  // Função para compartilhar simulação via WhatsApp
  const shareSimulation = () => {
    // Texto da mensagem com os detalhes da simulação
    const message = `Confira esta simulação de investimento no Condomínio Reserva Rio Uru Heitoraí:%0A%0A` +
      `💰 *Investimento Inicial:* R$ ${initialInvestment.toLocaleString('pt-BR')}%0A` +
      `📈 *Valorização Mensal:* ${appreciationRate}%%0A` +
      `⏳ *Período:* ${months} meses%0A` +
      `🚀 *Valor Estimado:* R$ ${futureValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%0A` +
      `📊 *Lucro Estimado:* R$ ${profit.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%0A%0A` +
      `Quero te mostrar essa oportunidade incrível! Acesse: ${window.location.href}`;
    
    // Abre o WhatsApp com a mensagem pré-preenchida
    window.open(`https://wa.me/?text=${message}`, '_blank');
    
    // Feedback para o usuário
    toast({
      title: "Compartilhando simulação...",
      description: "Abrindo o WhatsApp para compartilhar os detalhes.",
      duration: 3000,
    });
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };
  
  const statCards = [
    {
      title: "Valorização Mensal",
      value: `${appreciationRate}%`,
      description: "Taxa de valorização mensal",
      icon: <TrendingUp className="text-Heitoraí-green" />
    },
    {
      title: "Retorno sobre Investimento",
      value: `${roi.toFixed(0)}%`,
      description: `Em ${months} meses`,
      icon: <ChartBar className="text-Heitoraí-green" />
    },
    {
      title: "Lucro Estimado",
      value: formatCurrency(profit),
      description: `Em ${months} meses`,
      icon: <PiggyBank className="text-Heitoraí-green" />
    }
  ];

  return (
    <section id="investidores" className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-Heitoraí-beige/20 to-white pointer-events-none -z-10" />
      
      {/* Floating Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        {[...Array(6)].map((_, i) => (
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
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-Heitoraí-green/10 p-3 rounded-full mb-4"
          >
            <CreditCard className="text-Heitoraí-green h-6 w-6" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center font-serif text-3xl md:text-5xl text-Heitoraí-dark mb-6"
          >
            OPORTUNIDADE PREMIUM PARA INVESTIDORES
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
            O Condomínio Reserva Rio Uru Heitoraí representa uma oportunidade única de investimento em um dos mercados imobiliários mais promissores do Brasil. A crescente demanda por propriedades exclusivas em Goiás, combinada com nossa localização privilegiada e compromisso com a natureza, cria um potencial de valorização excepcional.
          </motion.p>
        </motion.div>
        
        {/* Benefícios para Investidores */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-10"
          >
            <h3 className="font-serif text-2xl md:text-3xl text-Heitoraí-dark mb-3">
              Vantagens Exclusivas para Investidores
            </h3>
            
            <div className="flex justify-center">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-1 bg-Heitoraí-light-green rounded-full mb-4"
              />
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Retorno Acima do Mercado",
                description: "Valorização média de propriedades premium na região supera índices tradicionais de investimento",
                icon: <BarChart3 className="h-6 w-6 text-Heitoraí-green" />
              },
              {
                title: "Liquidez Garantida",
                description: "Programa exclusivo de recompra com valorização mínima garantida após período de carência",
                icon: <Wallet className="h-6 w-6 text-Heitoraí-green" />
              },
              {
                title: "Investimento Acessível",
                description: "Entrada a partir de R$499,00 com planos de parcelas personalizados e flexíveis",
                icon: <Percent className="h-6 w-6 text-Heitoraí-green" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-md border border-Heitoraí-light-green/30 shadow-sm"
              >
                <div className="bg-Heitoraí-light-green/20 p-3 rounded-full w-fit mb-4">
                  {item.icon}
                </div>
                <h4 className="font-serif text-xl text-Heitoraí-dark font-medium mb-2">
                  {item.title}
                </h4>
                <p className="text-Heitoraí-dark/70">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Seção do Simulador */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center font-serif text-2xl md:text-3xl text-Heitoraí-dark mb-10"
        >
          Simulador de Investimento
        </motion.h3>
        
        {/* Visualização das Vantagens e Visualização do Crescimento */}
        <div className="mb-12">
          <PropertyGrowthVisualization 
            investmentValue={initialInvestment}
            months={months}
            appreciationRate={appreciationRate}
            maxInvestment={50000}
          />
        </div>
        
        {/* Calculadora lado a lado com Gráfico */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {/* Calculadora */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <InvestmentCalculator 
              initialInvestment={initialInvestment}
              setInitialInvestment={setInitialInvestment}
              months={months}
              setMonths={setMonths}
              appreciationRate={appreciationRate}
              setAppreciationRate={setAppreciationRate}
              propertyValue={propertyValue}
              futureValue={futureValue}
              formatCurrency={formatCurrency}
              roi={roi}
            />
          </motion.div>
          
          {/* Gráfico */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <InvestmentGraphs 
              investmentData={investmentData}
              breakdownData={breakdownData}
              chartConfig={chartConfig}
              formatCurrency={formatCurrency}
              months={months}
            />
          </motion.div>
        </div>
        
        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {statCards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="border border-Heitoraí-light-green/30 h-full bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                      <h4 className="text-3xl font-semibold text-Heitoraí-dark">{card.value}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                    </div>
                    <div className="p-3 bg-Heitoraí-light-green/20 rounded-full">
                      {card.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="font-serif text-2xl md:text-3xl text-Heitoraí-dark mb-6">
              Momento ideal para investir
            </h3>
            
            <p className="text-Heitoraí-dark/80 mb-8">
              O preço atual dos lotes representa uma excelente oportunidade de entrada, com alto potencial de valorização diante da crescente demanda por propriedades exclusivas em ambientes naturais privilegiados em Goiás. Não perca a chance de fazer parte deste empreendimento único com condições especiais para investidores.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary group overflow-hidden relative"
                onClick={shareSimulation}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 2.5C15.55 2.5 14.5 3.55 14.5 5.5C14.5 7.45 15.55 8.5 17.5 8.5C19.45 8.5 20.5 7.45 20.5 5.5C20.5 3.55 19.45 2.5 17.5 2.5ZM16.5 5.5C16.5 4.95 16.95 4.5 17.5 4.5C18.05 4.5 18.5 4.95 18.5 5.5C18.5 6.05 18.05 6.5 17.5 6.5C16.95 6.5 16.5 6.05 16.5 5.5ZM18.5 10.5H16.5C15.67 10.5 15 11.17 15 12V19.5H17V12H18.5V10.5ZM12.5 5.5C10.55 5.5 9 7.05 9 9V10.5H10.5V9C10.5 7.95 11.45 7 12.5 7H13.5V5.5H12.5ZM6.5 5.5H5V7H6.5V10.5H5V12H6.5V19.5H9V12H11.5V10.5H9V9C9 7.05 7.45 5.5 5.5 5.5C5.5 5.5 6.5 5.5 6.5 5.5Z"/>
                  </svg>
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    COMPARTILHAR VIA WHATSAPP
                  </span>
                </div>
                <span className="absolute bottom-0 left-0 w-full h-0 bg-Heitoraí-dark transition-all duration-300 -z-0 group-hover:h-full"></span>
              </motion.button>
              
              <motion.a
                href="https://api.whatsapp.com/send?phone=5562957735044&text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20as%20oportunidades%20de%20investimento%20no%20Condomínio%20Reserva%20Rio%20Uru%20Heitoraí."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary group overflow-hidden relative inline-flex items-center justify-center cursor-pointer"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  FALE COM UM CONSULTOR
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0 bg-Heitoraí-dark transition-all duration-300 -z-0 group-hover:h-full"></span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InvestorSection;
