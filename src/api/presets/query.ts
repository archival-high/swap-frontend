import axios from 'axios';
const baseURL = `${process.env.REACT_APP_API_BASE_URL}/preset`;
const instance = axios.create({
    baseURL,
});

export class PresetQuery {
    static async getAll(){
        return await instance.get(`/`);
    }
}