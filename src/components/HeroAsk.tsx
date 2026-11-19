'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { Translations } from '@/types';
import { MAX_QUESTION_LENGTH, type ChatState } from '@/hooks/useChat';
import ChatMarkdown from './ChatMarkdown';
import { TypingDots } from './Chatbot';
import { ArrowUpRight, Send } from './icons';

interface HeroAskProps {
  t: Translations;
  chat: ChatState;
  onContinue: () => void;
}

/**
 * Cycles through example questions as a typed-out placeholder.
 * Stops while the field is focused or filled, and under reduced motion.
 */
function useTypedPlaceholder(samples: string[], paused: boolean, fallback: string) {
  const [text, setText] = useState(fallback);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (paused || reduced || samples.length === 0) {
      setText(fallback);
      return;
    }
    let sample = 0;
    let len = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = samples[sample];
      if (!deleting) {
        len += 1;
        setText(full.slice(0, len));
        if (len >= full.length) {
          deleting = true;
          timer = setTimeout(tick, 1800);
          return;
        }
        timer = setTimeout(tick, 70);
      } else {
        len -= 1;
        setText(full.slice(0, Math.max(len, 0)));
        if (len <= 0) {
          deleting = false;
          sample = (sample + 1) % samples.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 28);
      }
    };
    setText('');
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [samples, paused, reduced, fallback]);

  return text;
}

const HeroAsk: React.FC<HeroAskProps> = ({ t, chat, onContinue }) => {
  const { messages, isTyping, send, reset } = chat;
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const samples = t.chatbotSuggestions ?? [];
  const placeholder = useTypedPlaceholder(
    samples,
    focused || value !== '',
    t.chatbotPlaceholder
  );

  // Show only the latest exchange inline; the full history lives in the chat window.
  const lastUser = messages.map((m) => m.type).lastIndexOf('user');
  const question = lastUser >= 0 ? messages[lastUser].text : null;
  const answer =
    lastUser >= 0 && messages[lastUser + 1]?.type === 'bot'
      ? messages[lastUser + 1].text
      : null;

  const submit = (text: string) => {
    if (!text.trim() || isTyping) return;
    send(text);
    setValue('');
  };

  return (
    <div className="ask">
      <form
        className="ask__field"
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
        onClick={() => inputRef.current?.focus()}
      >
        <span className="ask__prompt" aria-hidden="true">
          ›
        </span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxLength={MAX_QUESTION_LENGTH}
          placeholder={placeholder}
          aria-label={t.askLabel}
          enterKeyHint="send"
        />
        <button
          type="submit"
          className="ask__send"
          aria-label={t.chatbotSend}
          disabled={isTyping || value.trim() === ''}
        >
          <Send />
        </button>
      </form>

      {!question && samples.length > 0 && (
        <div className="ask__chips">
          {samples.map((s) => (
            <button
              key={s}
              type="button"
              className="ask__chip"
              onClick={() => submit(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {question && (
        <div className="ask__answer" aria-live="polite">
          <p className="ask__question">{question}</p>
          {answer ? <ChatMarkdown text={answer} /> : isTyping && <TypingDots />}
          {answer && (
            <div className="ask__actions">
              <button type="button" className="text-link" onClick={onContinue}>
                {t.askContinue}
                <ArrowUpRight />
              </button>
              <button type="button" className="ask__clear" onClick={reset}>
                {t.askClear}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeroAsk;
