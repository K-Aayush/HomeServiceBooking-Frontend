import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContextProvider.tsx";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    afterSignOutUrl="/"
    afterSignInUrl={"/"}
    afterSignUpUrl={"/"}
  >
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </ClerkProvider>
);
