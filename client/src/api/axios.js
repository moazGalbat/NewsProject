import axios from 'axios'


// const headers = {
//     'Authorization': `${JSON.parse(localStorage.getItem("tokens"))}`
// }

// console.log(headers);

const instance = axios.create();

instance.interceptors.request.use((config)=>{
    config.headers.Authorization = `${JSON.parse(localStorage.getItem("tokens"))}`;
    return config;
})

instance.interceptors.response.use((response) => {
    return response;
  }, error => {
    if (error.response.status === 401 ){
        window.location.href="/login"
    }
    else {
      return Promise.reject(error)
    }
  })

export default instance;