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

// 或许用户信息
export const getProfile = username => {
    return request({
        method: "GET",
        url: `/api/profiles/${username}`
    });
}

// 关注用户
export const followUser = username => {
    return request({
        method: "POST",
        url: `/api/profiles/${username}/follow`
    });
}

// 取关用户
export const unfollowUser = username => {
    return request({
        method: "DELETE",
        url: `/api/profiles/${username}/follow`
    });
}
