import {NodeComponentProps} from "../../type/node.type";
import {NodeDisplay} from "../display/node-display";
import {Draggable} from "../../../../components/draggable";
import {DropZone} from "../../../../components/drop-zone";
import {useDispatch} from "react-redux";
import {setParent} from "../../../../redux/data";

export function NodeDraggable(props: NodeComponentProps) {
    const {node} = props;
    const {_id} = node;
    const dispatch = useDispatch();
    return (
        <DropZone onDrop={e => {
            const fromId = e.dataTransfer?.getData('text/plain');
            if (fromId){
                dispatch(setParent({child: fromId, parent: _id}));
            }
        }}>
            <Draggable onDragStart={e => e.dataTransfer.setData('text/plain', _id)}>
                <NodeDisplay node={node}/>
            </Draggable>
        </DropZone>
    )
}