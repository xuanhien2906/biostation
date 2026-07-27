import React, { useState } from 'react';
import { ChatMessage } from '../types';
import { Sparkles, Send, Bot, User, Sprout, ShieldCheck, RefreshCw } from 'lucide-react';
import { BioStationLogo } from './BioStationLogo';

export const AiAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      content:
        'Xin chào! Tôi là Trợ lý AI Bách Mộc – BiO Station: Chạm để trở về. Tôi có thể hỗ trợ bạn tìm hiểu về gạo hữu cơ Bách Mộc ST25, tiêu chuẩn kiểm định BMQ, giỏ hàng nông sản sạch cho gia đình hay kế hoạch mở điểm chạm BiO Station tại khu dân cư!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    'Gạo Bách Mộc ST25 có gì đặc biệt so với gạo thông thường?',
    'Tiêu chuẩn kiểm định BMQ (Qualified by Bách Mộc) là gì?',
    'Làm thế nào để bảo quản rau củ hữu cơ tươi ngon lâu nhất?',
    'Điều kiện để hợp tác mở BiO Station Cộng Đồng khu dân cư?',
  ];

  const handleSendMessage = async (queryText?: string) => {
    const messageToSend = queryText || inputQuery;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!queryText) setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageToSend,
          conversationHistory: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content:
          data.reply ||
          'Xin lỗi, hiện tại hệ thống đang cập nhật. Bạn có thể gọi trực tiếp Hotline Bách Mộc 0908 123 456 để được giải đáp ngay.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat API error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content:
            'Bách Mộc AI xin lỗi vì sự gián đoạn kết nối. Bạn hãy thử lại hoặc xem thông tin trên biostation.vn nhé!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-[#2d241e] space-y-6">
      {/* Header Banner */}
      <div className="bg-[#274e23] text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Trợ Lý AI Bách Mộc
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-serif">
            Hỏi Đáp Nông Sản & Sống Thuận Tự Nhiên
          </h1>
          <p className="text-xs text-emerald-100 max-w-md">
            Trí tuệ nhân tạo Gemini tích hợp kiến thức chuyên sâu về nguồn gốc sản phẩm, tiêu chuẩn BMQ và dinh dưỡng hữu cơ.
          </p>
        </div>

        <BioStationLogo variant="dark" showSlogan={true} className="shrink-0" />
      </div>

      {/* Suggested Questions Pills */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-[#7a6858] uppercase tracking-wider block">
          Câu hỏi thường gặp:
        </span>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-xs bg-white text-[#274e23] font-semibold px-3.5 py-2 rounded-xl border border-[#e2d5c3] hover:border-[#274e23] hover:bg-[#f2e9dc] transition-all cursor-pointer"
            >
              💬 {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-3xl border border-[#e2d5c3] shadow-md overflow-hidden flex flex-col h-[520px]">
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#fbf8f3]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                  msg.role === 'user'
                    ? 'bg-[#a66e2c] text-white'
                    : 'bg-[#274e23] text-white shadow'
                }`}
              >
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed space-y-1 shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-[#274e23] text-white rounded-tr-none'
                    : 'bg-white border border-[#e2d5c3] text-[#2d241e] rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line">{msg.content}</div>
                <span className="text-[10px] opacity-60 block text-right pt-1">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#274e23] text-white flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white border border-[#e2d5c3] p-3 rounded-2xl text-xs text-[#7a6858] flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-[#274e23]" />
                <span>Bách Mộc AI đang soạn câu trả lời...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-[#f8f5f0] border-t border-[#e2d5c3] flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Hỏi về gạo Bách Mộc, rau củ BMQ, mật ong..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 text-xs p-3 rounded-xl border border-[#dcd0bf] bg-white focus:outline-none focus:border-[#274e23]"
          />

          <button
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            className="px-5 py-3 rounded-xl bg-[#274e23] hover:bg-[#1e3e1a] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow cursor-pointer disabled:opacity-50"
          >
            <Send className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Gửi</span>
          </button>
        </form>
      </div>
    </div>
  );
};
