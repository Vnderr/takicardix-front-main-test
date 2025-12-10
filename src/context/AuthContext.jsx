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
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    const cartData = localStorage.getItem("cart");

    if (savedToken) setToken(savedToken);

    if (rawUser && rawUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(rawUser);
        setUser(parsedUser);
      } catch (e) {
        console.error(" Error al parsear user:", e);
        localStorage.removeItem("user");
        setUser(null);
      }
    }

    if (!rawUser && savedToken) {
      (async () => {
        try {
          const me = await UsuarioService.me(savedToken);
          if (me) {
            localStorage.setItem("user", JSON.stringify(me));
            setUser(me);
          }
        } catch (e) {
          console.warn("No se pudo recuperar el usuario con /me:", e);
          localStorage.removeItem("token");
          setToken(null);
        } finally {
          setLoading(false);
        }
      })();
      return;
    }

    if (cartData && cartData !== "undefined") {
      try {
        setCart(JSON.parse(cartData));
      } catch (e) {
        console.error("Error al parsear cart:", e);
      }
    }

    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      console.log("Intentando login con:", credentials);

      const { token: newToken, usuario } = await UsuarioService.login(credentials);

      console.log("Login exitoso, usuario:", usuario);

      if (usuario) {
        localStorage.setItem("user", JSON.stringify(usuario));
        setUser(usuario);
      } else {
        console.warn("usuario vacío, no se guardó en localStorage");
      }

      if (newToken) {
        localStorage.setItem("token", newToken);
        setToken(newToken);
      }

      console.log("Estado user/token actualizado:", usuario, newToken);
      return usuario;
    } catch (error) {
      console.error(" Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    setUser(null);
    setToken(null);
    setCart([]);
    window.location.href = "/login";
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
    token,
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

    isAdmin:
      user?.rol === "ADMIN" ||
      user?.rol === "ROLE_ADMIN" ||
      (typeof user?.rol?.nombre === "string" &&
        user.rol.nombre.toUpperCase() === "ADMIN") ||
      user?.rol?.rol_id === 1,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
