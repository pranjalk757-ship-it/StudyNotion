import axios from "axios";

export const axiosinstance = axios.create({});

export const apiconnector = (method,url,bodydata,headers,params)=>{
    return axiosinstance({
        method: `${method}`,
        url: `${url}`,
        data: bodydata ? bodydata : {},
        headers: headers ? headers : {},
        params: params ? params : {}
    })
}