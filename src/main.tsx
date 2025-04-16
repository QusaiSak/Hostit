
import { ClerkProvider } from '@clerk/clerk-react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Replace with your actual Clerk publishable key
const CLERK_PUBLISHABLE_KEY = "pk_test_aW5zcGlyZWQtb3gtOTQuY2xlcmsuYWNjb3VudHMuZGV2JA"
if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key');
}



createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
);
