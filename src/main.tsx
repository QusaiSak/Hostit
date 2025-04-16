
import { ClerkProvider } from '@clerk/clerk-react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Replace with your actual Clerk publishable key
const CLERK_PUBLISHABLE_KEY = "pk_test_aW5zcGlyZWQtb3gtOTQuY2xlcmsuYWNjb3VudHMuZGV2JA"
if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key');
}

// OpenRouter API key
// This is intentionally included directly for this demo - in production, use environment variables
window.OPENROUTER_API_KEY = "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";

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
);
