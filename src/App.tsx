/* ===============================
   /src/integrations/firebase/client.ts
   =============================== */

   import { initializeApp } from "firebase/app";
   import { getAuth } from "firebase/auth";
   
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
   };
   
   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   
   
   /* ===============================
      /src/App.tsx
      =============================== */
   
   import { Toaster } from "@/components/ui/sonner";
   import { TooltipProvider } from "@/components/ui/tooltip";
   import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
   import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
   import { useState, useEffect } from "react";
   import { onAuthStateChanged, getIdToken, User as FirebaseUser } from "firebase/auth";
   import { auth } from "@/integrations/firebase/client";
   
   import Index from "./pages/Index";
   import Trade from "./pages/Trade";
   import Portfolio from "./pages/Portfolio";
   import News from "./pages/News";
   import Community from "./pages/Community";
   import Settings from "./pages/Settings";
   import Auth from "./pages/Auth";
   import BrokerIntegration from "./pages/BrokerIntegration";
   import Chatbot from "./pages/Chatbot";
   import NotFound from "./pages/NotFound";
   import { ThemeProvider } from "./components/ThemeProvider";
   import { FinancialDataProvider } from "./contexts/FinancialDataContext";
   import SplashScreen from "./components/SplashScreen";
   
   const queryClient = new QueryClient();
   
   const App = () => {
     const [showSplash, setShowSplash] = useState(true);
     const [user, setUser] = useState<FirebaseUser | null>(null);
     const [token, setToken] = useState<string | null>(null);
     const [loading, setLoading] = useState(true);
   
     const handleSplashComplete = () => {
       setShowSplash(false);
     };
   
     const handleLogin = () => {};
   
     useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, async (user) => {
         setUser(user);
         const idToken = user ? await getIdToken(user) : null;
         setToken(idToken);
         setLoading(false);
       });
   
       return () => unsubscribe();
     }, []);
   
     const sendToDjangoAPI = async () => {
       if (!token || !user) return;
   
       const res = await fetch("http://localhost:8000/api/auth/signup/", {
         method: "POST",
         headers: {
           Authorization: `Bearer ${token}`,
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           email: user.email,
           display_name: user.displayName || "",
         }),
       });
   
       if (!res.ok) {
         console.error("Failed to sync with backend", await res.json());
       }
     };
   
     useEffect(() => {
       sendToDjangoAPI();
     }, [token, user]);
   
     if (loading) {
       return (
         <div className="min-h-screen bg-primary flex items-center justify-center">
           <div className="text-off-white">Loading...</div>
         </div>
       );
     }
   
     return (
       <QueryClientProvider client={queryClient}>
         <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
           <TooltipProvider>
             <Toaster />
             <BrowserRouter>
               {showSplash ? (
                 <SplashScreen onComplete={handleSplashComplete} />
               ) : (
                 <FinancialDataProvider>
                   <Routes>
                     {user ? (
                       <>
                         <Route path="/" element={<Index />} />
                         <Route path="/trade" element={<Trade />} />
                         <Route path="/portfolio" element={<Portfolio />} />
                         <Route path="/news" element={<News />} />
                         <Route path="/community" element={<Community />} />
                         <Route path="/settings" element={<Settings />} />
                         <Route path="/broker-integration" element={<BrokerIntegration />} />
                         <Route path="/chatbot" element={<Chatbot />} />
                         <Route path="/auth" element={<Navigate to="/" replace />} />
                       </>
                     ) : (
                       <>
                         <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
                         <Route path="*" element={<Navigate to="/auth" replace />} />
                       </>
                     )}
                     <Route path="*" element={<NotFound />} />
                   </Routes>
                 </FinancialDataProvider>
               )}
             </BrowserRouter>
           </TooltipProvider>
         </ThemeProvider>
       </QueryClientProvider>
     );
   };
   
   export default App;
   