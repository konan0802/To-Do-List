import React, { useRef } from "react";
import { useDrag, useDrop } from 'react-dnd';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Textarea from '@mui/joy/Textarea';
import { ItemTypes } from './ItemTypes.js';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}

export const Card = ({ id, type, tod, state, name, est, passed, index, moveCard, children }) => {
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      console.log(item);
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <ListItem ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
      <Textarea     defaultValue={name} placeholder="Task Name" />
      <ListItemText className="taskBorder"                                            primary="｜" />
      <Textarea     className={(type === 0) ? "taskEstParent" : "taskEstChild"}       defaultValue={est} />
      <ListItemText className="taskBorder"                                            primary="｜" />
      <ListItemText className={(type === 0) ? "taskPassedParent" : "taskPassedChild"} primary={passed} />
      {/* Render children if they exist */}
      {children && children.map(child => (
        <Card
          key={child.id}
          index={index}
          id={child.id}
          type={child.type}
          tod={child.tod}
          state={child.state}
          name={child.name}
          moveCard={moveCard}
          children={child.children}
        />
      ))}
    </ListItem>
  )
}
