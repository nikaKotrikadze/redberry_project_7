import axios from "axios";
import { BASE } from "../API";

export const $api = axios.create({
  baseURL: BASE,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
    "Access-Control-Allow-Headers":
      "Content-Type, X-Auth-Token, Origin, Authorization",
    credentials: true,

    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
  },
});
