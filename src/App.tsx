import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ScenarioPage from "./pages/ScenarioPage";
import SwipePage from "./pages/SwipePage";
import JudgePage from "./pages/JudgePage";
import ExplorePage from "./pages/ExplorePage";
import TopicPage from "./pages/TopicPage";
import ProgressPage from "./pages/ProgressPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/scenario" element={<ScenarioPage />} />
          <Route path="/swipe" element={<SwipePage />} />
          <Route path="/judge" element={<JudgePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/topic/:id" element={<TopicPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
