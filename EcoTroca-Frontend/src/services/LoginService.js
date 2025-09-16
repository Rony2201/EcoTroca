import api from "./api.js";

export const login = async (email, password) => {
    const response = await api.post("/auth/login", {
        email,
        password,
    });
    if(response.data.token) {
        localStorage.setItem("token", response.data.token);
    }

    return response.data;
}