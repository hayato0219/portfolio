'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { Translations } from '@/types';
import { MAX_QUESTION_LENGTH, type ChatState } from '@/hooks/useChat';
import ChatMarkdown from './ChatMarkdown';
import { Chat, Close, Reset, Send } from './icons';

interface ChatbotProps {
  t: Translations;
  chat: ChatState;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  /** Hidden while the hero prompt is on screen, so there is one entry point at a time. */
  showLauncher: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({
  t,
  chat,
  isOpen,
  onOpenChange,
  showLauncher,
}) => {
  const { messages, isTyping, send, reset } = chat;
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isOpen, messages, isTyping]);

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
      if (e.key === 'Escape') onOpenChange(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onOpenChange]);

  const resetConversation = () => {
    reset();
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;
    send(inputValue);
    setInputValue('');
  };

  if (!isOpen) {
    return (
      <button
        ref={fabRef}
        type="button"
        className={`chat-fab${showLauncher ? '' : ' chat-fab--hidden'}`}
        aria-label={t.chatbotTitle}
        aria-hidden={!showLauncher}
        tabIndex={showLauncher ? undefined : -1}
        onClick={() => onOpenChange(true)}
      >
        <Chat />
        <span className="chat-fab__label">{t.chatbotLauncher}</span>
      </button>
    );
  }

  const showSuggestions =
    messages.length === 0 && !isTyping && !!t.chatbotSuggestions?.length;

  return (
    <div className="chat-window" role="dialog" aria-label={t.chatbotTitle}>
      <div className="chat-header">
        <h3>{t.chatbotTitle}</h3>
        <div className="chat-header__actions">
          {messages.length > 0 && (
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
            onClick={() => onOpenChange(false)}
          >
            <Close />
          </button>
        </div>
      </div>

      <div className="chat-body" aria-live="polite">
        <div className="chat-row chat-row--bot">
          <div className="chat-bubble chat-bubble--bot">
            <ChatMarkdown text={t.chatbotWelcome} />
          </div>
        </div>

        {messages.map((msg, index) => (
          <div key={index} className={`chat-row chat-row--${msg.type}`}>
            <div className={`chat-bubble chat-bubble--${msg.type}`}>
              <ChatMarkdown text={msg.text} />
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-row chat-row--bot">
            <div className="chat-bubble chat-bubble--bot">
              <TypingDots />
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
                onClick={() => send(s)}
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
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
              e.preventDefault();
              handleSend();
            }
          }}
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

export const TypingDots = () => (
  <span className="chat-typing" role="status" aria-label="typing">
    <span />
    <span />
    <span />
  </span>
);

export default Chatbot;
