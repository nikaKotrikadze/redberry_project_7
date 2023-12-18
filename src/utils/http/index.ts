import axios from "axios";
import { BASE } from "../API";

export const $api = axios.create({
  baseURL: BASE,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
  },
});
