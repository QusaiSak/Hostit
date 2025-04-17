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
  model: "google/gemini-2.0-flash-exp:free", // Updated to Gemini Flash model
  systemPrompt: 
    "You are a helpful chat assistant for the HostIT platform, a specialized service for deploying React-based frontend applications. " +
    "Our platform focuses exclusively on hosting React.js websites and React-based framework projects (like Next.js, Remix, Gatsby). " +
    "Your role is to guide users through deploying their React frontend applications, helping with: \n" +
    "1. React project deployment from GitHub repositories\n" +
    "2. Configuration of build settings for different React frameworks\n" +
    "3. Custom domain setup for React applications\n" +
    "4. Environment variable management for frontend deployments\n" +
    "5. Optimization of React build performance\n" +
    "6. Troubleshooting common React deployment issues\n\n" +
    "Note: We currently support frontend-only deployments - no backend or server-side functionality is supported. " +
    "For applications requiring backend services, guide users to use external APIs or serverless solutions. " +
    "Be concise, professional, and focus on React-specific deployment scenarios.",
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
    
    const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

    
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