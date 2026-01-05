import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const sendPrompt = async () => {
    if (!prompt.trim() || loading) return;

    const userMessage = prompt;
    setPrompt("");
    setLoading(true);

    setChat((prev) => [...prev, { role: "user", text: userMessage }]);

    try {
      const res = await axios.post("http://localhost:3000/api/chat", {
        prompt: userMessage,
      });

      setChat((prev) => [...prev, { role: "ai", text: res.data.reply }]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { role: "ai", text: `Terjadi kesalahan 😢,${err}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className=" bg-white border border-gray-200 px-4 py-3 text-center font-semibold">
        ChatBot AI Gemini
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-hidden mb-30">
        <div className="h-full overflow-y-auto px-4 py-6">
          <div className="mx-auto max-w-3xl h-full space-y-6">
            {chat.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center">
                <p className="text-center text-gray-500 text-lg">
                  Mulai percakapan dengan Gemini AI ✨
                </p>
              </div>
            )}

            {chat.map((c, i) => (
              <div
                key={i}
                className={`flex ${
                  c.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`relative rounded-2xl px-4 py-3 text-sm leading-relaxed
                    ${
                      c.role === "user"
                        ? "bg-gray-100 text-gray-800 max-w-[70%]"
                        : "max-w-full"
                    }`}
                >
                  {/* CONTENT */}
                  {c.role === "ai" ? (
                    <div
                      className="prose prose-sm max-w-none
                                    prose-headings:font-semibold
                                    prose-pre:bg-gray-900
                                    prose-pre:text-gray-100
                                    prose-pre:rounded-xl
                                    prose-code:text-blue-600"
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {c.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{c.text}</p>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-3 text-sm animate-pulse">
                  Gemini sedang mengetik…
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>
      </main>

      {/* Input */}
      <footer className="fixed bottom-0 left-0 right-0 px-4">
        <div className="mx-auto max-w-3xl">
          <div
            className="flex items-end gap-2 rounded-2xl
                          bg-white border border-gray-200
                          px-3 py-2 shadow-lg"
          >
            <textarea
              rows={1}
              placeholder="Ketik pesan…"
              value={prompt}
              disabled={loading}
              onChange={(e) => {
                setPrompt(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 160) + "px";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendPrompt();
                }
              }}
              className="flex-1 resize-none bg-transparent px-3 py-2 text-sm
                         focus:outline-none max-h-40 overflow-y-auto
                         disabled:opacity-50"
            />

            <button
              onClick={sendPrompt}
              disabled={loading || !prompt.trim()}
              className="shrink-0 self-end rounded-xl bg-blue-600 px-4 py-2
                         text-sm text-white hover:bg-blue-700
                         disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Menjawab..." : "Kirim"}
            </button>
          </div>
          <div className="flex justify-center w-full py-2">
            <small className="text-xs text-center">
              Dibuat Machfudin dengan Gemini AI, React, dan Express
            </small>
          </div>
        </div>
      </footer>
    </div>
  );
}
