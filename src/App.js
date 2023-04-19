import React, { useState } from "react";
import Box from '@mui/material/Box';
import { Container, Draggable } from "react-smooth-dnd";
import {arrayMoveImmutable} from 'array-move';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Textarea from '@mui/joy/Textarea';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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

  // オリジナルメニューを開くListItemの要素
  const [anchorEl, setAnchorEl] = useState(null);
  // オリジナルメニューを開く位置
  const [anchorPosition, setAnchorPosition] = useState(null);
  // オリジナルメニューで選択されているタスクのid
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  let estTotal = tasks.reduce((sum, i) => sum + i.est, 0);
  let passedTotal = tasks.reduce((sum, i) => sum + i.passed, 0);

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
    // 重複したorderのtasks要素が生まれないようにorderを更新
    const updatedTasks = tasks.map(t => {
      if (t.order >= order) {
        t.order += 1;
      }
      return t;
    });
  
    // タスクを追加
    const newTask = { id: culcLastId() + 1, type: type, name: "", est: 0, passed: 0, order: order };
    const sortedTasks = [...updatedTasks, newTask].sort((a, b) => a.order - b.order);
    setTasks(sortedTasks);
  };

  // タスクの削除を行うメソッド ※子タスクも連動して削除
  const handleDelete = () => {
    const taskToDelete = tasks.find(task => task.id === selectedTaskId);
    let tasksToDelete = [taskToDelete];

    if (taskToDelete.type === 0) {
      for (let i = taskToDelete.order + 1; i < tasks.length; i++) {
        const task = tasks[i];

        if (task.type === 0) {
          break;
        }

        if (task.type === 1) {
          tasksToDelete.push(task);
        }
      }
    }

    setTasks(tasks.filter(task => !tasksToDelete.includes(task)));
    setSelectedTaskId(null);
    handleClose();
  };

  // タスクのドラッグ＆ドロップを管理
  const onDrop = ({ removedIndex, addedIndex }) => {
    const updater = (tasks) =>
      arrayMoveImmutable(tasks, removedIndex, addedIndex).map((item, idx) => {
        return { ...item, order: idx };
      });
      setTasks(updater);
  };

  // オリジナルメニュー
  const handleContextMenu = (event, taskId) => {
    event.preventDefault();
    setSelectedTaskId(taskId);
    setAnchorEl(event.currentTarget);
    setAnchorPosition({ left: event.clientX, top: event.clientY });
  };

  // オリジナルメニューのクローズ
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorPosition(null);
  };

  // ダブルクリックでタスク追加
  document.addEventListener('dblclick', e => {
    if(e.target.classList.value !== "") return;
    addTasks(0, culcLastOrder()+1);
  });

  // タスク上で改行を行うことにより子タスクを追加
  const handleTextareaChange = (event, taskId) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const task = tasks.find(task => task.id === taskId);
      const newOrder = task.order + 1;
      addTasks(1, newOrder);
    }
  };

  return (
    <>
      <Box className="header">
        <Box className="taskNameHeader">タスク名</Box>
        <Box className="estHeader">見積</Box>
        <Box className="passedHeader">実績</Box>
      </Box>

      <Box className="taskList">
        <nav aria-label="secondary mailbox folders">
          <List>
            <Container dragHandleSelector=".dragHandleSelector" onDrop={onDrop}>
              {tasks.map(({ id, type, name, est, passed }) => (
                <Draggable key={id}>
                  <ListItem            id={id} className={(type === 0) ? "taskParent" : "taskChild"} onContextMenu={(event) => handleContextMenu(event, id)}>
                    <DragIndicatorIcon className="dragHandleSelector" />
                    <Textarea
                      className={(type === 0) ? "taskNameParent" : "taskNameChild"}
                      defaultValue={name}
                      placeholder="Task Name"
                      onKeyPress={(event) => {handleTextareaChange(event, id);}}
                    />
                    <ListItemText      className="taskBorder"                                            primary="｜" />
                    <Textarea          className={(type === 0) ? "taskEstParent" : "taskEstChild"}       defaultValue={est} />
                    <ListItemText      className="taskBorder"                                            primary="｜" />
                    <ListItemText      className={(type === 0) ? "taskPassedParent" : "taskPassedChild"} primary={passed} />
                  </ListItem>
                </Draggable>
              ))}
            </Container>
          </List>
        </nav>
      </Box>

      <div>
        <Box className="totalLabel">合計：</Box>
        <Box className="estTotal">{estTotal} h</Box>
        <Box className="separator"> / </Box>
        <Box className="passedTotal">{passedTotal} h</Box>
      </div>

      <Menu
        anchorEl={anchorEl}
        anchorPosition={anchorPosition}
        anchorReference="anchorPosition"
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}>タスクの削除</MenuItem>
      </Menu>

    </>
  );
}