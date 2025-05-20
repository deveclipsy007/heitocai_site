import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, ArrowUp, BarChart3, Wallet, PiggyBank, Percent, ChartBar, Home, Trees, Shield, DollarSign, Building, Award, Clock, Map, BadgePercent, Landmark } from 'lucide-react';
interface PropertyGrowthVisualizationProps {
  investmentValue: number;
  months: number;
  appreciationRate: number;
  maxInvestment: number;
}
const PropertyGrowthVisualization = ({
  investmentValue,
  months,
  appreciationRate,
  maxInvestment
}: PropertyGrowthVisualizationProps) => {
  const controls = useAnimation();
  const [progressLevel, setProgressLevel] = useState(1);

  // Calculate the progress factor based on investment and months
  useEffect(() => {
    // Combine investment amount, months and appreciation rate to determine growth level
    const investmentFactor = investmentValue / maxInvestment;
    const monthsFactor = Math.min(months / 60, 1); // Cap at 5 years (60 months)
    const appreciationFactor = appreciationRate / 5; // Assuming max is 5%

    // Combined weighted factor
    const combinedFactor = investmentFactor * 0.5 + monthsFactor * 0.3 + appreciationFactor * 0.2;

    // Determine progress level (1-5)
    const newLevel = Math.max(1, Math.min(5, Math.round(combinedFactor * 5)));
    setProgressLevel(newLevel);
    controls.start({
      scale: 1 + combinedFactor * 0.15,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeInOut"
      }
    });
  }, [investmentValue, months, appreciationRate, maxInvestment, controls]);

  // Calculate ROI and valuation metrics for display
  const annualizedROI = ((1 + appreciationRate / 100) ** 12 - 1) * 100;
  const totalValuation = investmentValue * (Math.pow(1 + appreciationRate / 100, months) - 1);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: value < 1000 ? 2 : 0
    }).format(value);
  };

  // Calculate future value for different time periods
  const calculateFutureValue = (months: number) => {
    return investmentValue * Math.pow(1 + appreciationRate / 100, months);
  };

  // Calculate market comparisons (percentages)
  const investmentReturn = (calculateFutureValue(months) / investmentValue - 1) * 100;
  const traditionalInvestmentReturn = months * 0.6; // Simplified model: 0.6% monthly
  const savingsReturn = months * 0.3; // Simplified model: 0.3% monthly

  // Lista ampliada de vantagens de investir no Rio Uru
  const advantages = [{
    icon: <Home className="h-6 w-6 text-Heitoraí-green" />,
    title: "Localização Privilegiada",
    description: "Área com potencial de valorização superior devido à proximidade com recursos naturais e desenvolvimento planejado.",
    highlight: `+${Math.round(appreciationRate * 1.5)}% ao ano`
  }, {
    icon: <Trees className="h-6 w-6 text-Heitoraí-green" />,
    title: "Sustentabilidade Ambiental",
    description: "Investimento em um empreendimento que preserva o meio ambiente, garantindo valor a longo prazo.",
    highlight: "Preservação garantida"
  }, {
    icon: <Shield className="h-6 w-6 text-Heitoraí-green" />,
    title: "Segurança Patrimonial",
    description: "Propriedade com documentação e garantias jurídicas completas para proteção do seu investimento.",
    highlight: "100% seguro"
  }, {
    icon: <ChartBar className="h-6 w-6 text-Heitoraí-green" />,
    title: "Retorno Superior",
    description: "Desempenho histórico do empreendimento supera outros tipos de investimentos tradicionais.",
    highlight: `${annualizedROI.toFixed(1)}% ao ano`
  }, {
    icon: <Building className="h-6 w-6 text-Heitoraí-green" />,
    title: "Infraestrutura Completa",
    description: "Empreendimento com toda infraestrutura necessária, elevando o padrão e valor dos lotes.",
    highlight: "Valor agregado"
  }, {
    icon: <Map className="h-6 w-6 text-Heitoraí-green" />,
    title: "Área em Expansão",
    description: "Região com crescimento acelerado e investimentos públicos e privados previstos.",
    highlight: "Alto potencial"
  }, {
    icon: <DollarSign className="h-6 w-6 text-Heitoraí-green" />,
    title: "Liquidez Garantida",
    description: "Facilidade de revenda com programa de recompra após período de carência.",
    highlight: "Baixo risco"
  }, {
    icon: <BadgePercent className="h-6 w-6 text-Heitoraí-green" />,
    title: "Condições Flexíveis",
    description: "Opções de entrada e parcelamento que facilitam o acesso ao investimento.",
    highlight: "Acessível"
  }, {
    icon: <Landmark className="h-6 w-6 text-Heitoraí-green" />,
    title: "Valorização Histórica",
    description: "Região com histórico comprovado de valorização imobiliária acima da média do mercado.",
    highlight: `+${Math.round(appreciationRate * 2)}% ao ano`
  }, {
    icon: <Award className="h-6 w-6 text-Heitoraí-green" />,
    title: "Exclusividade",
    description: "Número limitado de lotes disponíveis, criando escassez e impulsionando a valorização.",
    highlight: "Alta demanda"
  }, {
    icon: <Clock className="h-6 w-6 text-Heitoraí-green" />,
    title: "Timing Ideal",
    description: "Momento perfeito para investir antes da valorização prevista com a conclusão das obras.",
    highlight: "Oportunidade única"
  }];
  return <motion.div initial={{
    opacity: 0,
    scale: 0.95
  }} whileInView={{
    opacity: 1,
    scale: 1
  }} transition={{
    duration: 0.5
  }}>
      <Card className="border border-Heitoraí-light-green/30 bg-white/90 backdrop-blur-sm overflow-hidden shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <BarChart3 className="h-5 w-5 text-Heitoraí-green" />
            Vantagens de Investir no Rio Uru
          </CardTitle>
          <CardDescription>
            Conheça os diferenciais que tornam este investimento uma oportunidade única
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-0">
            {/* Vantagens de Investir - 4/7 colunas */}
            <div className="col-span-1 lg:col-span-4 p-4">
              <div className="relative h-auto md:h-auto bg-gradient-to-b from-white to-Heitoraí-light-green/10 rounded-md overflow-hidden border border-Heitoraí-light-green/20 p-4">
                {/* Título principal */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-Heitoraí-dark">Benefícios do Investimento</h3>
                  <p className="text-xs text-Heitoraí-dark/70">
                    Descubra por que o Condomínio Reserva Rio Uru é uma escolha inteligente
                  </p>
                </div>
                
                {/* Grid de vantagens com animações */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
                  {advantages.map((advantage, index) => <motion.div key={`advantage-${index}`} initial={{
                  opacity: 0,
                  x: -20
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  duration: 0.5,
                  delay: 0.1 * index
                }} className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-2 rounded-md border border-Heitoraí-light-green/20 hover:shadow-md hover:bg-white/90 transition-all duration-300">
                      <motion.div className="p-2 bg-Heitoraí-light-green/20 rounded-full flex-shrink-0" whileHover={{
                    scale: 1.1
                  }} whileTap={{
                    scale: 0.9
                  }}>
                        {advantage.icon}
                      </motion.div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-medium text-Heitoraí-dark">{advantage.title}</h4>
                          <motion.div initial={{
                        opacity: 0,
                        scale: 0.8
                      }} animate={{
                        opacity: 1,
                        scale: 1
                      }} transition={{
                        delay: 0.3 + 0.1 * index,
                        duration: 0.3
                      }} className="bg-Heitoraí-green/10 px-2 py-0.5 rounded-full">
                            <span className="text-xs font-semibold text-Heitoraí-green">
                              {advantage.highlight}
                            </span>
                          </motion.div>
                        </div>
                        <p className="text-xs text-Heitoraí-dark/70 mt-1">{advantage.description}</p>
                      </div>
                    </motion.div>)}
                </div>
                
                {/* Indicador de valorização */}
                <motion.div initial={{
                opacity: 0,
                scale: 0.8
              }} animate={controls} className="absolute bottom-2 right-2">
                  
                </motion.div>
              </div>
            </div>
            
            {/* Métricas e Números - 3/7 colunas */}
            <div className="col-span-1 lg:col-span-3 bg-gradient-to-br from-Heitoraí-light-green/10 to-white p-4">
              <div className="space-y-4">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-Heitoraí-dark mb-1">Projeção de Valorização</h4>
                  <p className="text-xs text-Heitoraí-dark/70">
                    Baseada em {months} meses de investimento a {appreciationRate}% ao mês
                  </p>
                </div>
                
                {/* Métricas Principais */}
                
                
                {/* Dados Adicionais */}
                <div className="bg-white/60 backdrop-blur-sm border border-Heitoraí-light-green/20 rounded-md p-3">
                  <div className="text-xs font-medium text-Heitoraí-dark mb-2 flex items-center gap-1">
                    <PiggyBank className="h-3 w-3 text-Heitoraí-green" />
                    <span>Comparativo de Oportunidade</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-Heitoraí-dark/70">Reserva Rio Uru</span>
                      <div className="flex-1 mx-2 h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div initial={{
                        width: 0
                      }} animate={{
                        width: `${Math.min(100, investmentReturn)}%`
                      }} transition={{
                        duration: 1,
                        delay: 0.5
                      }} className="h-full bg-Heitoraí-green" />
                      </div>
                      <span className="font-semibold text-Heitoraí-dark">{investmentReturn.toFixed(1)}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-Heitoraí-dark/70">Imóveis Urbanos</span>
                      <div className="flex-1 mx-2 h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div initial={{
                        width: 0
                      }} animate={{
                        width: `${Math.min(100, traditionalInvestmentReturn)}%`
                      }} transition={{
                        duration: 1,
                        delay: 0.6
                      }} className="h-full bg-gray-400" />
                      </div>
                      <span className="font-semibold text-Heitoraí-dark">{traditionalInvestmentReturn.toFixed(1)}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-Heitoraí-dark/70">Poupança</span>
                      <div className="flex-1 mx-2 h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div initial={{
                        width: 0
                      }} animate={{
                        width: `${Math.min(100, savingsReturn)}%`
                      }} transition={{
                        duration: 1,
                        delay: 0.7
                      }} className="h-full bg-gray-300" />
                      </div>
                      <span className="font-semibold text-Heitoraí-dark">{savingsReturn.toFixed(1)}%</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-2 border-t border-Heitoraí-light-green/10 flex justify-between items-center">
                    <div className="text-[10px] text-Heitoraí-dark/70">Rendimento mensal</div>
                    <div className="flex items-center gap-1 bg-Heitoraí-light-green/20 px-2 py-0.5 rounded-full">
                      <Percent className="h-3 w-3 text-Heitoraí-green" />
                      <span className="text-[10px] font-medium text-Heitoraí-green">{appreciationRate.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm border border-Heitoraí-light-green/20 rounded-md p-3">
                  <div className="text-xs text-Heitoraí-dark/70 mb-1">Valor Futuro Projetado</div>
                  <motion.div key={`${investmentValue}-${months}-${appreciationRate}`} initial={{
                  opacity: 0.5,
                  y: 10
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.5
                }} className="text-xl font-semibold text-Heitoraí-green">
                    {formatCurrency(calculateFutureValue(months))}
                  </motion.div>
                  <div className="flex justify-between mt-2 text-[10px] text-Heitoraí-dark/60">
                    <span>Investimento inicial: {formatCurrency(investmentValue)}</span>
                    <span>Após {months} meses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>;
};
export default PropertyGrowthVisualization;