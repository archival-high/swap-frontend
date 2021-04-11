import axios from 'axios';
const baseURL = `${process.env.REACT_APP_API_BASE_URL}/nodes`;
const instance = axios.create({
    baseURL,
});

export class NodeQuery {
    static async getByTitle(title){
        return await instance.get(`/title/${title}`);
    }

    static async getAll(){
        return await instance.get(`/all`);
    }
}