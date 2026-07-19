import { useState, useEffect, useRef } from "react";
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

export default function AIChatWidget() {
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

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSendMessage = async () => {
    const trimmedInput = input.trim();

    if (!trimmedInput || loading) return;

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 z-50 sm:w-[400px] h-[600px] rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">

          {/* Header */}

          <div className="bg-teal-600 text-white px-5 py-4 flex justify-between items-center">

            <div>
              <h2 className="font-bold text-lg">
                AI Travel Assistant
              </h2>

              <p className="text-sm text-teal-100">
                Trishul Homestay
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-red-200 transition"
            >
              <X size={22} />
            </button>

          </div>

          {/* Messages */}

          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-800 space-y-4">

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

                  {/* Message */}

                  <div
                    className={`rounded-2xl px-4 py-3 break-words ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-bl-sm shadow"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <p className="whitespace-pre-wrap">
                        {message.text}
                      </p>
                    ) : (
                      <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-headings:my-2">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.text}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>

                </div>

              </div>

            ))}

            {/* Loading */}

            {loading && (

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center">
                  <Bot size={18} />
                </div>

                <div className="bg-white dark:bg-slate-700 px-4 py-3 rounded-2xl shadow flex items-center gap-2">

                  <Loader2
                    className="animate-spin text-teal-600"
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

          {/* Input */}

          <div className="border-t dark:border-slate-700 p-4">

            <div className="flex gap-2">

              <input
                ref={inputRef}
                type="text"
                placeholder="Ask anything..."
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="flex-1 border rounded-xl px-4 py-3 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              />

              <button
                onClick={handleSendMessage}
                disabled={loading}
                className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white px-4 rounded-xl flex items-center justify-center"
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