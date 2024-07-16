import axios from "axios";
import authHeader from "../helpers/authHeader"

const API_URL = "http://localhost:8080/api/v1/writer/";

const ADMIN_API_URL = "http://localhost:8080/api/v2/writer/";


export default class WriterService {
    getAll() {
        return axios.get(API_URL + "getAll", { headers: authHeader() });
    }

    findByName(name) {
        return axios.get(API_URL + `findByName/${name}`, { headers: authHeader() });
    }

    async getWriterImage(imageId) {
        return await axios.get(API_URL + `getWriterImage/${imageId}`, {
            headers: authHeader(),
            responseType: 'arraybuffer'
        }).then(response => {
            const uint8Array = new Uint8Array(response.data);
            const base64Image = btoa(String.fromCharCode.apply(null, uint8Array));
            return `data:image/jpeg;base64,${base64Image}`;
        });
    }

    addWriter(writer) {
        return axios.post(ADMIN_API_URL + "addWriter", writer, { headers: authHeader() });
    }

    updateWriter(writer) {
        return axios.put(ADMIN_API_URL + "updateWriter", writer, { headers: authHeader() });
    }

    deleteWriter(id) {
        return axios.delete(ADMIN_API_URL + `deleteWriter/${id}`, { headers: authHeader() });
    }
}