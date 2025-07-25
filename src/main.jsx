import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from "axios"; // ✅ Required to set axios defaults
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
 
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  
);
