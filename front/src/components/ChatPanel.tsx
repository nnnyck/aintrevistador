'use client';

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send } from "lucide-react";
import { Card } from "./ui/card";

// Define o formato da mensagem
interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// !! IMPORTANTE !!
// Atualize esta URL para o seu endpoint real do Gemini
const GEMINI_API_ENDPOINT = '/api/chat'; 

export function ChatPanel() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: message };
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      // 1. Envie a mensagem do usuário para o seu backend
      const response = await fetch(GEMINI_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message }), // Envie o texto
      });

      if (!response.ok) {
        throw new Error('Falha na rede ou erro do servidor');
      }

      const data = await response.json();

      // 2. Receba a resposta do Gemini
      const modelMessage: ChatMessage = { 
        role: 'model', 
        text: data.responseText // Ajuste isso se o seu backend retornar um formato diferente
      };
      
      setChatHistory((prev) => [...prev, modelMessage]);

    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage: ChatMessage = {
        role: 'model',
        text: 'Desculpe, não consegui processar sua mensagem.'
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full h-full flex flex-col bg-gray-800 border-gray-700 text-white">
      {/* 1. Área de Histórico de Chat */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {chatHistory.length === 0 && (
          <div className="text-center text-gray-400 h-full flex items-center justify-center">
            Envie uma mensagem para começar.
          </div>
        )}
        
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-200'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-gray-700 text-gray-200 rounded-lg px-4 py-2">
               Digitando...
             </div>
          </div>
        )}
      </div>

      {/* 2. Área de Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-grow"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
}