import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import GeminiProvider from "@/components/chatbot/GeminiProvider";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Scholarships from "./pages/Scholarships";
import Fundraising from "./pages/Fundraising";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import TestChatbot from "./test-chatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LazyMotion features={domAnimation}>
      <TooltipProvider>
        <BrowserRouter>
          <GeminiProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/scholarships" element={<Scholarships />} />
              <Route path="/fundraising" element={<Fundraising />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/test-chatbot" element={<TestChatbot />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </GeminiProvider>
        </BrowserRouter>
      </TooltipProvider>
    </LazyMotion>
  </QueryClientProvider>
);

export default App;
