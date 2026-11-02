
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Loader2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { sendMessageToAI } from "../../services/aiService";
import { useTheme } from "../../context/ThemeContext";

export default function AIChatWidget() {
  const { darkMode } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: `# 👋 Welcome to Trishul Homestay!

I can help you with:

- Room availability
- Booking information
- Check-in & Check-out timings
- Homestay facilities
- Nearby attractions

**How can I assist you today?**`,
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // ======================================
  // Open Chatbot from Dashboard Quick Actions
  // ======================================

  useEffect(() => {
    const openChatbot = () => {
      setIsOpen(true);
    };

    window.addEventListener("open-ai-chat", openChatbot);

    return () => {
      window.removeEventListener("open-ai-chat", openChatbot);
    };
  }, []);

  // ======================================
  // Focus Input When Chatbot Opens
  // ======================================

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ======================================
  // Auto Scroll Messages
  // ======================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // ======================================
  // Send Message to AI
  // ======================================

  const handleSendMessage = async () => {
    const trimmedInput = input.trim();

    if (loading) return;

    if (!trimmedInput) {
      toast.error("Please enter a message first.");
      return;
    }

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmedInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await sendMessageToAI(trimmedInput);

      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text:
          response.data ||
          "Sorry, I couldn't generate a response.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const aiMessage = {
        id: Date.now() + 2,
        sender: "ai",
        text:
          error.message ||
          "Sorry! I'm unable to connect right now. Please try again.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // Enter Key Handler
  // ======================================

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // ======================================
  // Dark / Light Theme Classes
  // ======================================

  const windowTheme = darkMode
    ? "bg-slate-900 border-slate-700"
    : "bg-white border-slate-200";

  const messagesTheme = darkMode
    ? "bg-slate-800"
    : "bg-slate-50";

  const aiMessageTheme = darkMode
    ? "bg-slate-700 text-slate-100"
    : "bg-white text-slate-800";

  const inputTheme = darkMode
    ? "bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
    : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400";

  const inputSectionTheme = darkMode
    ? "bg-slate-900 border-slate-700"
    : "bg-white border-slate-200";

  // ======================================
  // Component UI
  // ======================================

  return (
    <>
      {/* Floating Chatbot Button */}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        className="fixed bottom-6 right-6 z-[60] w-16 h-16 rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {/* Chatbot Window */}

      {isOpen && (
        <div
          className={`fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 z-[60] sm:w-[400px] h-[600px] max-h-[calc(100vh-130px)] rounded-2xl shadow-2xl border overflow-hidden flex flex-col transition-colors duration-300 ${windowTheme}`}
        >

          {/* Header */}

          <div className="bg-teal-600 text-white px-5 py-4 flex justify-between items-center shrink-0">

            <div>
              <h2 className="font-bold text-lg">
                AI Travel Assistant
              </h2>

              <p className="text-sm text-teal-100">
                Trishul Homestay
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
              className="hover:text-red-200 transition"
            >
              <X size={22} />
            </button>

          </div>

          {/* Messages Area */}

          <div
            className={`flex-1 min-h-0 overflow-y-auto p-4 space-y-4 transition-colors duration-300 ${messagesTheme}`}
          >

            {messages.map((message) => (

              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`flex gap-2 max-w-[90%] ${
                    message.sender === "user"
                      ? "flex-row-reverse"
                      : ""
                  }`}
                >

                  {/* Avatar */}

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-teal-600 text-white"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User size={18} />
                    ) : (
                      <Bot size={18} />
                    )}
                  </div>

                  {/* Message Content */}

                  <div
                    className={`rounded-2xl px-4 py-3 break-words ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : `${aiMessageTheme} rounded-bl-sm shadow`
                    }`}
                  >

                    {message.sender === "user" ? (

                      <p className="whitespace-pre-wrap">
                        {message.text}
                      </p>

                    ) : (

                      <div
                        className={`prose prose-sm max-w-none break-words ${
                          darkMode ? "prose-invert" : ""
                        } prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-headings:my-2`}
                      >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.text}
                        </ReactMarkdown>
                      </div>

                    )}

                  </div>

                </div>

              </div>

            ))}

            {/* Loading Indicator */}

            {loading && (

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0">
                  <Bot size={18} />
                </div>

                <div
                  className={`px-4 py-3 rounded-2xl shadow flex items-center gap-2 ${aiMessageTheme}`}
                >

                  <Loader2
                    className="animate-spin text-teal-500"
                    size={18}
                  />

                  <span className="text-sm">
                    AI is thinking...
                  </span>

                </div>

              </div>

            )}

            <div ref={messagesEndRef} />

          </div>

          {/* Input Section */}

          <div
            className={`border-t p-4 shrink-0 transition-colors duration-300 ${inputSectionTheme}`}
          >

            <div className="flex gap-2">

              <input
                ref={inputRef}
                type="text"
                placeholder="Ask anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className={`flex-1 min-w-0 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300 ${inputTheme}`}
              />

              <button
                type="button"
                onClick={handleSendMessage}
                disabled={loading}
                aria-label="Send message"
                className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white px-4 rounded-xl flex items-center justify-center transition"
              >
                <Send size={20} />
              </button>

            </div>

          </div>

        </div>
      )}

    </>
  );
}
