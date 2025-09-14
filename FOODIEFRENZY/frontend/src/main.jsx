import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { AuthProvider } from "./Provider/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
      <StrictMode>
        <Toaster />
        <RouterProvider router={router} />
      </StrictMode>
    </CartProvider>
  </AuthProvider>
);
