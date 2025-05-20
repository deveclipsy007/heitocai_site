import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calculator, Download, Sparkles } from "lucide-react";
interface InvestmentCalculatorProps {
  initialInvestment: number;
  setInitialInvestment: (value: number) => void;
  months: number;
  setMonths: (value: number) => void;
  appreciationRate: number;
  setAppreciationRate: (value: number) => void;
  propertyValue: number;
  futureValue: number;
  formatCurrency: (value: number) => string;
  roi: number;
}
const InvestmentCalculator = ({
  initialInvestment,
  setInitialInvestment,
  months,
  setMonths,
  appreciationRate,
  setAppreciationRate,
  propertyValue,
  futureValue,
  formatCurrency,
  roi
}: InvestmentCalculatorProps) => {
  // Animações para indicadores quando valores mudam
  const profitAnimation = useAnimation();
  const roiAnimation = useAnimation();

  // Calcula o lucro estimado
  const profit = futureValue - initialInvestment;

  // Calcula o ROI anualizado
  const annualizedROI = ((1 + appreciationRate / 100) ** 12 - 1) * 100;

  // Valor mensal (caso o investidor queira parcelar)
  const monthlyPayment = initialInvestment / 12;

  // Efeito para disparar animações quando os valores mudam
  useEffect(() => {
    // Anima o indicador de lucro
    profitAnimation.start({
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.5
      }
    });

    // Anima o indicador de ROI
    roiAnimation.start({
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 0.5
      }
    });
  }, [initialInvestment, months, appreciationRate, profitAnimation, roiAnimation]);

  // Função simular download de PDF
  const handleDownloadSimulation = () => {
    const element = document.createElement('a');
    // Normalmente aqui teria uma geração de PDF real, mas para o exemplo apenas criamos um elemento falso
    element.setAttribute('href', '#');
    element.setAttribute('download', 'simulacao_investimento_Heitoraí.pdf');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  return <motion.div initial={{
    opacity: 0,
    scale: 0.95
  }} whileInView={{
    opacity: 1,
    scale: 1
  }} viewport={{
    once: true
  }} transition={{
    duration: 0.8
  }} className="h-full">
      <Card className="border border-Heitoraí-light-green/30 overflow-hidden shadow-lg bg-white/90 backdrop-blur-sm h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <motion.div className="p-2 bg-Heitoraí-light-green/20 rounded-full" whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(134, 239, 172, 0.3)"
          }} whileTap={{
            scale: 0.95
          }}>
              <Calculator className="h-4 w-4 text-Heitoraí-green" />
            </motion.div>
            <div>
              <CardTitle className="text-lg">Calculadora de Investimento</CardTitle>
              <CardDescription>Simule seu retorno financeiro em tempo real</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="investment" className="text-sm">Investimento Inicial</Label>
              <motion.span key={initialInvestment} initial={{
              scale: 0.9,
              opacity: 0.8
            }} animate={{
              scale: 1,
              opacity: 1
            }} transition={{
              duration: 0.3
            }} className="font-medium text-Heitoraí-green">
                {formatCurrency(initialInvestment)}
              </motion.span>
            </div>
            <Slider id="investment" min={499} max={50000} step={100} value={[initialInvestment]} onValueChange={value => setInitialInvestment(value[0])} className="py-4" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Mínimo: R$499</span>
              <span>Máximo: R$50.000</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="months" className="text-sm">Período de Investimento</Label>
              <motion.span key={months} initial={{
              scale: 0.9,
              opacity: 0.8
            }} animate={{
              scale: 1,
              opacity: 1
            }} transition={{
              duration: 0.3
            }} className="font-medium text-Heitoraí-green">
                {months} meses
              </motion.span>
            </div>
            <Slider id="months" min={1} max={120} step={1} value={[months]} onValueChange={value => setMonths(value[0])} className="py-4" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 mês</span>
              <span>10 anos</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="appreciation" className="text-sm">Taxa de Valorização Mensal</Label>
              <motion.span key={appreciationRate} initial={{
              scale: 0.9,
              opacity: 0.8
            }} animate={{
              scale: 1,
              opacity: 1
            }} transition={{
              duration: 0.3
            }} className="font-medium text-Heitoraí-green">
                {appreciationRate}%
              </motion.span>
            </div>
            <Slider id="appreciation" min={0.5} max={5} step={0.1} value={[appreciationRate]} onValueChange={value => setAppreciationRate(value[0])} className="py-4" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0.5%</span>
              <span>5%</span>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border/30 grid grid-cols-2 gap-4">
            <motion.div className="p-3 bg-gradient-to-br from-Heitoraí-light-green/10 to-white rounded-md border border-Heitoraí-light-green/20" whileHover={{
            backgroundColor: "rgba(134, 239, 172, 0.15)"
          }} key={`future-${futureValue.toFixed(0)}`}>
              <div className="text-xs text-muted-foreground">Valor Futuro</div>
              <motion.div className="font-semibold text-lg" animate={{
              scale: [1, 1.05, 1]
            }} transition={{
              duration: 0.5
            }}>
                {formatCurrency(futureValue)}
              </motion.div>
            </motion.div>
            
            <motion.div className="p-3 bg-gradient-to-br from-Heitoraí-light-green/10 to-white rounded-md border border-Heitoraí-light-green/20" animate={profitAnimation} whileHover={{
            backgroundColor: "rgba(134, 239, 172, 0.15)"
          }}>
              <div className="text-xs text-muted-foreground">Lucro Estimado</div>
              <div className="font-semibold text-lg text-green-600 flex items-center">
                {formatCurrency(profit)}
                <motion.div initial={{
                opacity: 0,
                scale: 0
              }} animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }} transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 5
              }} className="ml-2">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div className="p-3 bg-gradient-to-br from-Heitoraí-light-green/10 to-white rounded-md border border-Heitoraí-light-green/20" animate={roiAnimation} whileHover={{
            backgroundColor: "rgba(134, 239, 172, 0.15)"
          }}>
              <div className="text-xs text-muted-foreground">ROI do Período</div>
              <div className="font-semibold text-lg flex items-center gap-1">
                {roi.toFixed(1)}%
                <TrendingUp className="h-3 w-3 text-Heitoraí-green" />
              </div>
            </motion.div>
            
            <motion.div className="p-3 bg-gradient-to-br from-Heitoraí-light-green/10 to-white rounded-md border border-Heitoraí-light-green/20" whileHover={{
            backgroundColor: "rgba(134, 239, 172, 0.15)"
          }}>
              <div className="text-xs text-muted-foreground">ROI Anualizado</div>
              <div className="font-semibold text-lg">{annualizedROI.toFixed(1)}%/ano</div>
            </motion.div>
          </div>
          
          <div className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 border-t border-border/30 mt-4">
            <div className="flex justify-between mb-3 items-center">
              <div>
                <div className="text-xs text-muted-foreground">Investimento Mensal</div>
                <div className="font-medium">{formatCurrency(monthlyPayment)}<span className="text-xs text-muted-foreground">/mês</span></div>
              </div>
              
              
            </div>
            
            <motion.div initial={{
            width: 0
          }} animate={{
            width: `${Math.min(100, roi)}%`
          }} key={`roi-bar-${roi.toFixed(0)}`} transition={{
            duration: 1
          }} style={{
            maxWidth: '100%'
          }} className="h-2 bg-gradient-to-r from-Heitoraí-light-green to-Heitoraí-green rounded-full overflow-hidden" />
          </div>
        </CardContent>
      </Card>
    </motion.div>;
};
export default InvestmentCalculator;