import { request } from "@/plugins/request";

export const login = data => {
    return request({
        method: "POST",
        url: "/api/users/login",
        data
    });
}

export const register = data => {
    return request({
        method: "POST",
        url: "/api/users",
        data
    });
}

// 更新用户信息
export const updateUser = data => {
    return request({
        method: "PUT",
        url: "/api/user",
        data
    });
}

