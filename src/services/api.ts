import axios from "axios";

export const api = axios.create({
  
  baseURL: "http://localhost:3001", //aqui vai ficar a URL da API

  headers: {
    "Content-Type": "application/json",
  },
});
