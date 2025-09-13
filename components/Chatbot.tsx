import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToGeminiStream } from '../services/geminiService';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: "Hello! I'm an AI assistant for Alessandro Linzi. Feel free to ask me any questions about his professional profile." },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = useCallback(async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setMessages(prev => [...prev, { sender: 'ai', text: '' }]);

    try {
      const stream = await sendMessageToGeminiStream(input);
      let text = '';
      for await (const chunk of stream) {
        text += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { sender: 'ai', text: text };
          return newMessages;
        });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { sender: 'ai', text: 'Sorry, I encountered an error. Please try again.' };
          return newMessages;
        });
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  return (
    <div className="flex flex-col min-h-[70vh] bg-secondary rounded-lg shadow-2xl animate-fade-in">
      <div className="p-4 border-b border-accent">
        <h2 className="text-xl font-bold text-center text-highlight">AI Assistant</h2>
        <p className="text-center text-sm text-light">Ask me about Alessandro's experience, skills, or publications.</p>
      </div>
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-highlight text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                AL
              </div>
            )}
            <div
              className={`max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-accent text-white rounded-br-none'
                  : 'bg-primary text-super-light rounded-bl-none'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text || '...'}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-accent">
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="E.g., What has he published?"
            className="flex-grow bg-primary border border-accent rounded-full py-2 px-4 text-super-light focus:outline-none focus:ring-2 focus:ring-highlight"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-highlight text-primary font-bold rounded-full w-10 h-10 flex items-center justify-center transition-transform duration-200 hover:scale-110 disabled:bg-light disabled:cursor-not-allowed disabled:scale-100"
            aria-label="Send message"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
