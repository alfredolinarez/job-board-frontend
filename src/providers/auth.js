import { createContext, useContext, useEffect, useState } from "react";
import client from "./api";

const Context = createContext({
  token: "",
  user: null,
  login: () => {},
  logout: () => {},
});
export const useAuth = () => useContext(Context);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));
  
  const refreshUser = async() => {
    try{
      const response = await client.get("/auth/me", {headers: {Authorization: `Bearer ${token}`}})
      setUser(response.data.data)
      localStorage.setItem("user", JSON.stringify(response.data.data))
    } catch (error){
      logout()
      console.error(error);
    }
  }

  const login = async(token) => {
    try {
      setToken(token);      
      localStorage.setItem("token", token);      
    } catch (error){
      logout()
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
  };

  useEffect(()=>{
    if (token){
      refreshUser();
    }
  }, [token])

  return (
    <Context.Provider value={{ user, token, login, logout }}>
      {children}
    </Context.Provider>
  );
};

export default AuthProvider;
