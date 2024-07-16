import axios from "axios";
import authHeader from "../helpers/authHeader"

const API_URL = "http://localhost:8080/api/v1/rating/";


export default class RatingService {
    getAllRating(bookId) {
        return axios.get(API_URL + `getAllByBookId/${bookId}`, { headers: authHeader() });
    }

    giveRating(rating) {
        return axios.post(API_URL + "giveRating", rating, { headers: authHeader() })
    }
}