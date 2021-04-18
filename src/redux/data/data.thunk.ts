import {Dispatch} from "redux";
import {Node} from "../../module/node/type/node.type"
import {addLink, putNode, setPreset, setRoot} from "./data.slice";
import {NodeApi} from "../../api/node";
import {Type} from "../../module/node/type/node.type";
import {PresetApi} from "../../api/presets";

export function grabAll() {
    return (dispatch: Dispatch) => {
        return NodeApi.Query.getAll().then(res => {
            res.data.data.forEach((node: Node) => {
                dispatch(putNode(node));
            })
        })
    }
}

export function createNew(oneLine: string) {
    return (dispatch: Dispatch) => {
        return NodeApi.Restful.createNode()
            .then(res => {
                return NodeApi.Restful.editNode(res.data.data._id, {
                    title: oneLine,
                    type: Type.DUMP
                })
            })
            .then((res) => {
                dispatch(putNode(res.data.data));
            }).catch(err => {
                console.error(err);
            })
    }
}

type SetParentInput = { child: string, parent: string };

export function setParent(input: SetParentInput) {
    const {child, parent} = input;
    return async (dispatch: Dispatch) => {
        await NodeApi.Action.setParent({
            from: child,
            to: parent,
            target: null
        }).then(res => {
            console.log(res.data);
        }).catch (e => {
            console.log(e);
        })
        return;
    }
}

export function createPreset() {
    return (dispatch: Dispatch) => {
        return PresetApi.Action.create()
            .then(res => {
                res.data.data.forEach((node: Node) => {
                    dispatch(putNode(node));
                })
            })
    }
}

export function getPreset() {
    return (dispatch: Dispatch) => {
        return PresetApi.Query.getAll()
            .then(res => {
                res.data.data.forEach((node: Node) => {
                    dispatch(putNode(node));
                    if (node._title === "_root"){
                        dispatch(setRoot(node._id));
                    }
                    if(node._children){
                        node._children.forEach(c => {
                            dispatch(addLink({from: node._id, to: c._id}))
                        })
                    }
                    dispatch(setPreset({title: node._title, _id: node._id}))
                })
            })
    }
}