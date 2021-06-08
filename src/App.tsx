import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import {NodeApi} from "./api/node";
import {Button, Container, Input, Typography} from "@material-ui/core";
import {DropZone} from "./components/drop-zone";
import {GreySquare, RedSquare} from "./components/square";
import {Draggable} from "./components/draggable";
import {useDispatch, useSelector} from "react-redux";
import {createPreset, getPreset, grabAll} from "./redux/data";
import {RootState} from "./redux";
import {TypeArea} from "./components/type-area";
import {NodeById} from "./module/node/components/node-by-id";

function App() {

    const dispatch = useDispatch();
    const root = useSelector((state: RootState) => state.data.root);
    console.log(root)
    const presetLookup = useSelector((state: RootState) => state.data.preset);
    console.log(presetLookup);
    const [value, setValue] = useState('');
    const [dump, setDump] = useState('');
    const [text, setText] = useState('');

    const createAndEdit = async () => {
        const res = await NodeApi.Restful.createNode();
        console.log(res);
        const id = res.data.data._id;
        const editRes = await NodeApi.Restful.editNode(id, {
            _title: value
        });
        const dump = presetLookup["_dump"];
        await NodeApi.Action.setParent({
            from: id,
            to: dump,
            target: null
        });
        // await NodeApi.Action.setParent({})
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
            <Draggable onDragStart={e => e.dataTransfer?.setData('text/plain', 'red')}>
                <RedSquare/>
            </Draggable>
            <DropZone onDrop={e => setText(e.dataTransfer?.getData('text/plain') || '')}>
                <GreySquare/>
                <Typography>{text}</Typography>
            </DropZone>
            <Button onClick={() => dispatch(grabAll())}>
                Grab All
            </Button>
            <Button onClick={() => dispatch(createPreset())}>
                Create Preset
            </Button>
            <Button onClick={() => dispatch(getPreset())}>
                Get Preset
            </Button>
            {
                root && <Container><NodeById id={root}/></Container>
            }
            <TypeArea/>
        </Container>
    );
}

export default App;
