import React from "react";
import {Container, Typography} from "@material-ui/core";
import {NodeComponentProps} from "../../type/node.type";

export function NodeDisplay(props: NodeComponentProps) {
    const {
        node: {
            _title,
            preview,
            data
        }
    } = props;
    const inner = [_title, preview, data].filter(x => !!x);
    return (
        <Container style={{border: '1px solid black'}}>
            {inner.map((i, idx) => (
                <Typography key={idx}>
                    {i}
                </Typography>
            ))}
        </Container>
    )
}