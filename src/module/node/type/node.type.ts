export type IsoString = string

export enum Type {
    DUMP = 'dump'
}

export type Node = {
    _id: string,
    _created_at?: IsoString,
    _is_enabled?: boolean,
    _updated_at?: IsoString,
    type: Type
    title?: string,
    preview?: string,
    data?: string
}