import { useState } from "react";
import { askChatbot } from "../services/chatbotService";

export type ChatMessage = { role: "user" | "bot"; content: string; timestamp: number };
const TYPING_DELAY_MS = 2000;

const wait = (milliseconds: number) => new Promise<void>((resolve) => {
  window.setTimeout(resolve, milliseconds);
});

export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (question: string) => {
    const content = question.trim();
    if (!content || loading) return;
    setMessages((current) => [...current, { role: "user", content, timestamp: Date.now() }]);
    setLoading(true);
    try {
      const result = await askChatbot(content);
      // Beri waktu singkat agar typing indicator terasa seperti respons natural.
      await wait(TYPING_DELAY_MS);
      setMessages((current) => [...current, { role: "bot", content: result.answer, timestamp: Date.now() }]);
    } catch (error) {
      console.error("Chatbot gagal memproses pertanyaan.", error);
      setMessages((current) => [...current, {
        role: "bot", content: "Maaf, layanan chatbot sedang mengalami kendala. Silakan hubungi tim Urushalal.", timestamp: Date.now(),
      }]);
    } finally { setLoading(false); }
  };

  return { messages, loading, sendMessage };
}
