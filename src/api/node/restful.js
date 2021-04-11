import axios from 'axios';
const baseURL = `${process.env.REACT_APP_API_BASE_URL}/nodes`;
const instance = axios.create({
    baseURL,
});

export class NodeRestful {
    static async createNode(){
        return await instance.post('/');
    }

    static async getNode(id){
        return await instance.get(id);
    }

    static async editNode(id, updates){
        return await instance.patch(id, updates);
    }

    static async deleteNode(id){
        return await instance.delete(id);
    }
}