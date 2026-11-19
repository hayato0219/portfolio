'use client';

import React, { useState, useRef, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';
import type { Translations } from '@/types';
import { Chat, Close, Reset, Send } from './icons';

interface ChatbotProps {
  t: Translations;
  language: 'en' | 'ja';
}

/** Must match MAX_QUESTION_LENGTH in src/app/api/chat/route.ts. */
const MAX_QUESTION_LENGTH = 500;

interface Message {
  type: 'user' | 'bot';
  text: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ t, language }) => {
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
        body: JSON.stringify({ question, language }),
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
        <Chat />
        <span className="chat-fab__label">{t.chatbotLauncher}</span>
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
              <Reset />
            </button>
          )}
          <button
            type="button"
            className="chat-header__btn"
            aria-label={t.chatbotClose}
            onClick={() => setIsOpen(false)}
          >
            <Close />
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
                    // Model output is untrusted: never turn embedded HTML into DOM.
                    disableParsingRawHTML: true,
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
          maxLength={MAX_QUESTION_LENGTH}
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
          <Send />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
