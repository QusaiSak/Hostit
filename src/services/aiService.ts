
export interface AiResponseOptions {
  model?: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AiMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const DEFAULT_OPTIONS: AiResponseOptions = {
  model: "google/gemini-2.5-pro-exp-03-25:free", // Gemini Flash model
  systemPrompt: 
    "You are a helpful AI assistant for the HostIT platform, a service that helps users deploy their applications through GitHub integration. " +
    "ONLY answer questions related to the HostIT platform features, deployment processes, GitHub integration, and website functionality. " +
    "If users ask questions unrelated to the website or platform, politely redirect them to website-related topics. " +
    "Be concise, professional, and helpful. The HostIT platform offers features like GitHub integration, one-click deployments, custom domains, and AI assistance.",
  temperature: 0.3,
  maxTokens: 1000,
};

export const generateAiResponse = async (
  messages: AiMessage[],
  options: Partial<AiResponseOptions> = {}
): Promise<string> => {
  try {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
    
    // Add system message if not present
    if (messages.every(msg => msg.role !== "system") && mergedOptions.systemPrompt) {
      messages = [
        { role: "system", content: mergedOptions.systemPrompt },
        ...messages
      ];
    }
    
    // Get the OpenRouter API key from the window/global variable
    const OPENROUTER_API_KEY = window.OPENROUTER_API_KEY;
    
    if (!OPENROUTER_API_KEY) {
      console.error("OpenRouter API key not found");
      throw new Error("OpenRouter API key not found");
    }
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "HostIT Assistant"
      },
      body: JSON.stringify({
        model: mergedOptions.model,
        messages,
        temperature: mergedOptions.temperature,
        max_tokens: mergedOptions.maxTokens
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Service Error:", errorText);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
  }
};
