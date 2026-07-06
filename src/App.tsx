

import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import NotFound from "./pages/not-found";
import Landing from "./pages/LandingPage";
import Restaurants from "./pages/Resturants";


import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
  );
}

export default App;
