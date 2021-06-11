import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux";
import {NodeDisplay} from "./display/node-display";
import {Box, Button, Container} from "@material-ui/core";
import {useState} from "react";
import {deserialize} from "class-transformer";
import {setParent} from "../../../redux/data";
import {Draggable} from "../../../components/draggable";
import {DropZone} from "../../../components/drop-zone";

type Props = {
    id: string
}

export function NodeById(props: Props) {
    const {id} = props;
    const [children, setChildren] = useState<string[]>([]);
    const lookup = useSelector((state: RootState) => state.data.nodes);
    const linkTable = useSelector((state: RootState) => state.data.backlink);
    const dispatch = useDispatch();
    // console.log(linkTable);
    // console.log(id);
    // if (!id){
    //     return null;
    // }
    const node = lookup[id];
    // console.log(id);
    // console.log(node);
    const getChildren = () => {
        const c = Object.entries(linkTable?.[id] || {}).filter(([k, v]) => !!v).map(([k, v]) => k);
        console.log("c", c);
        setChildren(c);
    }
    return (
        <Container>
            <Box flexDirection={'row'} display={'flex'}>
                <NodeDisplay node={node}/>
                <Button onClick={getChildren}>
                    Get Children
                </Button>
            </Box>
            <Container>
                {children.map(child => (
                    <NodeById id={child} key={child}/>
                ))}
            </Container>
        </Container>
    )
}

//https://codesandbox.io/s/j4yvnr7n83?file=/src/questions.js