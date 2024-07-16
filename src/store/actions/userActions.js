export const LOGINUSER = "LOGINUSER";
export const LOGOUTUSER = "LOGOUTUSER";

export function loginUser(user) {
    return {
        type: LOGINUSER,
        payload: user
    };
}

export function logoutUser() {
    return {
        type: LOGOUTUSER
    };
}