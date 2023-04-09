import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { Container, Draggable } from "react-smooth-dnd";
import {arrayMoveImmutable} from 'array-move';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Textarea from '@mui/joy/Textarea';
//import ContextMenu from 'src/ContextMenu';
//import MenuItem from 'src/MenuItem';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
//import TextField from '@mui/joy/TextField';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import "./App.css";


export const App = () => {

  const [tasks, setTasks] = useState([
    { id: 1, type: 0, name: "初期1行目", est: 5, passed: 2, order: 0 },
    { id: 2, type: 0, name: "初期2行目", est: 5, passed: 2, order: 1 },
    { id: 3, type: 1, name: "初期2行目の子", est: 10, passed: 2, order: 2 },
    { id: 4, type: 1, name: "初期2行目の子", est: 5, passed: 2, order: 3 },
    { id: 5, type: 0, name: "初期5行目", est: 5, passed: 2, order: 4 },
    { id: 6, type: 0, name: "初期6行目", est: 5, passed: 2, order: 5 }
  ]);

  let estTotal = tasks.reduce((sum, i) => sum + i.est, 0);
  let passedTotal = tasks.reduce((sum, i) => sum + i.passed, 0);

  // タスク名の更新
  const updateTaskName = (id, name) => {
    for (var i = 0, len = tasks.length; i < len; i++) {
      // idの最大値
      if (tasks[i].id === id) {
        tasks[i].name = name;
      };
    } 
  }

  // タスクタイプの更新
  const updateTaskType = (id, type) => {
    for (var i = 0, len = tasks.length; i < len; i++) {
      // idの最大値
      if (tasks[i].id === id) {
        tasks[i].type = type;
      };
    } 
  }

  // タスク一覧における最後のidを取得
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

  // タスク一覧における最後のorderを取得
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

  // タスクの追加を行うメソッド
  const addTasks = (type, order) => {
    setTasks([...tasks, { id: culcLastId()+1, type: type, name: "", est: 0, passed: 0, order: order }])
  };

  // タスクのドラッグ＆ドロップを管理
  const onDrop = ({ removedIndex, addedIndex }) => {
    const updater = (tasks) =>
      arrayMoveImmutable(tasks, removedIndex, addedIndex).map((item, idx) => {
        return { ...item, order: idx };
      });
      setTasks(updater);
  };

  // タスクを右クリックした際のメニューを管理
  const rightClickOnTask = (id) => {
    console.log(id);
  }

  // ダブルクリックでタスク追加
  document.addEventListener('dblclick', e => {
    if(e.target.classList.value !== "") return;
    addTasks(0, culcLastOrder()+1)
  })

  // レンダリング後の挙動を管理
  useEffect(() => {
    var triggerTasks = Array.from(document.getElementsByClassName('taskParent'));
    triggerTasks = triggerTasks.concat(Array.from(document.getElementsByClassName('taskChild')));
    triggerTasks.forEach(function(target) {
      target.addEventListener('contextmenu', e => {
        rightClickOnTask(e.currentTarget.id);
      })
    });
  });

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
              {tasks.map(({ id, type, name, est, passed }) => (
                <Draggable key={id}>
                  <ContextMenuTrigger id="aaa">
                    <ListItem            className={(type === 0) ? "taskParent" : "taskChild"}             id={id}>
                        <DragIndicatorIcon className="dragHandleSelector" />
                        <Textarea          className={(type === 0) ? "taskNameParent" : "taskNameChild"}     defaultValue={name} placeholder="Task Name" />
                        <ListItemText      className="taskBorder"                                            primary="｜" />
                        <Textarea          className={(type === 0) ? "taskEstParent" : "taskEstChild"}       defaultValue={est} />
                        <ListItemText      className="taskBorder"                                            primary="｜" />
                        <ListItemText      className={(type === 0) ? "taskPassedParent" : "taskPassedChild"} primary={passed} />
                    </ListItem>
                  </ContextMenuTrigger>
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

      <ContextMenu id="aaa">
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem divider />
          <MenuItem>Menu Item 3</MenuItem>
      </ContextMenu>
    </>
  );
}