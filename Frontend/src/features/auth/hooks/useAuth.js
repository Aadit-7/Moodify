import { login, logout, getMe, register } from "../services/auth.api";
import { AuthContext } from "../auth.context";
import { useContext, useEffect } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  async function handleRegister({ username, email, password }) {
    setLoading(true);
    const data = await register({ username, email, password });
    setUser(data.user);
    setLoading(false);
  }
  async function handleLogin({ username, email, password }) {
    setLoading(true);
    const data = await login({ username, email, password });
    setUser(data.user);
    setLoading(false);
  }
  async function handleGetMe() {
    setLoading(true);
    const data = await getMe();
    setUser(data.user);
    setLoading(false);
  }
  async function handleLogout() {
    setLoading(true);
    const data = await logout();
    setUser(null);
    setLoading(false);
  }

  useEffect(()=>{
    handleGetMe();
  },[])

  return {
    user,
    loading,
    handleGetMe,
    handleLogin,
    handleLogout,
    handleRegister,
  };
};
