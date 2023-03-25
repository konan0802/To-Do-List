import React, { useState } from "react";
import Box from '@mui/material/Box';
import { Container, Draggable } from "react-smooth-dnd";
import {arrayMoveImmutable} from 'array-move';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import "./App.css";


export const App = () => {

  /*
  // todoリスト
  const [todoText, setTodoText] = useState("");
  const [todoList, setNewTodoList] = React.useState([]);

  // インプットフォームの状態を管理
  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };

  // 追加ボタンを押すとタスクがToDoリストに追加される
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodo = {
      name: todoText,
      status: "作業中"
    }
    // DOMが更新される
    todoList.push(newTodo);
    // 入力フォーム内を""にする
    setTodoText("");
  };

  // 削除
  const onClickDelete = (index) => {
    const deletedTodoList = [...todoList];
    deletedTodoList.splice(index, 1);
    setNewTodoList(deletedTodoList);
  };

  // statusの切り替え
  const onClickSwitch = (index) => {
    const switchTodoList = [...todoList];
    if (switchTodoList[index].status === "作業中") {
      switchTodoList[index].status = "完了";
    } else if (switchTodoList[index].status === "完了") {
      switchTodoList[index].status = "作業中";
    }
    setNewTodoList(switchTodoList);
  };
  */

  const [items, setItems] = useState([
    { id: "1", name: "初期1行目", est: 5, passed: 2, order: 0 },
    { id: "2", name: "初期2行目", est: 5, passed: 2, order: 1 },
    { id: "3", name: "初期3行目", est: 5, passed: 2, order: 2 },
    { id: "4", name: "初期4行目", est: 5, passed: 2, order: 3 },
    { id: "5", name: "初期5行目", est: 5, passed: 2, order: 4 },
    { id: "6", name: "初期6行目", est: 5, passed: 2, order: 5 }
  ]);

  const onDrop = ({ removedIndex, addedIndex }) => {
    const updater = (items) =>
      arrayMoveImmutable(items, removedIndex, addedIndex).map((item, idx) => {
        return { ...item, order: idx };
      });
    setItems(updater);
  };

  return (
    <>

      <Box style={{ width: '86%', bgcolor: "#2C3333", marginLeft: '7%', marginTop: 100}}>
        <nav aria-label="secondary mailbox folders">
          <List>
            <Container onDrop={onDrop}>
              {items.map(({ id, name, est, passed }) => (
                <Draggable key={id}>
                  <ListItem style={{marginBottom: '9px', borderRadius: '3px', background: "#A5C9CA"}}>
                    <ListItemText primary={name} style={{width: '70%'}} />
                    <ListItemText primary="｜" />
                    <ListItemText primary={est + " h"} />
                    <ListItemText primary="｜" />
                    <ListItemText primary={passed + " h"} />
                  </ListItem>
                </Draggable>
              ))}
            </Container>
          </List>
        </nav>
      </Box>
    </>
  );
}