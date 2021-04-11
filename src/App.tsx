import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import {NodeApi} from "./api/node";
import {Button, Container, Input, Typography} from "@material-ui/core";
import {DropZone} from "./components/drop-zone/index";
import {GreySquare, RedSquare} from "./components/square";
import {Draggable} from "./components/draggable";

function App() {
    const [value, setValue] = useState('');
    const [dump, setDump] = useState('');
    const [text, setText] = useState('');

    const grabAll = () => {
        NodeApi.Query.getAll()
            .then(res => {
                setDump(JSON.stringify(res.data.data, null, 3));
            })
    }
    return (
        <Container>
            <Typography>Hello</Typography>
            <Input onChange={e => setValue(e.target.value)} value={value}/>
            <Button onClick={async () => {
                const res = await NodeApi.Restful.createNode();
                console.log(res);
                const id = res.data.data._id;
                const editRes = await NodeApi.Restful.editNode(id, {
                    title: value,
                    type: "dump"
                });
                console.log(editRes);
                setDump(JSON.stringify(editRes, null, 3))
            }}>
                Submit
            </Button>
            <Draggable onDragStart={e => e.dataTransfer.setData('text/plain', 'red')}>
                <RedSquare/>
            </Draggable>
            <DropZone onDrop={e => setText(e.dataTransfer.getData('text/plain'))}>
                <GreySquare/>
                <Typography>{text}</Typography>
            </DropZone>
            <Button onClick={grabAll}>
                Grab All
            </Button>
            <Typography>
                {dump}
            </Typography>
        </Container>
    );
}

export default App;
