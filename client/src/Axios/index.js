import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export const signIn = async (userData) =>
  await API.post("/users/signin", userData);

export const signUp = async (userData) =>
  await API.post("/users/signup", userData);

export const signOut = async (id) => API.get(`/users/signout/${id}`);
