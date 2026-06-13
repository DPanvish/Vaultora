import axios from "axios";
import { Platform } from "react-native";

const getBaseUrl = (): string => {
    // if(Platform.OS === "android"){
    //     return "http://10.0.2.2:5000/api";
    // }

    return "http://localhost:5000/api";
};

export const api = axios.create({
    baseURL: getBaseUrl(),
    headers: {
        "Content-Type": "application/json",
    },
});