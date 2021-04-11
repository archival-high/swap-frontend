import logo from './logo.svg';
import './App.css';
import {SyntheticEvent, useEffect, useState} from 'react';
import {NodeApi} from "./api/node";
import {Button, Container, Input, Typography} from "@material-ui/core";
import {DropZone} from "./components/drop-zone";
import {GreySquare, RedSquare} from "./components/square";
import {Draggable} from "./components/draggable";
import {useDispatch, useSelector} from "react-redux";
import {grabAll, putNode} from "./redux/data";
import {NodeDisplay} from "./module/node/components/display/node-display";
import {RootState} from "./redux";
import {NodeLookup} from "./redux/data/data.types";
import {TypeArea} from "./components/type-area";

function App() {

    const dispatch = useDispatch();
    const lookup: NodeLookup = useSelector((state: RootState) => state.data.nodes);
    const data = Object.values(lookup).filter(d => !!d.title || !!d.preview)

    const [value, setValue] = useState('');
    const [dump, setDump] = useState('');
    const [text, setText] = useState('');

    // const grabAll = () => {
    //     // NodeApi.Query.getAll()
    //     //     .then(res => {
    //     //         setDump(JSON.stringify(res.data.data, null, 3));
    //     //     })
    //     dispatch(grabAll)
    // }

    const createAndEdit = async () => {
        const res = await NodeApi.Restful.createNode();
        console.log(res);
        const id = res.data.data._id;
        const editRes = await NodeApi.Restful.editNode(id, {
            title: value,
            type: "dump"
        });
        console.log(editRes);
        setDump(JSON.stringify(editRes, null, 3))
    }
    return (
        <Container>
            <Typography>Hello</Typography>
            <Input onChange={e => setValue(e.target.value)} value={value}/>
            <Button onClick={createAndEdit}>
                Submit
            </Button>
            <Draggable onDragStart={(e: DragEvent) => e.dataTransfer?.setData('text/plain', 'red')}>
                <RedSquare/>
            </Draggable>
            <DropZone onDrop={(e: DragEvent) => setText(e.dataTransfer?.getData('text/plain') || '')}>
                <GreySquare/>
                <Typography>{text}</Typography>
            </DropZone>
            <Button onClick={()=>dispatch(grabAll())}>
                Grab All
            </Button>
            <Container>
                {data.map (node => (
                    <NodeDisplay key={node._id} node={node}/>
                ))}
            </Container>
            <TypeArea/>
        </Container>
    );
}

export default App;
