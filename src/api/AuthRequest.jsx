import axios from "axios";
const URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const API = axios.create({ baseURL: URL });

export const loginAPI = async (phone_number, password) =>
  API.post("/accounts/token/", { phone_number, password });

export const loginProfileAPI = async (token) =>
  API.get("/accounts/profile/", {
    headers: { Authorization: "Bearer " + token },
  });
