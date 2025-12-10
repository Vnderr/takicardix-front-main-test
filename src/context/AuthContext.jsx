import React, { createContext, useContext, useState, useEffect } from "react";
import UsuarioService from "../services/Usuario";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const cartData = localStorage.getItem("cart");

    if (userData) {
      setUser(JSON.parse(userData));
    }
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      console.log("🔐 Intentando login con:", credentials); 
      const userData = await UsuarioService.login(credentials);
      console.log("✅ Login exitoso, usuario:", userData); 

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      console.log("🔄 Estado user actualizado:", userData); 
      return userData;
    } catch (error) {
      console.error("❌ Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setUser(null);
    setCart([]);
    window.location.href = "/";
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.producto_id === product.producto_id
      );
      let newCart;

      if (existingItem) {
        newCart = prevCart.map((item) =>
          item.producto_id === product.producto_id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, cantidad: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (producto_id) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter(
        (item) => item.producto_id !== producto_id
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateCartQuantity = (producto_id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(producto_id);
      return;
    }

    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item.producto_id === producto_id
          ? { ...item, cantidad: newQuantity }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.cantidad, 0);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    isAdmin: user?.rol?.rol_id === 1,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
