import { StrictMode } from 'react'
import { CartProvider } from './Context/CartContext.jsx'
import { createRoot } from 'react-dom/client'
import { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from "react-toastify";
import { AuthProvider } from './Context/authContext.jsx';
import "react-toastify/dist/ReactToastify.css";
import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
  <CartProvider>
   <QueryClientProvider client={queryClient}>
    <App />
    <ToastContainer />
    </QueryClientProvider>
  </CartProvider>
  </AuthProvider>
  </StrictMode>
)
