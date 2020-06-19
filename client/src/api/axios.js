import axios from 'axios'


const headers = {
    'Authorization': `${JSON.parse(localStorage.getItem("tokens"))}`
}

const instance = axios.create({
    headers
});

export default instance;