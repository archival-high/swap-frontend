import {Node} from "../../module/node/type/node.type"

export type NodeLookup = {
    [key: string]: Node
}

export type DoubleIdLookup = {
    [key: string]: {
        [key: string]: boolean
    }
}

export type IdLookup = {
    [key: string]: string
}

export type InitialState = {
    nodes: NodeLookup,
    link: DoubleIdLookup,
    backlink: DoubleIdLookup,
    root: string | null,
    preset: IdLookup
}