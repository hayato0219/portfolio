import { useCallback, useRef, useState } from 'react';
import type { Translations } from '@/types';

export interface ChatMessage {
  type: 'user' | 'bot';
  text: string;
}

/** Must match MAX_QUESTION_LENGTH in src/app/api/chat/route.ts. */
export const MAX_QUESTION_LENGTH = 500;

/**
 * Conversation state shared by the hero prompt and the chat window, so a
 * question asked in one place continues in the other.
 */
export function useChat(t: Translations, language: 'en' | 'ja') {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const busy = useRef(false);

  const errorMessage = useCallback(
    (status: number) => {
      if (status === 503) return t.chatErrorUnavailable;
      if (status === 429) return t.chatErrorBusy;
      return t.chatErrorGeneric;
    },
    [t]
  );

  const send = useCallback(
    async (text: string) => {
      const question = text.trim().slice(0, MAX_QUESTION_LENGTH);
      if (!question || busy.current) return;
      busy.current = true;
      setMessages((prev) => [...prev, { type: 'user', text: question }]);
      setIsTyping(true);

      let reply: string;
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question, language }),
        });
        if (res.ok) {
          const data = await res.json();
          reply = typeof data.text === 'string' ? data.text : errorMessage(502);
        } else {
          reply = errorMessage(res.status);
        }
      } catch {
        reply = t.chatErrorNetwork;
      }

      setMessages((prev) => [...prev, { type: 'bot', text: reply }]);
      setIsTyping(false);
      busy.current = false;
    },
    [language, errorMessage, t.chatErrorNetwork]
  );

  const reset = useCallback(() => setMessages([]), []);

  return { messages, isTyping, send, reset };
}

export type ChatState = ReturnType<typeof useChat>;
