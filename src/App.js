import React, { useState } from "react";
import Box from '@mui/material/Box';
import { Container, Draggable } from "react-smooth-dnd";
import {arrayMoveImmutable} from 'array-move';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Textarea from '@mui/joy/Textarea';
//import TextField from '@mui/joy/TextField';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import "./App.css";


export const App = () => {

  const [tasks, setTasks] = useState([
    { id: 1, name: "初期1行目", est: 5, passed: 2, order: 0 },
    { id: 2, name: "初期2行目", est: 5, passed: 2, order: 1 },
    { id: 3, name: "初期3行目", est: 10, passed: 2, order: 2 },
    { id: 4, name: "初期4行目", est: 5, passed: 2, order: 3 },
    { id: 5, name: "初期5行目", est: 5, passed: 2, order: 4 },
    { id: 6, name: "初期6行目", est: 5, passed: 2, order: 5 }
  ]);

  const estTotal = tasks.reduce((sum, i) => sum + i.est, 0);
  const passedTotal = tasks.reduce((sum, i) => sum + i.passed, 0);

  const culcLastId = () => {
    let lastId = 0;
    for (var i = 0, len = tasks.length; i < len; i++) {
      // idの最大値
      if (tasks[i].id > lastId) {
        lastId = tasks[i].id;
      };
    }
    return lastId;
  }

  const culcLastOrder = () => {
    let lastOrder = 0;
    for (var i = 0, len = tasks.length; i < len; i++) {
      // idの最大値
      if (tasks[i].order > lastOrder) {
        lastOrder = tasks[i].order;
      };
    }
    return lastOrder;
  }

  const addTasks = () => {
    setTasks([...tasks, { id: culcLastId()+1, name: "", est: null, passed: 0, order: culcLastOrder()+1 }])
  };

  const onDrop = ({ removedIndex, addedIndex }) => {
    const updater = (tasks) =>
      arrayMoveImmutable(tasks, removedIndex, addedIndex).map((item, idx) => {
        return { ...item, order: idx };
      });
      setTasks(updater);
  };

  document.addEventListener('dblclick', e => {
    //if(dialogNode.current === null) return;
    //if(dialogNode.current.contains(e.currentTarget)) return;
    addTasks()
  })

  return (
    <>
      <div>
        <Box style={{height: 32, width: '60.3%', marginLeft: '9%',                   borderBottom: "solid 3px #395B64", marginTop: 75, marginBottom: 8, float: "left", fontSize: 16, fontWeight: "bold", textAlign: "center", color: "#395B64"}}>タスク名</Box>
        <Box style={{height: 32, width: '8.8%', marginRight: '2%', marginLeft: '2%', borderBottom: "solid 3px #395B64", marginTop: 75, marginBottom: 8, float: "left", fontSize: 16, fontWeight: "bold", textAlign: "center", color: "#395B64"}}>見積</Box>
        <Box style={{height: 32, width: '8.8%', marginRight: '9%',                   borderBottom: "solid 3px #395B64", marginTop: 75, marginBottom: 8, float: "left", fontSize: 16, fontWeight: "bold", textAlign: "center", color: "#395B64"}}>実績</Box>
      </div>

      <Box style={{bgcolor: "#2C3333", marginLeft: '8.5%', marginRight: '8.5%', marginTop: 5, clear: "both"}}>
        <nav aria-label="secondary mailbox folders">
          <List>
            <Container dragHandleSelector=".dragHandleSelector" onDrop={onDrop}>
              {tasks.map(({ id, name, est, passed }) => (
                <Draggable key={id}>
                    <ListItem style={{marginBottom: '9px', borderRadius: '3px', background: "#A5C9CA"}}>
                      <DragIndicatorIcon style={{marginRight: '1%'}} className="dragHandleSelector" />
                      <Textarea defaultValue={name} placeholder="Task Name" className="taskName" />
                      <ListItemText primary="｜"                            style={{textAlign: "center", marginRight: "auto", marginLeft: "auto"}} />
                      <Textarea defaultValue={est + " h"} className="taskEst" />
                      <ListItemText primary="｜"                            style={{textAlign: "center", marginRight: "auto", marginLeft: "auto"}} />
                      <ListItemText primary={passed + " h"}                 style={{textAlign: "center", width: '9%'}} />
                    </ListItem>
                </Draggable>
              ))}
            </Container>
          </List>
        </nav>
      </Box>

      <div>
        <Box style={{height: 32, width: '4%',   marginLeft: '65.5%',                     marginTop: 30, marginBottom: 8, float: "left", fontSize: 16, fontWeight: "bold", textAlign: "right", color: "#E7F6F2"}}>合計：</Box>
        <Box style={{height: 32, width: '8.8%', marginLeft: '2%',                        marginTop: 30, marginBottom: 8, float: "left", fontSize: 16, fontWeight: "bold", textAlign: "center", color: "#E7F6F2"}}>{estTotal} h</Box>
        <Box style={{height: 32, width: '1%',   marginLeft: '0.6%', marginRight: '0.6%', marginTop: 30, marginBottom: 8, float: "left", fontSize: 16, fontWeight: "bold", textAlign: "center", color: "#E7F6F2"}}> / </Box>
        <Box style={{height: 32, width: '8%',   marginRight: '9%',                       marginTop: 30, marginBottom: 8, float: "left", fontSize: 16, fontWeight: "bold", textAlign: "center", color: "#E7F6F2"}}>{passedTotal} h</Box>
      </div>
    </>
  );
}