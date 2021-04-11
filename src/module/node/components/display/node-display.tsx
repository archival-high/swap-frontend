import {Node} from "../../type/node.type";
import {Container, Typography} from "@material-ui/core";
import React from "react";

type Props = {
    node: Node
}

export function NodeDisplay(props: Props) {
    const {
        node: {
            title,
            preview,
            data
        }
    } = props;
    const inner = [title, preview, data].filter(x => !!x);
    return (
        <Container style={{border: '1px solid black'}}>
            {inner.map(i => (
                <Typography>
                    {i}
                </Typography>
            ))}
        </Container>
    )
}