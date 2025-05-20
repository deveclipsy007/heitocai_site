
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ReferenceLine,
  Label
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, PieChart as PieChartIcon, BarChart2, ArrowUp } from "lucide-react";

interface InvestmentGraphsProps {
  investmentData: any[];
  breakdownData: any[];
  chartConfig: any;
  formatCurrency: (value: number) => string;
  months: number;
}

const InvestmentGraphs = ({
  investmentData,
  breakdownData,
  chartConfig,
  formatCurrency,
  months
}: InvestmentGraphsProps) => {
  // Animation controls for money icons
  const controls = useAnimation();
  const prevMonthsRef = useRef(months);
  const prevDataLengthRef = useRef(investmentData.length);
  
  // Re-trigger animations when data changes
  useEffect(() => {
    const dataChanged = prevDataLengthRef.current !== investmentData.length;
    const monthsChanged = prevMonthsRef.current !== months;
    
    if (dataChanged || monthsChanged) {
      // Animate money icons
      controls.start({
        y: [0, -30],
        opacity: [1, 0],
        transition: { duration: 1, repeat: 2 }
      });
      
      prevMonthsRef.current = months;
      prevDataLengthRef.current = investmentData.length;
    }
  }, [investmentData, months, controls]);
  
  // Calculando dados adicionais para gráfico de barras
  const barChartData = [];
  const yearlyIntervals = Math.ceil(months / 12);
  for (let i = 0; i <= yearlyIntervals; i++) {
    const monthIndex = i * 12;
    if (monthIndex <= months) {
      const monthData = investmentData[Math.min(monthIndex, investmentData.length - 1)];
      barChartData.push({
        name: i === 0 ? 'Início' : `Ano ${i}`,
        valor: monthData.valor,
        investimento: monthData.investimento,
        lucro: monthData.valor - monthData.investimento
      });
    }
  }
  
  // Cores para o gráfico de pizza
  const COLORS = ['#d1d5db', '#16A34A'];
  
  // Animated money icons to display when data changes
  const moneyIcons = [
    { bottom: '40%', left: '30%', delay: 0 },
    { bottom: '50%', left: '50%', delay: 0.2 },
    { bottom: '60%', left: '70%', delay: 0.4 },
    { bottom: '45%', left: '60%', delay: 0.3 },
    { bottom: '55%', left: '40%', delay: 0.1 },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative"
    >
      <Card className="border border-Heitoraí-light-green/30 bg-white/90 backdrop-blur-sm overflow-hidden shadow-md h-full">
        <CardHeader>
          <CardTitle className="text-lg">Análise de Investimento</CardTitle>
          <CardDescription>
            <motion.span
              key={months}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              Projeção financeira em {months} meses
            </motion.span>
          </CardDescription>
          
          <Tabs defaultValue="line" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-2">
              <TabsTrigger value="line" className="text-xs flex gap-1 items-center">
                <TrendingUp className="h-3 w-3" />
                <span>Crescimento</span>
              </TabsTrigger>
              <TabsTrigger value="pie" className="text-xs flex gap-1 items-center">
                <PieChartIcon className="h-3 w-3" />
                <span>Composição</span>
              </TabsTrigger>
              <TabsTrigger value="bar" className="text-xs flex gap-1 items-center">
                <BarChart2 className="h-3 w-3" />
                <span>Comparativo</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="line" className="relative">
              <div className={`w-full aspect-[4/3] md:aspect-video ${chartConfig ? 'chart-container' : ''}`}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={investmentData} 
                    margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="mes" 
                      tick={{ fontSize: 12 }}
                    >
                      <Label value="Meses" position="insideBottom" offset={-15} />
                    </XAxis>
                    <YAxis 
                      tickFormatter={(value) => `R$${value.toLocaleString()}`}
                      width={60} 
                      tick={{ fontSize: 12 }}
                      domain={['dataMin', 'dataMax']}
                    />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend verticalAlign="top" height={36} />
                    <Line 
                      type="monotone" 
                      dataKey="investimento" 
                      name="Investimento Inicial" 
                      strokeDasharray="5 5"
                      stroke="#d1d5db"
                      strokeWidth={2}
                      dot={false}
                      animationDuration={1500}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="valor"
                      name="Valor do Investimento" 
                      stroke="#16A34A" 
                      strokeWidth={2}
                      activeDot={{ r: 6, fill: "#16A34A", stroke: "#fff", strokeWidth: 2 }}
                      animationDuration={2000}
                      isAnimationActive={true}
                    />
                    <ReferenceLine
                      y={investmentData[investmentData.length - 1]?.valor}
                      stroke="#16A34A"
                      strokeDasharray="3 3"
                      strokeWidth={1}
                    >
                      <Label position="right" fontSize={10} fill="#16A34A">
                        Valor Final
                      </Label>
                    </ReferenceLine>
                  </LineChart>
                </ResponsiveContainer>
                
                {/* Animated money icons overlay */}
                {moneyIcons.map((icon, index) => (
                  <motion.div
                    key={`money-icon-${index}`}
                    className="absolute"
                    style={{
                      bottom: icon.bottom,
                      left: icon.left,
                      pointerEvents: 'none'
                    }}
                    animate={controls}
                    initial={{ opacity: 0 }}
                  >
                    <div className="h-6 w-6 bg-Heitoraí-green rounded-full flex items-center justify-center text-white">
                      <ArrowUp className="h-4 w-4" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="pie" className="relative">
              <div className="w-full aspect-[4/3] md:aspect-video overflow-hidden flex items-center justify-center pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={breakdownData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      animationDuration={1500}
                      isAnimationActive={true}
                    >
                      {breakdownData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Value indicator */}
              <motion.div 
                className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md border border-Heitoraí-light-green/30 shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                key={`total-${breakdownData[0]?.value + breakdownData[1]?.value}`}
              >
                <div className="text-[10px] text-Heitoraí-dark/70">Valor Total</div>
                <div className="text-xs font-semibold text-Heitoraí-green">
                  {formatCurrency(breakdownData[0]?.value + breakdownData[1]?.value)}
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="bar" className="relative">
              <div className="w-full aspect-[4/3] md:aspect-video overflow-hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barChartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis 
                      tickFormatter={(value) => `R$${value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`} 
                    />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend verticalAlign="top" height={36} />
                    <Bar 
                      dataKey="lucro" 
                      name="Lucro" 
                      fill="#86EFAC" 
                      stackId="a" 
                      animationDuration={1500}
                      isAnimationActive={true}
                    />
                    <Bar 
                      dataKey="investimento" 
                      name="Investimento Inicial" 
                      fill="#d1d5db" 
                      stackId="a" 
                      animationDuration={1500}
                      isAnimationActive={true}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Animated growth indicator */}
              <motion.div
                className="absolute top-14 right-4 bg-Heitoraí-green/10 px-2 py-1 rounded-full shadow-sm flex items-center gap-1"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                key={`growth-indicator-${barChartData.length}`}
              >
                <TrendingUp className="h-3 w-3 text-Heitoraí-green" />
                <span className="text-xs font-medium text-Heitoraí-green">
                  +{((barChartData[barChartData.length - 1]?.valor / barChartData[0]?.investimento - 1) * 100).toFixed(1)}%
                </span>
              </motion.div>
            </TabsContent>
          </Tabs>
        </CardHeader>
        
        {/* Notas sobre os gráficos com animação */}
        <CardContent className="text-xs text-muted-foreground border-t border-border/30 pt-2">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Esta visualização representa uma projeção baseada nos parâmetros atuais. Consulte nossos especialistas para uma análise personalizada.
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InvestmentGraphs;
