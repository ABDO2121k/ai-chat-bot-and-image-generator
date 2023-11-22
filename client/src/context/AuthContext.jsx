import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const authContext = createContext(null);

axios.defaults.baseURL = "http://localhost:8000/api/";
axios.defaults.withCredentials = true;
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState( null );
  const [isLo, setLogged] = useState(false);

  const login = async (inputs) => {
    const res = await axios.post("/user/login", inputs);
    setCurrentUser(res.data);
    setLogged(true);
  };
  const signup = async (inputs) => {
    const res = await axios.post("/user/signup", inputs);
    if (!res) {
      throw new Error("Unable to register");
    }
  };



  const logout = async () => {
    await axios.get("/user/logout");
    setCurrentUser(null)
    setLogged(false);
    window.location.reload()
  };

  useEffect(() => {
    const checkAuth = async () => {
      const res = await axios.get("/user/auth-status");
      if (res.status !== 200) {
        throw new Error("Unable to authenticate");
      }
      const data = await res.data;
      if (data) {
        setCurrentUser(res.data);
        setLogged(true);
      }
    };
    checkAuth();
  }, []);

  const ChatR = async (message) => {
    const res = await axios.post("/chat/new", { message });
    if (!res) {
      throw new Error("Unable to send Chat");
    }
    const data = await res.data;
    return data;
  };

  const ChatI = async (message) => {
    const res = await axios.post("/img/newI", { message });
    if (!res) {
      throw new Error("Unable to send Chat");
    }
    const data = await res.data;
    return data;
  };
  
  const getChat = async () => {
    const res = await axios.post("/chat/getAll");
    if (!res) {
      throw new Error("Unable to get Chat");
    }
    const data = await res.data.chats;
    return data;
  };
  const getChatI = async () => {
    const res = await axios.post("/img/getAllI");
    if (!res) {
      throw new Error("Unable to get Chat");
    }
    const data = await res.data;
    return data;
  };

  return (
    <authContext.Provider value={{ currentUser,signup, login, logout, isLo, ChatR ,getChat,getChatI,ChatI}}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
