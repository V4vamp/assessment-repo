
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toast } from "./components/ui/toast";
import { TooltipProvider } from "./components/ui/tooltip";
import NotFound from "./pages/not-found";
import Landing from "./pages/LandingPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Favorites from "./pages/Favorites";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toast />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
