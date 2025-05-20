import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trophy, MapPin, Shield, Heart, Diamond, BadgeDollarSign } from "lucide-react";
export function TimelineDemo() {
  const data = [{
    title: "Localização Privilegiada",
    icon: <MapPin className="h-6 w-6 text-Heitoraí-green" />,
    content: <div className="w-full">
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            O Condomínio Reserva Rio Uru Heitoraí está estrategicamente localizado em uma das regiões mais promissoras de Goiás, 
            com fácil acesso às principais vias e a apenas alguns minutos dos principais centros urbanos, combinando tranquilidade 
            e conveniência.
          </p>
          <div className="grid grid-cols-2 gap-4 w-full">
            <Card className="rounded-lg overflow-hidden h-20 md:h-44 lg:h-60 w-full shadow-lg">
              <img alt="Vista panorâmica do empreendimento" className="h-full w-full object-cover" src="https://cnkcoxooaetehlufjwbr.supabase.co/storage/v1/object/public/avatars//ChatGPT%20Image%207%20de%20mai.%20de%202025,%2020_28_04.png" />
            </Card>
            <Card className="rounded-lg overflow-hidden h-20 md:h-44 lg:h-60 w-full shadow-lg">
              <img src="https://cnkcoxooaetehlufjwbr.supabase.co/storage/v1/object/public/avatars//bg_site%202.png" alt="Localização aérea" className="h-full w-full object-cover" />
            </Card>
          </div>
        </div>
  }, {
    title: "Infraestrutura Premium",
    icon: <Trophy className="h-6 w-6 text-Heitoraí-green" />,
    content: <div className="w-full">
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Todos os detalhes foram pensados para oferecer o máximo de conforto e sofisticação. Desde a infraestrutura 
            completa de água, energia e saneamento até os espaços de lazer exclusivos, cada elemento foi projetado para 
            proporcionar uma experiência de vida superior.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            <Card className="rounded-lg overflow-hidden p-6 h-28 md:h-44 w-full shadow-lg bg-Heitoraí-light-green/20 flex flex-col items-center justify-center">
              <Shield className="h-8 w-8 text-Heitoraí-green mb-2" />
              <p className="text-Heitoraí-dark font-medium text-center">Segurança 24h</p>
            </Card>
            <Card className="rounded-lg overflow-hidden p-6 h-28 md:h-44 w-full shadow-lg bg-Heitoraí-light-green/20 flex flex-col items-center justify-center">
              <BadgeDollarSign className="h-8 w-8 text-Heitoraí-green mb-2" />
              <p className="text-Heitoraí-dark font-medium text-center">Clube exclusivo</p>
            </Card>
            <Card className="rounded-lg overflow-hidden p-6 h-28 md:h-44 w-full shadow-lg bg-Heitoraí-light-green/20 flex flex-col items-center justify-center">
              <Diamond className="h-8 w-8 text-Heitoraí-green mb-2" />
              <p className="text-Heitoraí-dark font-medium text-center">Áreas de lazer</p>
            </Card>
          </div>
        </div>
  }, {
    title: "Sustentabilidade",
    icon: <Heart className="h-6 w-6 text-Heitoraí-green" />,
    content: <div className="w-full">
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            O Heitoraí foi projetado para harmonizar desenvolvimento e preservação ambiental, criando um legado sustentável:
          </p>
          <div className="mb-8 px-2">
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm my-2"> - Preservação de 60% da área verde nativa</div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm my-2"> - Aproveitamento da topografia natural do terreno</div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm my-2"> - Sistema de captação e reuso de águas pluviais</div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm my-2"> - Iluminação de baixo consumo em todas as áreas comuns</div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm my-2"> - Estação de tratamento de esgoto ecológica</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <Card className="rounded-lg overflow-hidden h-24 md:h-44 lg:h-60 w-full shadow-lg bg-Heitoraí-beige/30 flex items-center justify-center">
              <div className="text-center p-4">
                <h4 className="text-Heitoraí-dark font-bold text-lg md:text-xl mb-2">+60%</h4>
                <p className="text-Heitoraí-dark font-medium">de área verde preservada</p>
              </div>
            </Card>
            <Card className="rounded-lg overflow-hidden h-24 md:h-44 lg:h-60 w-full shadow-lg bg-Heitoraí-blue/20 flex items-center justify-center">
              <div className="text-center p-4">
                <h4 className="text-Heitoraí-dark font-bold text-lg md:text-xl mb-2">Harmonia</h4>
                <p className="text-Heitoraí-dark font-medium">com o Rio Uru</p>
              </div>
            </Card>
          </div>
        </div>
  }, {
    title: "Investimento Inteligente",
    icon: <BadgeDollarSign className="h-6 w-6 text-Heitoraí-green" />,
    content: <div className="w-full">
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            O Condomínio Reserva Rio Uru Heitoraí representa uma oportunidade única de investimento em um empreendimento 
            exclusivo em uma região de forte valorização. Com demanda crescente por imóveis de alto padrão em ambientes naturais 
            e proximidade às principais cidades de Goiás, seu investimento tem alto potencial de valorização.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <Card className="rounded-lg overflow-hidden p-6 h-32 md:h-44 w-full shadow-lg bg-Heitoraí-green/10 flex flex-col items-center justify-center">
              <h4 className="text-Heitoraí-dark font-bold text-2xl md:text-3xl mb-1">12%</h4>
              <p className="text-Heitoraí-dark font-medium text-center">Valorização anual média esperada</p>
            </Card>
            <Card className="rounded-lg overflow-hidden p-6 h-32 md:h-44 w-full shadow-lg bg-Heitoraí-green/10 flex flex-col items-center justify-center">
              <h4 className="text-Heitoraí-dark font-bold text-2xl md:text-3xl mb-1">+40%</h4>
              <p className="text-Heitoraí-dark font-medium text-center">Acima da média de mercado</p>
            </Card>
          </div>
        </div>
  }];
  return <div className="w-full bg-white">
      <div className="w-full">
        <Timeline data={data} />
      </div>
    </div>;
}