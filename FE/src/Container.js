import React, { useCallback, useState } from 'react';
import List from "@material-ui/core/List";
import update from 'immutability-helper'
import { observer } from "mobx-react";
import { taskStore } from './TaskStore.js';
import { Card } from './Card.js'

const style = {
  width: 400,
}

export const Container = () => {
  {
    const [tasks, setCards] = useState([
      { id: 1, type: 0, tod: 0, state: 0, name: 'サンプル1',    est: 5, passed: 2, children: [] },
      { id: 2, type: 0, tod: 0, state: 0, name: 'サンプル2',    est: 5, passed: 2, children: [
        { id: 3, type: 1, tod: 0, state: 0, name: 'サンプル2の1', est: 5, passed: 2 },
        { id: 4, type: 1, tod: 0, state: 0, name: 'サンプル2の2', est: 5, passed: 2 },
      ] },
      { id: 5, type: 0, tod: 0, state: 0, name: 'サンプル3',    est: 5, passed: 2, children: [] },
      { id: 6, type: 0, tod: 0, state: 0, name: 'サンプル4',    est: 5, passed: 2, children: [
        { id: 7, type: 1, tod: 0, state: 0, name: 'サンプル4の1', est: 5, passed: 2 }
      ] },,
    ])
    const moveCard = useCallback((dragIndex, hoverIndex) => {
      setCards((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        }),
      )
    }, [])
    const renderCard = useCallback((card, index) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          type={card.type}
          tod={card.tod}
          state={card.state}
          name={card.name}
          moveCard={moveCard}
          children={card.children}
        />
      )
    }, [])
    return (
      <>
        <List style={style}>
          {taskStore.tasks.map((task, i) => (
            <Card task={task} key={task.id} index={i} />
          ))}
        </List>
      </>
    );
  }
};