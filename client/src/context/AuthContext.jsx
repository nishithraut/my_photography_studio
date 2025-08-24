import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ loading: true, loggedIn: false });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get("http://localhost:3002/checkAuth", {
          withCredentials: true,
        });
        setAuth({ loading: false, loggedIn: data.loggedIn });
      } catch (err) {
        setAuth({ loading: false, loggedIn: false });
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
