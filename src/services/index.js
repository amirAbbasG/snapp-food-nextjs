import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

const http = axios.create({
    withCredentials: true
});


export default http;
