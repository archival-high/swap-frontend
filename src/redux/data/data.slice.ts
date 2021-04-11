import {createSlice} from "@reduxjs/toolkit";
import {initialState} from "./data.const";

const dataSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {
        putNode: (state, action) => {
            const node = action.payload;
            state.nodes[node._id] = node;
        },
        removeNode: (state, action) => {
            const id = action.payload;
            delete state.nodes[id];
        }
    }
});

export default dataSlice.reducer;
export const {putNode, removeNode} = dataSlice.actions;
