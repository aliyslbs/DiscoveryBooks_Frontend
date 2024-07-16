import axios from "axios";
import authHeader from "../helpers/authHeader"

const API_URL = "http://localhost:8080/api/v1/user/";


export default class UserService {
    findUserWithToken() {
        return axios.get(API_URL + "findUserWithToken", { headers: authHeader() });
    }

    async getUserImage(imageId) {
        return await axios.get(API_URL + `getUserImage/${imageId}`, {
            headers: authHeader(),
            responseType: 'arraybuffer'
        }).then(response => {
            const uint8Array = new Uint8Array(response.data);
            const base64Image = btoa(String.fromCharCode.apply(null, uint8Array));
            return `data:image/jpeg;base64,${base64Image}`;
        })
    }
}