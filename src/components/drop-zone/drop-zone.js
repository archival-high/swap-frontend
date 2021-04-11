import React, {useState} from "react";
import {DropEffect} from "./drop-effect.const";

export function DropZone(props) {
  const {type = DropEffect.MOVE} = props;

  const [opacity, setOpacity] = useState(100);
  const {
    onDragEnter = () => {
    },
    onDragLeave = () => {
      setOpacity(100);
    },
    onDragOver = () => {
      setOpacity(20);
    },
    onDrop = () => {
    }
  } = props;

  const _onDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
    onDragEnter(e);
  };
  const _onDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = type;
    onDragOver(e);
  };
  const _onDragLeave = onDragLeave;
  const _onDrop = onDrop;

  return (
    <div
      onDrop={_onDrop}
      onDragLeave={_onDragLeave}
      onDragOver={_onDragOver}
      onDragEnter={_onDragEnter}
      style={{opacity}}
    >
      {props.children}
    </div>
  );
}