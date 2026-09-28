import { API_URL } from '../config/api';
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/auth/me`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        setUser(null);
        return;
      }

      const data = await response.json();

      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const handleAuthChange = (event) => {
  if (event.key !== "zentro_auth") return;

  const authChange = JSON.parse(event.newValue);

  if (authChange.action === "logout") {
    setUser(null);
    return;
  }

  if (authChange.action === "login") {
    checkAuth();
  }
};

    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const updateAuthState = (value) => {
    setUser(value);

    localStorage.setItem(
      "zentro_auth",
      JSON.stringify({
        action: value ? "login" : "logout",
        timestamp: Date.now(),
      })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        checkAuth,
        updateAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};