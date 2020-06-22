import jwt from "jwt-decode"

export const getUserFromToken = (token)=>{
    const user = jwt(token)
    return { email: user.email, id: user.id , fullName: user.fullName}
}

export const getAuthTokens = ()=>{
    return JSON.parse(localStorage.getItem("tokens"))
}

export const setAuthTokens = (token) =>{
    localStorage.setItem("tokens", JSON.stringify(token))
}

export const removeAuthTokens = ()=>{
    localStorage.removeItem("tokens")
}
