import Cookies from "js-cookie";

const isUserAuthenticated = () => {
    const token = getAuthToken();

    if(!token) {
        setToken(null);
        return false;
    }

    return true;
}

const getAuthToken = () => {
    const access = Cookies.get("access");
    return access
}
const getRefreshToken = () => {
    const refresh = Cookies.get("refresh");
    return refresh
}

const setToken = (token) => {
    if(token?.access) {
        Cookies.set("access", token?.access);
    } else {
        Cookies.remove("access");
    }

    if(token?.refresh) {
        Cookies.set("refresh", token?.refresh);
    }
}

export { isUserAuthenticated, getAuthToken, getRefreshToken, setToken };