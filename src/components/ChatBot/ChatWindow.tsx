
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { sendMessageToOpenAI } from '@/services/openai';
import { v4 as uuidv4 } from 'uuid';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow = ({ onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! 😊 Que prazer ter você por aqui! Sou o assistente do Reserva Rio Uru. Como posso ajudá-lo hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [isTypingSecondMessage, setIsTypingSecondMessage] = useState(false);
  const [pendingSecondMessage, setPendingSecondMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Inicializar ID da sessão
  useEffect(() => {
    // Verificar se já existe um ID de sessão armazenado
    const existingSessionId = localStorage.getItem('chat_session_id');
    if (existingSessionId) {
      setSessionId(existingSessionId);
    } else {
      // Criar novo ID de sessão
      const newSessionId = uuidv4();
      localStorage.setItem('chat_session_id', newSessionId);
      setSessionId(newSessionId);
    }
  }, []);
  
  // Função para rolar para o final da conversa quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Efeito para processar a segunda mensagem após delay
  useEffect(() => {
    if (pendingSecondMessage && !isLoading && !isTypingSecondMessage) {
      setIsTypingSecondMessage(true);
      
      // Adicionar delay para simular digitação
      const typingDelay = 1500 + Math.random() * 1500; // 1.5 a 3 segundos
      
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: pendingSecondMessage }]);
        setPendingSecondMessage(null);
        setIsTypingSecondMessage(false);
      }, typingDelay);
    }
  }, [pendingSecondMessage, isLoading, isTypingSecondMessage]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Adicionar mensagem do usuário
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Enviar para API do OpenAI com ID da sessão
      const response = await sendMessageToOpenAI([...messages, userMessage], sessionId);
      
      // Adicionar resposta do assistente
      setMessages(prev => [...prev, { role: 'assistant', content: response.content }]);
      
      // Se houver uma segunda mensagem, configurá-la para ser exibida com delay
      if (response.secondMessage) {
        setPendingSecondMessage(response.secondMessage);
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem para OpenAI:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Desculpe, houve um erro. Pode tentar novamente?' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 h-[500px] flex flex-col overflow-hidden border border-gray-200">
      <div className="p-4 bg-Heitoraí-green text-white font-medium flex justify-between items-center">
        <span>Assistente Reserva Rio Uru</span>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'user' 
                    ? 'bg-Heitoraí-green text-white rounded-tr-none' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                <div className="flex items-start gap-2">
                  {msg.role === 'assistant' && (
                    <Bot className="h-5 w-5 mt-1 flex-shrink-0" />
                  )}
                  <div className="text-sm">{msg.content}</div>
                  {msg.role === 'user' && (
                    <User className="h-5 w-5 mt-1 flex-shrink-0" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {(isLoading || isTypingSecondMessage) && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex gap-2">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1"
          disabled={isLoading || isTypingSecondMessage}
        />
        <Button 
          type="submit" 
          size="icon"
          disabled={isLoading || isTypingSecondMessage || !input.trim()} 
          className="bg-Heitoraí-green hover:bg-Heitoraí-dark"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatWindow;
