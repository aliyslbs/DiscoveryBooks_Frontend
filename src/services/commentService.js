import axios from "axios";
import authHeader from "../helpers/authHeader"

const API_URL = "http://localhost:8080/api/v1/comment/";


export default class CommentService {
    addComment(comment) {
        return axios.post(API_URL + "addComment", comment, { headers: authHeader() });
    }

    getAllByBookId(bookId){
        return axios.get(API_URL + `getAllByBookId/${bookId}`, { headers: authHeader() })
    }
}