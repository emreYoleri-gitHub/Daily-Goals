import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

/* User Actions */

export const signIn = async (userData) =>
  await API.post("/users/signin", userData);

export const signUp = async (userData) =>
  await API.post("/users/signup", userData);

export const signOut = async (id) => await API.get(`/users/signout/${id}`);

/* Goal Actions */

export const createGoalProgram = async (programData) => await API.post("/goals/create", programData)
