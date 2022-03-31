import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api/";

const http = axios.create();

if (typeof window !== 'undefined') {

const token = localStorage.getItem("token") || ""


http.defaults.headers.common["Authorization"] = token
}

export default http;
