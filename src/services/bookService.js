import axios from "axios";
import authHeader from "../helpers/authHeader";

const API_URL = "http://localhost:8080/api/v1/book/";

const ADMIN_API_URL = "http://localhost:8080/api/v2/book/";

export default class BookService {

    getAll() {
        return axios.get(API_URL + "getAll", { headers: authHeader() });
    }

    findByName(name) {
        return axios.get(API_URL + `findByName/${name}`, { headers: authHeader() })
    }

    getRandomFiveBooks() {
        return axios.get(API_URL + "getRandomBooks", { headers: authHeader() });
    }

    async getBookImage(imageId) {
        const response = await axios.get(API_URL + `getBookImage/${imageId}`, {
            headers: authHeader(),
            responseType: 'arraybuffer'
        });
        const uint8Array = new Uint8Array(response.data);
        const base64Image = btoa(String.fromCharCode.apply(null, uint8Array));
        return `data:image/jpeg;base64,${base64Image}`;
    }

    addBook(book) {
        return axios.post(ADMIN_API_URL + "addBook", book, { headers: authHeader() })
    }

    updateBook(book) {
        return axios.put(ADMIN_API_URL + "updateBook", book, { headers: authHeader() })
    }

    deleteBook(bookId) {
        return axios.delete(ADMIN_API_URL + `deleteBook/${bookId}`, { headers: authHeader() })
    }
}