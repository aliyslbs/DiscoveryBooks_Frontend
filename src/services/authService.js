import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth/";


export default class AuthService{    

    register(registerRequest){
        return axios.post(API_URL + "register", registerRequest)
    }
    
    auth(authRequest){
        return axios.post(API_URL + "authenticate", authRequest)
    }
}