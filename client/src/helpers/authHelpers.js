import jwt from "jwt-decode"

export const getUserFromToken = (token)=>{
    const user = jwt(token)
    return { email: user.email, id: user.id}
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

// export const verifyTokenExpiration = ()=>{
//     let isExpired = false;
//     const token = localStorage.getItem('tokens');
//     const decodedToken=jwt(token);
//     const dateNow = new Date();
//     console.log(decodedToken.exp*1000,dateNow.getTime() )
//     if(decodedToken.exp *1000 < dateNow.getTime()){
//         isExpired = true;
//     }
//     return isExpired;
// }