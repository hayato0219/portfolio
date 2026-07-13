'use client';

import React, { useState, useRef, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';
import type { Translations, SiteProps } from '@/types';

interface ChatbotProps {
  t: Translations;
  siteProps: SiteProps;
}

interface Message {
  type: 'user' | 'bot';
  text: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ t, siteProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ type: 'bot', text: t.chatbotWelcome }]);
    }
  }, [isOpen, t.chatbotWelcome, messages.length]);

  // Focus management: focus input on open, return focus to the launcher on close.
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      wasOpenRef.current = true;
    } else if (wasOpenRef.current) {
      fabRef.current?.focus();
      wasOpenRef.current = false;
    }
  }, [isOpen]);

  // Esc closes the window.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const resetConversation = () => {
    setMessages([{ type: 'bot', text: t.chatbotWelcome }]);
    setInputValue('');
    inputRef.current?.focus();
  };

  // Build a portfolio context string for the model.
  const buildSystemPrompt = () => {
    let context = `Portfolio Information about ${siteProps.name}:\n\n`;
    context += `About: ${t.aboutDescription}\n\n`;
    context += `Skills: ${t.skills.join(', ')}\n\n`;
    context += `Tools: ${t.toolsList.join(', ')}\n\n`;
    context += `Experience:\n`;
    t.experienceList.forEach((yearData) => {
      context += `${yearData.year}:\n`;
      yearData.items.forEach((item) => {
        context += `- ${item.title}: ${item.description}\n`;
        if (item.technologies)
          context += `  Technologies: ${item.technologies.join(', ')}\n`;
        if (item.tags) context += `  ${item.tags}\n`;
      });
    });
    context += `\nContact: Email: ${siteProps.socials.email}, GitHub: github.com/${siteProps.socials.gitHub}\n`;

    return `You are ${siteProps.name}. **Always use Markdown (headings, bold, bullet points) to format your response for clarity.** Answer questions about their skills, experience, projects, and background based on the following information. Keep answers concise and friendly. Respond in the same language as the question.\n\n${context}`;
  };

  const errorMessage = (status: number): string => {
    if (status === 503)
      return '⚠️ チャット機能は現在利用できません。少し時間をおいてお試しください。';
    if (status === 429)
      return '⚠️ リクエストが混み合っています。少し時間をおいてから再度お試しください。';
    return '❌ エラーが発生しました。もう一度お試しください。';
  };

  const generateResponse = async (question: string): Promise<string> => {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemPrompt: buildSystemPrompt(), question }),
      });

      if (!res.ok) return errorMessage(res.status);

      const data = await res.json();
      return data.text ?? errorMessage(502);
    } catch {
      return '🌐 ネットワークエラーです。インターネット接続を確認してください。';
    }
  };

  const sendMessage = async (text: string) => {
    const question = text.trim();
    if (!question || isTyping) return;

    setMessages((prev) => [...prev, { type: 'user', text: question }]);
    setInputValue('');
    setIsTyping(true);

    const botResponse = await generateResponse(question);
    setMessages((prev) => [...prev, { type: 'bot', text: botResponse }]);
    setIsTyping(false);
  };

  const handleSend = () => sendMessage(inputValue);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        ref={fabRef}
        type="button"
        className="chat-fab"
        aria-label={t.chatbotTitle}
        onClick={() => setIsOpen(true)}
      >
        💬
      </button>
    );
  }

  const showSuggestions =
    messages.length <= 1 && !isTyping && !!t.chatbotSuggestions?.length;

  return (
    <div
      className="chat-window"
      role="dialog"
      aria-label={t.chatbotTitle}
    >
      <div className="chat-header">
        <h3>{t.chatbotTitle}</h3>
        <div className="chat-header__actions">
          {messages.length > 1 && (
            <button
              type="button"
              className="chat-header__btn"
              aria-label={t.chatbotReset || 'Reset'}
              title={t.chatbotReset}
              onClick={resetConversation}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
          )}
          <button
            type="button"
            className="chat-header__btn"
            aria-label="Close chat"
            onClick={() => setIsOpen(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-row chat-row--${msg.type}`}>
            <div className={`chat-bubble chat-bubble--${msg.type}`}>
              <div className="chat-md">
                <Markdown
                  options={{
                    overrides: {
                      a: { props: { target: '_blank', rel: 'noopener noreferrer' } },
                    },
                  }}
                >
                  {msg.text}
                </Markdown>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-row chat-row--bot">
            <div className="chat-bubble chat-bubble--bot">
              <span className="chat-typing" aria-label="typing">
                <span />
                <span />
                <span />
              </span>
            </div>
          </div>
        )}

        {showSuggestions && (
          <div className="chat-suggestions">
            {t.chatbotSuggestions!.map((s) => (
              <button
                key={s}
                type="button"
                className="chat-suggestion"
                onClick={() => sendMessage(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.chatbotPlaceholder}
          aria-label={t.chatbotPlaceholder}
        />
        <button
          type="button"
          className="chat-send"
          aria-label={t.chatbotSend}
          onClick={handleSend}
          disabled={isTyping || inputValue.trim() === ''}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
