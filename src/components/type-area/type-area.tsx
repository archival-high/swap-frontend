import {Input, Typography} from '@material-ui/core';
import React, {SyntheticEvent, useEffect, useRef, useState} from 'react';
import {NodeApi} from "../../api/node";
import {useDispatch} from "react-redux";
import {createNew} from "../../redux/data";

export function TypeArea (){
    const dispatch = useDispatch();

    const [clicked, setClicked] = useState(false);
    const [keycode, setKeyCode] = useState('');
    const [value, setValue] = useState('');
    const valueRef = useRef('');

    const onClick = () => setClicked(true);

    useEffect(()=>{
        const onKeyPress = (ev: KeyboardEvent) => {
            if (ev.key === "Enter"){
                console.log("Sending");
                console.log(value);
                dispatch(createNew(valueRef.current));
            }
        };
        window.addEventListener('keypress', onKeyPress);
        return () => {
            window.removeEventListener('keypress', onKeyPress);
        }
    }, []);
    return (
        <div style={{
            border: '1px solid black',
            height: '50vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
            onClick={onClick}
        >
            {clicked ? (
                <Input autoFocus
                       autoSave={"true"}
                       value={value}
                       onChange={e => {
                           console.log(e.target.value);
                           setValue(e.target.value);
                       valueRef.current = e.target.value;}
                       }/>
            ) : (
                <Typography>{keycode}</Typography>
            )}
        </div>
    )
}