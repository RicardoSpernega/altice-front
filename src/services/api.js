import axios from "axios";
const api = axios.create({
  baseURL: "https://alticemeo.herokuapp.com",
});
export default api;