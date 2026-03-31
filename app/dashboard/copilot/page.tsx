'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, Zap } from 'lucide-react';
import { useState } from 'react';
import { ChatMessage } from '@/lib/types';

const sampleMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'assistant',
    content:
      'Hi! I\'m your AI supply chain copilot. I can help you analyze shipments, predict disruptions, optimize routes, and answer questions about your supply chain. What would you like to know?',
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
  },
];

const quickActions = [
  'What shipments are at risk?',
  'Show me cascade impacts',
  'Recommend best route for SHP-001',
  'Analyze disruption patterns',
];

export default function CopilotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(sampleMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        'at risk':
          'I found 2 shipments currently at high risk: SHP-002 and SHP-006. SHP-002 is delayed due to port congestion at Rotterdam, while SHP-006 is affected by severe weather in the Indian Ocean. Both require immediate attention and potential rerouting.',
        cascade:
          'Based on current conditions, there are 3 cascade predictions active. The most critical is CASCADE-001 from SHP-003, which could affect 8 shipments over 72 hours with estimated losses of $425,000. I recommend immediate action on this shipment.',
        'best route':
          'For SHP-001 (Shanghai to Los Angeles), I recommend the Cost-Optimized Alternative route. It offers 27% savings ($2,300), only 2.5 additional days, and lower risk exposure. This route avoids current weather disruptions in the Indian Ocean.',
        disruption:
          'Analysis shows disruption patterns across 5 key areas: Weather events in the Indian Ocean (3 alerts), Port strikes at Rotterdam (5 shipments affected), Carrier delays (2 alerts), and unexpected demand spikes affecting 12 shipments.',
      };

      let responseText =
        'I can help with that. Could you be more specific about what information you need?';

      for (const [key, value] of Object.entries(responses)) {
        if (text.toLowerCase().includes(key)) {
          responseText = value;
          break;
        }
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        content: responseText,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6 h-[calc(100vh-120px)]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Copilot</h1>
        <p className="text-muted-foreground mt-1">
          Ask questions about your supply chain, get AI-powered insights
        </p>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col gap-4 overflow-hidden">
        {/* Chat Messages */}
        <Card className="bg-card border-border flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-sm rounded-lg p-4 ${
                    message.sender === 'user'
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-2 block">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground rounded-lg p-4">
                  <div className="flex gap-2">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                    <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-100" />
                    <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Quick Actions (visible only if few messages) */}
        {messages.length <= 1 && (
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(action)}
                className="bg-muted hover:bg-muted/80 text-foreground text-sm font-medium py-2 px-3 rounded-lg transition-colors text-left"
              >
                <Zap className="h-3 w-3 inline mr-2" />
                {action}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(input);
              }
            }}
            placeholder="Ask me anything about your supply chain..."
            className="bg-card border-border text-foreground placeholder:text-muted-foreground"
            disabled={isLoading}
          />
          <Button
            onClick={() => handleSendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
