
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
if (!openaiApiKey) {
  throw new Error("OPENAI_API_KEY environment variable is not set");
}

// Criar cliente Supabase para armazenar os leads
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://hvmwzgizwpzybkmqzdfc.supabase.co";
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2bXd6Z2l6d3B6eWJrbXF6ZGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2NDk1ODAsImV4cCI6MjA2MjIyNTU4MH0.A9bYIG4-w9RJsgw9eGtU54uzuwNHOjYi2p8DHR1tTKg";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Função para extrair nome e telefone das mensagens
const extractContactInfo = (messages) => {
  const text = messages.map(msg => msg.content).join(" ");
  
  // Padrões para identificar nome
  const namePattern = /(?:me\s+chamo|meu\s+nome\s+[ée]|sou\s+o|sou\s+a)\s+([A-Za-zÀ-ÖØ-öø-ÿ\s]{2,30})/i;
  // Padrões para telefone brasileiro (com ou sem DDD)
  const phonePattern = /(?:\(?\d{2}\)?\s*)?9?\d{4}[-\s]?\d{4}/g;
  
  let nome = null;
  const nameMatch = text.match(namePattern);
  if (nameMatch && nameMatch[1]) {
    nome = nameMatch[1].trim();
  }
  
  let telefone = null;
  const phoneMatch = text.match(phonePattern);
  if (phoneMatch) {
    telefone = phoneMatch[0].replace(/\D/g, '');
    // Garantir formato com DDD
    if (telefone.length === 8 || telefone.length === 9) {
      telefone = "11" + telefone; // Assume DDD 11 se não fornecido
    }
  }
  
  return { nome, telefone };
};

// Calcular nível de interesse com base nas mensagens
const calculateInterestLevel = (messages) => {
  const messageText = messages.map(msg => msg.content.toLowerCase()).join(" ");
  
  // Palavras-chave que indicam alto interesse
  const highInterestKeywords = ["comprar", "investir", "visitar", "quando posso ver", "marcar visita", 
    "valor", "preço", "condições", "financiamento", "pronto para", "interessado"];
    
  // Palavras-chave que indicam interesse médio
  const mediumInterestKeywords = ["gostaria de saber", "informações", "detalhes", "área de lazer", 
    "segurança", "mais sobre", "plantas", "tamanho", "metragem"];
  
  const highInterestCount = highInterestKeywords.filter(word => messageText.includes(word)).length;
  const mediumInterestCount = mediumInterestKeywords.filter(word => messageText.includes(word)).length;
  
  if (highInterestCount >= 2) return "alto";
  if (highInterestCount >= 1 || mediumInterestCount >= 2) return "médio";
  return "baixo";
};

// Função para dividir mensagens longas em duas
const splitIntoTwoMessages = (message) => {
  // Não dividir mensagens curtas
  if (message.length < 100) return [message];
  
  // Encontrar um bom ponto para dividir (final de frase)
  const sentences = message.match(/[^.!?]+[.!?]+/g) || [message];
  
  if (sentences.length <= 1) return [message];
  
  // Calcular um ponto próximo ao meio
  const midpoint = Math.floor(sentences.length / 2);
  
  const firstHalf = sentences.slice(0, midpoint).join('');
  const secondHalf = sentences.slice(midpoint).join('');
  
  return [firstHalf.trim(), secondHalf.trim()];
};

// Função para encurtar mensagens muito longas
const shortenMessage = (message) => {
  const MAX_LENGTH = 250;
  
  if (message.length <= MAX_LENGTH) return message;
  
  // Tentar manter frases completas
  const sentences = message.match(/[^.!?]+[.!?]+/g) || [message];
  
  let shortened = "";
  for (const sentence of sentences) {
    if ((shortened + sentence).length <= MAX_LENGTH) {
      shortened += sentence;
    } else {
      break;
    }
  }
  
  return shortened.length > 0 ? shortened : message.substring(0, MAX_LENGTH) + "...";
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, sessionId } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      throw new Error("Messages array is required");
    }

    // Checar se já temos informações de contato
    const contactInfo = extractContactInfo(messages);
    
    // Determinar nível de interesse
    const interestLevel = calculateInterestLevel(messages);

    // Add system message with context about the condominium
    const conversationWithContext = [
      { 
        role: 'system', 
        content: `Você é um assistente virtual carismático e amigável para o Condomínio Reserva Rio Uru.
        
        Seu estilo de comunicação é:
        - Extremamente simpático e cativante
        - Usa linguagem leve e descontraída (mas ainda profissional)
        - Faz perguntas sutis para obter informações
        - É animado e entusiasta sobre o empreendimento
        - Usa emojis ocasionalmente para criar conexão 😊
        - IMPORTANTE: Responde com frases CURTAS e diretas, sem textos longos
        - Ocasionalmente, divide respostas em duas mensagens para parecer mais humano
        
        Informações sobre o Reserva Rio Uru:
        - Condomínio fechado de alto padrão próximo ao Rio Uru
        - Infraestrutura completa de lazer e segurança
        - Contato privilegiado com a natureza
        - Excelente investimento com valorização prevista
        - Desenvolvido pela 4B Empreendimentos, conhecida por qualidade e confiabilidade
        
        Seus objetivos são:
        1. Despertar interesse pelo empreendimento
        2. Coletar SUTILMENTE nome e telefone da pessoa (pergunte de forma natural e amigável)
        3. Construir um relacionamento e não ser invasivo
        
        Quando a pessoa demonstrar interesse forte, sugira:
        "Adoraria que um de nossos consultores entrasse em contato! Poderia me dizer seu nome e telefone com DDD?"
        
        Se a pessoa já compartilhou nome e telefone, agradeça e diga:
        "Obrigado pelas informações! Logo alguém entrará em contato com você. Tem mais alguma pergunta?"
        
        Responda sempre em português do Brasil de forma calorosa e envolvente.`
      },
      ...messages
    ];

    // Salvar informações e mensagens no banco se temos dados de contato
    if (contactInfo.nome || contactInfo.telefone) {
      try {
        // Verificar se já existe um lead com esse telefone ou sessionId
        let leadId = null;
        
        if (contactInfo.telefone) {
          const { data: existingLead } = await supabase
            .from('leads')
            .select('id, mensagens')
            .eq('telefone', contactInfo.telefone)
            .maybeSingle();
          
          if (existingLead) {
            leadId = existingLead.id;
            // Atualizar lead existente
            await supabase
              .from('leads')
              .update({
                nome: contactInfo.nome || existingLead.nome,
                mensagens: messages,
                nivel_interesse: interestLevel,
                updated_at: new Date().toISOString()
              })
              .eq('id', leadId);
          }
        }
        
        // Se não encontramos por telefone, criar novo lead
        if (!leadId) {
          const { data, error } = await supabase
            .from('leads')
            .insert({
              nome: contactInfo.nome,
              telefone: contactInfo.telefone,
              mensagens: messages,
              nivel_interesse: interestLevel
            })
            .select();
          
          if (error) {
            console.error("Erro ao salvar lead:", error);
          } else {
            console.log("Novo lead criado:", data);
          }
        }
      } catch (dbError) {
        console.error("Erro no banco de dados:", dbError);
        // Continuar com a conversa mesmo se houver erro no banco
      }
    }

    // Make the API request to OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: conversationWithContext,
        temperature: 0.8, // Ligeiramente mais criativo
        max_tokens: 300, // Limitar tamanho das respostas
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      throw new Error(`OpenAI API error: ${error.error?.message || "Unknown error"}`);
    }

    const data = await response.json();
    let responseText = data.choices[0].message.content;
    
    // Encurtar a resposta se for muito longa
    responseText = shortenMessage(responseText);
    
    // Decidir se vamos dividir em duas mensagens
    // 30% de chance de dividir a mensagem se for longa o suficiente
    const shouldSplit = responseText.length > 80 && Math.random() < 0.3;
    
    const responseMessages = shouldSplit ? 
      splitIntoTwoMessages(responseText) : 
      [responseText];
    
    // Retornar a primeira parte ou a mensagem completa se não for dividida
    const responseData = {
      content: responseMessages[0],
      role: 'assistant',
      // Incluir a segunda parte se existir
      secondMessage: responseMessages.length > 1 ? responseMessages[1] : null
    };
    
    return new Response(JSON.stringify(responseData), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error in OpenAI function:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to process request",
        content: "Desculpe, ocorreu um erro. Pode tentar novamente?",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
