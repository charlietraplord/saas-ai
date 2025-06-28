'use client';

import { useState, useEffect, useRef } from 'react';
import { useSocket } from '../../../../components/providers/socket-provider';

interface ChatMessage {
  id: string;
  from: 'user' | 'bot';
  content: string;
  createdAt: Date;
}

// Type guard for ChatMessage validation
function isValidChatMessage(message: unknown): message is ChatMessage {
  if (!message || typeof message !== 'object') return false;
  const m = message as Partial<ChatMessage>;
  return (
    typeof m.id === 'string' &&
    (m.from === 'user' || m.from === 'bot') &&
    typeof m.content === 'string' &&
    m.createdAt !== undefined
  );
}

export default function ChatPage({ agentId }: { agentId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const { socket, joinChat, leaveChat } = useSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!agentId) return;

    // Join chat room on mount
    joinChat(agentId);

    // Listen for new messages
    if (socket) {
      socket.on('new-message', (message: unknown) => {
        if (isValidChatMessage(message)) {
          setMessages((prev) => [...prev, message]);
        } else {
          console.error('Received invalid message format:', message);
        }
      });
    }    // Load existing messages
    setIsLoading(true);
    fetch(`/api/agents/${agentId}/messages`)
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 404) {
            console.error('Agent not found or inaccessible');
            return { messages: [] };
          }
          throw new Error(`Failed to load messages: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        const messages = Array.isArray(data?.messages) ? data.messages : [];
        const validMessages = messages.filter(isValidChatMessage);
        setMessages(validMessages);
      })
      .catch((error) => {
        console.error('Error loading messages:', error);
        // Don't clear messages on error, just keep the current state
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load messages:', error);
        setMessages([]);
      });

    // Cleanup
    return () => {
      leaveChat(agentId);
      if (socket) {
        socket.off('new-message');
      }
    };
  }, [agentId, socket, joinChat, leaveChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send() {
    if (!input.trim() || isLoading || !agentId) return;
    
    setIsLoading(true);
    try {
      const res = await fetch(`/api/agents/${agentId}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      
      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      setInput('');
    } catch (error) {
      console.error('Chat error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Chat Header */}
      <div className="py-4 px-6 border-b bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold">AI Assistant</div>
              <div className="text-sm text-text-2">Online</div>
            </div>
          </div>
          <button className="text-text-2 hover:text-primary">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.from === 'user'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-white shadow-sm rounded-bl-none'
                }`}
              >
                <div className="flex items-center gap-2 mb-1 text-sm opacity-75">
                  {message.from === 'user' ? (
                    <>
                      <span>You</span>
                      <span>•</span>
                      <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
                    </>
                  ) : (
                    <>
                      <span>AI Assistant</span>
                      <span>•</span>
                      <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
                    </>
                  )}
                </div>
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white shadow-sm rounded-2xl rounded-bl-none px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t">
        <div className="max-w-4xl mx-auto">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              className="flex-grow input focus:ring-2 focus:ring-primary/20"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button 
              type="submit"
              className="btn btn-primary"
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? (
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
