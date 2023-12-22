import axios from "axios";
import { baseURL } from "../../../config/config";

const axiosInstance = axios.create({
    headers:{
        'Content-Type':'application/json',
        Accept: 'application/json',
    },
    baseURL
});

export default axiosInstance;