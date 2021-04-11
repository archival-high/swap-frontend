import React from "react";

export function Draggable(props) {
  const {onDragStart, onDragEnd, onDrag, enabled = true} = props;
  return (
    <div
      onDrag={onDrag}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      draggable={enabled ? "true" : false}>
      {props.children}
    </div>
  )
}