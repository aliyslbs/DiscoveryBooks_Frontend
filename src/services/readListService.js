import axios from "axios";
import authHeader from "../helpers/authHeader"

const API_URL = "http://localhost:8080/api/v1/readList/";


export default class ReadListService {
    getAllByUserId(userId) {
        return axios.get(API_URL + `getAllByUserId/${userId}`, { headers: authHeader() });
    }

    addToReadList(readListDto) {
        return axios.post(API_URL + "addReadList", readListDto, { headers: authHeader() })
    }

    removeFromReadList(readListId) {
        return axios.delete(API_URL + `deleteById/${readListId}`, { headers: authHeader() })
    }
}