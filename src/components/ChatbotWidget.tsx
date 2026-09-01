import { FormEvent, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import { MessageCircle, Send, X } from "lucide-react";
import { useChatbot } from "../hooks/useChatbot";

const quickReplies = ["Apa syarat dokumen?", "Berapa biayanya?", "Berapa lama prosesnya?"];

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, loading, sendMessage } = useChatbot();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const value = input;
    setInput("");
    await sendMessage(value);
  };

  return (
    <div className="chatbot" aria-live="polite">
      {open && <section className="chatbot__panel" role="dialog" aria-label="Chatbot FAQ Urushalal">
        <header className="chatbot__head">
          <div><strong>Asisten Urushalal</strong><span>FAQ sertifikasi halal</span></div>
          <button type="button" className="chatbot__close" onClick={() => setOpen(false)} aria-label="Tutup chatbot"><X size={18} /></button>
        </header>
        <div className="chatbot__messages">
          {messages.length === 0 && <div className="chatbot__welcome"><p>Halo, saya siap membantu menjawab pertanyaan seputar sertifikasi halal.</p><div className="chatbot__quick">{quickReplies.map((reply) => <button type="button" key={reply} onClick={() => void sendMessage(reply)}>{reply}</button>)}</div></div>}
          {messages.map((message) => <div className={`chatbot__message chatbot__message--${message.role}`} key={message.timestamp}><ReactMarkdown rehypePlugins={[rehypeSanitize]} remarkPlugins={[remarkBreaks]}>{message.content}</ReactMarkdown></div>)}
          {loading && <div className="chatbot__typing" aria-label="Mengetik"><i /><i /><i /></div>}
          <div ref={endRef} />
        </div>
        <form className="chatbot__form" onSubmit={submit}><input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tulis pertanyaan..." aria-label="Pertanyaan" maxLength={500} /><button type="submit" disabled={!input.trim() || loading} aria-label="Kirim"><Send size={17} /></button></form>
      </section>}
      <button type="button" className="chatbot__fab" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Tutup chatbot" : "Buka chatbot"}>{open ? <X size={25} /> : <MessageCircle size={25} />}</button>
    </div>
  );
}
