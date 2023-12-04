import axios from "axios";
import Cookies from 'js-cookie';
import { baseURL } from "../../../config/config";

const axiosInstance = axios.create({
    headers:{
        'Content-Type':'application/json',
        Accept: 'application/json',
    },
    baseURL
});

axiosInstance.interceptors.request.use((config) => {
	const config2 = config;
	const { jwtToken } = Cookies.get();
	config2.headers.Authorization = `Bearer ${jwtToken}`;
	return config2;
});

export default axiosInstance;