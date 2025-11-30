import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <link rel="icon" type="image/png" href="/favicon.ico"></link>
      <App />
  </StrictMode>
);
