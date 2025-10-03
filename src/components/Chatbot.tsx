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

interface ChatbotProps {
  t: Translations;
  siteProps: SiteProps;
}

const Chatbot: React.FC<ChatbotProps> = ({ t, siteProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { type: 'bot', text: t.chatbotWelcome }
      ]);
    }
  }, [isOpen, t.chatbotWelcome, messages.length]);

  // サイト情報をまとめたコンテキストを生成
  const getSiteContext = () => {
    let context = `Portfolio Information about ${siteProps.name}:\n\n`;
    
    // 自己紹介
    context += `About: ${t.aboutDescription}\n\n`;
    
    // スキル
    context += `Skills: ${t.skills.join(', ')}\n\n`;
    
    // ツール
    context += `Tools: ${t.toolsList.join(', ')}\n\n`;
    
    // 経験
    context += `Experience:\n`;
    t.experienceList.forEach(yearData => {
      context += `${yearData.year}:\n`;
      yearData.items.forEach(item => {
        context += `- ${item.title}: ${item.description}\n`;
        if (item.technologies) context += `  Technologies: ${item.technologies}\n`;
        if (item.tags) context += `  ${item.tags}\n`;
      });
    });
    
    // 連絡先
    context += `\nContact: Email: ${siteProps.socials.email}, GitHub: github.com/${siteProps.socials.gitHub}\n`;
    
    return context;
  };

  // Gemini APIを使用して応答を生成
  const generateResponse = async (question: string): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return "❌ APIキーが設定されていません。.envファイルにGemini APIキーを設定してください。\n\n手順：\n1. ルートディレクトリに.envファイルを作成\n2. NEXT_PUBLIC_GEMINI_API_KEY=実際のキー を追加\n3. 無料のAPIキーを取得: https://aistudio.google.com/app/apikey\n4. 開発サーバーを再起動（npm run dev）";
    }

    try {
      const siteContext = getSiteContext();
      const systemPrompt = `You are ${siteProps.name}. **Always use Markdown (e.g., headings, bold text, bullet points) to format your response for clarity and readability.** Answer questions about their skills, experience, projects, and background based on the following information. Keep your answers concise and friendly. If asked in Japanese, respond in Japanese. If asked in English, respond in English.\n\n${siteContext}`;

      const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: systemPrompt + "\n\nUser question: " + question
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        })
      });

      if (!response.ok) {
        if (response.status === 429) {
          return "⚠️ **リクエスト制限を超えました**\n\n無料プランでは以下の制限があります：\n- 1分間に60リクエストまで\n- 1日に1,500リクエストまで\n\nしばらく時間をおいてから再度お試しください。";
        } else if (response.status === 403) {
          return "🔒 APIキーの認証に失敗しました。APIキーが有効で、.envファイルに正しく設定されているか確認してください。";
        } else if (response.status === 400) {
          return "❌ リクエストの形式が無効です。質問の形式に問題がある可能性があります。";
        } else {
          return `❌ API Error ${response.status}`;
        }
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      
      if (error instanceof Error && (error.message.includes('Failed to fetch') || error.message.includes('NetworkError'))) {
        return "🌐 ネットワークエラーです。インターネット接続を確認してください。";
      }
      
      return `❌ エラーが発生しました。再度お試しいただくか、問題が続く場合はサポートにお問い合わせください。`;
    }
  };

  const handleSend = async () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = { type: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    const currentQuestion = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      const botResponse = await generateResponse(currentQuestion);
      const botMessage: Message = { type: 'bot', text: botResponse };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = { 
        type: 'bot', 
        text: 'エラーが発生しました。もう一度お試しください。' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* チャットボタン */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem',
            color: 'white',
            zIndex: 999,
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          💬
        </button>
      )}

      {/* チャットウィンドウ */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '380px',
            height: '700px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 999,
            overflow: 'hidden',
          }}
        >
          {/* ヘッダー */}
          <div
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{t.chatbotTitle}</h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '0',
                width: '30px',
                height: '30px',
              }}
            >
              ×
            </button>
          </div>

          {/* メッセージエリア */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              background: '#f5f5f5',
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '12px',
                  display: 'flex',
                  justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '75%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: msg.type === 'user' 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : '#f8f9fa',
                    color: msg.type === 'user' ? 'white' : '#1f1f1f',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                    wordWrap: 'break-word',
                    border: msg.type === 'bot' ? '1px solid #e0e0e0' : 'none',
                  }}
                >
                  <Markdown
                    options={{
                      overrides: {
                        p: {
                          props: {
                            style: { 
                              margin: '0.5em 0',
                              lineHeight: '1.6',
                              fontWeight: '500',
                            }
                          }
                        },
                        h1: {
                          props: {
                            style: { 
                              fontSize: '1.4em', 
                              fontWeight: '600', 
                              margin: '16px 0 8px 0',
                              borderBottom: msg.type === 'user' ? '2px solid rgba(255,255,255,0.3)' : '2px solid #e0e0e0',
                              paddingBottom: '4px',
                            }
                          }
                        },
                        h2: {
                          props: {
                            style: { 
                              fontSize: '1.25em', 
                              fontWeight: '600', 
                              margin: '14px 0 7px 0',
                              color: msg.type === 'user' ? 'white' : '#333',
                            }
                          }
                        },
                        h3: {
                          props: {
                            style: { 
                              fontSize: '1.1em', 
                              fontWeight: '600', 
                              margin: '12px 0 6px 0',
                              color: msg.type === 'user' ? 'white' : '#444',
                            }
                          }
                        },
                        code: {
                          props: {
                            style: {
                              background: msg.type === 'user' ? 'rgba(0,0,0,0.2)' : '#f1f3f4',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontFamily: '"Roboto Mono", "Courier New", monospace',
                              fontSize: '0.9em',
                              color: msg.type === 'user' ? '#fff' : '#d73a49',
                              border: msg.type === 'bot' ? '1px solid #e1e4e8' : 'none',
                            }
                          }
                        },
                        pre: {
                          props: {
                            style: {
                              background: msg.type === 'user' ? 'rgba(0,0,0,0.3)' : '#282c34',
                              padding: '12px',
                              borderRadius: '6px',
                              overflow: 'auto',
                              margin: '10px 0',
                              border: msg.type === 'bot' ? '1px solid #e1e4e8' : 'none',
                            }
                          },
                          component: ({ children, ...props }: any) => (
                            <pre {...props}>
                              <code style={{
                                fontFamily: '"Roboto Mono", "Courier New", monospace',
                                fontSize: '0.85em',
                                color: '#abb2bf',
                                display: 'block',
                              }}>
                                {children}
                              </code>
                            </pre>
                          ),
                        },
                        ul: {
                          props: {
                            style: { 
                              margin: '10px 0', 
                              paddingLeft: '24px',
                              lineHeight: '1.8',
                            }
                          }
                        },
                        ol: {
                          props: {
                            style: { 
                              margin: '10px 0', 
                              paddingLeft: '24px',
                              lineHeight: '1.8',
                            }
                          }
                        },
                        li: {
                          props: {
                            style: { 
                              margin: '6px 0',
                              lineHeight: '1.6',
                            }
                          }
                        },
                        a: {
                          props: {
                            style: { 
                              color: msg.type === 'user' ? '#fff' : '#1a73e8', 
                              textDecoration: 'underline',
                              fontWeight: '500',
                            },
                            target: '_blank',
                            rel: 'noopener noreferrer'
                          }
                        },
                        strong: {
                          props: {
                            style: { 
                              fontWeight: '600',
                              color: msg.type === 'user' ? 'white' : '#000',
                            }
                          }
                        },
                        em: {
                          props: {
                            style: { 
                              fontStyle: 'italic',
                              color: msg.type === 'user' ? 'rgba(255,255,255,0.9)' : '#555',
                            }
                          }
                        },
                        blockquote: {
                          props: {
                            style: {
                              borderLeft: msg.type === 'user' ? '3px solid rgba(255,255,255,0.5)' : '3px solid #dfe2e5',
                              paddingLeft: '12px',
                              margin: '12px 0',
                              color: msg.type === 'user' ? 'rgba(255,255,255,0.9)' : '#6a737d',
                              fontStyle: 'italic',
                            }
                          }
                        },
                        hr: {
                          props: {
                            style: {
                              border: 'none',
                              borderTop: msg.type === 'user' ? '1px solid rgba(255,255,255,0.3)' : '1px solid #e1e4e8',
                              margin: '16px 0',
                            }
                          }
                        },
                        table: {
                          props: {
                            style: {
                              borderCollapse: 'collapse',
                              width: '100%',
                              margin: '12px 0',
                              fontSize: '0.9em',
                            }
                          }
                        },
                        th: {
                          props: {
                            style: {
                              border: msg.type === 'user' ? '1px solid rgba(255,255,255,0.3)' : '1px solid #dfe2e5',
                              padding: '8px',
                              background: msg.type === 'user' ? 'rgba(0,0,0,0.2)' : '#f6f8fa',
                              fontWeight: '600',
                            }
                          }
                        },
                        td: {
                          props: {
                            style: {
                              border: msg.type === 'user' ? '1px solid rgba(255,255,255,0.3)' : '1px solid #dfe2e5',
                              padding: '8px',
                            }
                          }
                        },
                      }
                    }}
                  >
                    {msg.text}
                  </Markdown>
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: 'white',
                    color: '#666',
                    fontSize: '0.9rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  <span>typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 入力エリア */}
          <div
            style={{
              padding: '16px',
              borderTop: '1px solid #e0e0e0',
              background: 'white',
              display: 'flex',
              gap: '8px',
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.chatbotPlaceholder}
              style={{
                flex: 1,
                padding: '10px 14px',
                border: '1px solid #ddd',
                borderRadius: '20px',
                outline: 'none',
                fontSize: '0.9rem',
              }}
            />
            <button
              onClick={handleSend}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                fontSize: '1.2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
