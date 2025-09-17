import { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useToast } from "@/hooks/use-toast";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export const useAIChat = (userId: string | null) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { toast } = useToast();

  const sendMessage = async (message: string) => {
    if (!userId || !message.trim() || loading) return;

    setLoading(true);

    // Optimistically add user message
    const userMessage: ChatMessage = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const functions = getFunctions();
      const aiAssistant = httpsCallable(functions, "aiAssistant"); // <-- Firebase Function name

      const result = await aiAssistant({
        message,
        user_id: userId,
        session_id: sessionId,
      });

      const data = result.data as {
        response?: string;
        session_id?: string;
      };

      if (!data?.response) {
        throw new Error("AI did not return a valid response.");
      }

      if (data.session_id && data.session_id !== sessionId) {
        setSessionId(data.session_id);
      }

      // Add AI response
      const aiMessage: ChatMessage = {
        role: "assistant",
        content: data.response,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("AI Chat error:", err);

      toast({
        title: "Chat Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });

      // Rollback user message
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setSessionId(null);
  };

  return {
    messages,
    loading,
    sendMessage,
    clearChat,
    hasMessages: messages.length > 0,
  };
};
