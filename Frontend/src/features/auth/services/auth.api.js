import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function register({ username, email, password }) {
  const respose = await api.post("/api/auth/register", {
    username,
    email,
    password,
  });

  return respose.data;
}

export async function login({ username, email, password }) {
  const respose = await api.post("/api/auth/login", {
    username,
    email,
    password,
  });

  return respose.data;
}

export async function getMe() {
  const respose = await api.get("/api/auth/get-me");

  return respose.data;
}

export async function logout() {
  const respose = await api.get("/api/auth/logout");

  return respose.data;
}
