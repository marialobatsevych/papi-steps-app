import React, { useState } from 'react';
import { KawaiiButton } from '../KawaiiButton';
import { BackIcon, SendIcon, PawIcon } from '../KawaiiIcons';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'friend';
  timestamp: Date;
  senderName?: string;
  senderAvatar?: string;
}

interface KawaiiMessagesScreenProps {
  onBack: () => void;
}

export function KawaiiMessagesScreen({ onBack }: KawaiiMessagesScreenProps) {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey! How many steps did you get today? 🐾',
      sender: 'friend',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      senderName: 'Luna',
      senderAvatar: '🐱'
    },
    {
      id: '2',
      text: 'I got 8,542 steps! Still working towards my goal 💪',
      sender: 'user',
      timestamp: new Date(Date.now() - 1000 * 60 * 25)
    },
    {
      id: '3',
      text: 'That\'s amazing! I love the new plant in your room 🌱',
      sender: 'friend',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      senderName: 'Luna',
      senderAvatar: '🐱'
    },
    {
      id: '4',
      text: 'Thanks! Just bought it from the shop. Want to visit later?',
      sender: 'user',
      timestamp: new Date(Date.now() - 1000 * 60 * 15)
    },
    {
      id: '5',
      text: 'Yes! I\'ll bring some treats for Papi 🍪✨',
      sender: 'friend',
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      senderName: 'Luna',
      senderAvatar: '🐱'
    }
  ]);
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate friend response after a delay
      setTimeout(() => {
        const responses = [
          'That sounds wonderful! 🌟',
          'Keep it up! 💪',
          'Papi looks so happy! 😊',
          'Love your progress! 🎉',
          'Let\'s walk together soon! 🚶‍♀️'
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const friendReply: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: 'friend',
          timestamp: new Date(),
          senderName: 'Luna',
          senderAvatar: '🐱'
        };
        
        setMessages(prev => [...prev, friendReply]);
      }, 1500);
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#C3F0D9] to-[#FFF6E8] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4 bg-white bg-opacity-50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <KawaiiButton 
            variant="mint" 
            size="sm" 
            icon={<BackIcon size={18} />}
            onClick={onBack}
            className="w-12 h-12 !p-0"
          />
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FFB3C6] to-[#FF9FB7] rounded-2xl flex items-center justify-center text-lg">
              🐱
            </div>
            <div>
              <h1 className="font-['Nunito'] font-bold text-lg text-[#2C2C2E]">Luna</h1>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-[#34C759] rounded-full" />
                <span className="font-['Nunito'] text-[#8E8E93] text-xs">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar for friend messages */}
              {message.sender === 'friend' && (
                <div className="w-8 h-8 bg-gradient-to-br from-[#FFB3C6] to-[#FF9FB7] rounded-full flex items-center justify-center text-sm flex-shrink-0">
                  {message.senderAvatar}
                </div>
              )}
              
              {/* Message bubble */}
              <div className="space-y-1">
                <div
                  className={`
                    px-4 py-3 rounded-3xl font-['Nunito'] leading-relaxed
                    ${message.sender === 'user' 
                      ? 'bg-gradient-to-br from-[#FFB3C6] to-[#FF9FB7] text-white rounded-br-lg' 
                      : 'bg-white text-[#2C2C2E] rounded-bl-lg'
                    }
                    shadow-sm
                  `}
                >
                  {message.text}
                </div>
                
                {/* Timestamp */}
                <p className={`text-xs font-['Nunito'] text-[#8E8E93] ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Input Area */}
      <div className="p-6 bg-white bg-opacity-50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a cute message..."
              className="
                w-full px-4 py-3 pr-12 bg-white rounded-3xl border-0 
                font-['Nunito'] text-[#2C2C2E] placeholder-[#8E8E93]
                focus:outline-none focus:ring-2 focus:ring-[#FFB3C6] focus:ring-opacity-50
                shadow-sm
              "
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <PawIcon size={16} className="text-[#FFB3C6]" />
            </div>
          </div>
          
          <KawaiiButton
            variant="primary"
            size="md"
            icon={<SendIcon size={18} />}
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="w-12 h-12 !p-0"
          />
        </div>
      </div>
    </div>
  );
}