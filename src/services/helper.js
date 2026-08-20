import axios from "axios";
import { getToken } from "../auth";

export const BASE_URL = 'http://localhost:8080/api/v1';

export const myAxios = axios.create({
    baseURL:BASE_URL,
});

// for token - used in AddPost.jsx
export const privateAxios = axios.create({
    baseURL:BASE_URL,

    // /////////////////////////////////////////////////////////////////////////////

    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    
        Accept: 'application/json',
      },

// //////////////////////////////////////////////////////////////////////////////////

});
// will get token from index.js
privateAxios.interceptors.request.use((config)=>{
    const token = getToken();
    // console.log(token)
    if(token){
        // ----------------------user this-------back stick-
        // config.headers.common.Authorization= `Bearer ${token}`; 
        // -----------------------use this----------back stick------
        config.headers['Authorization'] = `Bearer ${token}`;
        // return config
        // console.log(config);
    }
    return config;
},
(error)=>Promise.reject(error)
);