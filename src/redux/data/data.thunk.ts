import {Dispatch} from "redux";

import {putNode} from "./data.slice";
import {NodeApi} from "../../api/node";
import {Type} from "../../module/node/type/node.type";

export function grabAll() {
    return (dispatch: Dispatch) => {
        return NodeApi.Query.getAll().then(res => {
            res.data.data.forEach((node: Node) => {
                dispatch(putNode(node));
            })
        })
    }
}

export function createNew(oneLine: string){
    return (dispatch: Dispatch) => {
        return NodeApi.Restful.createNode()
            .then(res => {
                return NodeApi.Restful.editNode(res.data.data._id, {
                    title: oneLine,
                    type: Type.DUMP
                })
            })
            .then ((res) => {
                dispatch(putNode(res.data.data));
            }).catch (err => {
                console.error(err);
            })
    }
}