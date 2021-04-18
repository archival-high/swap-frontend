import {useSelector} from "react-redux";
import {RootState} from "../../../redux";
import {NodeDisplay} from "./display/node-display";
import {Button, Container} from "@material-ui/core";
import {useState} from "react";

type Props = {
    id: string
}
export function NodeById (props: Props){
    const {id} = props;
    const [children, setChildren] = useState<string[]>([]);
    const lookup = useSelector((state: RootState) => state.data.nodes);
    const linkTable = useSelector((state: RootState) => state.data.link);
    // console.log(linkTable);
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
        <div style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{
                display: 'flex',
            }}>
                <NodeDisplay node={node}/>
                <Button onClick={getChildren}>
                    Get Children
                </Button>
            </div>
            <Container>
                {children.map (child => (
                    <NodeById id={child}/>
                ))}
            </Container>
        </div>
    )
}