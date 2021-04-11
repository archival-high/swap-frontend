import {Node} from "../../module/node/type/node.type"

export type NodeLookup = {
    [key: string]: Node
}

export type InitialState = {
    nodes: NodeLookup
}