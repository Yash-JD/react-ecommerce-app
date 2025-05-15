import axios from "axios";
import { getCookie } from "../utils/helper";

const token = getCookie();

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // for cookies if your backend uses them
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default API;
