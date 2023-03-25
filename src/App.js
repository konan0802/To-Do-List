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
    { id: "1", text: "初期1行目", order: 0 },
    { id: "2", text: "初期2行目", order: 1 },
    { id: "3", text: "初期3行目", order: 2 },
    { id: "4", text: "初期4行目", order: 3 },
    { id: "5", text: "初期5行目", order: 4 },
    { id: "6", text: "初期6行目", order: 5 }
  ]);

  const onDrop = ({ removedIndex, addedIndex }) => {
    const updater = (items) =>
      arrayMoveImmutable(items, removedIndex, addedIndex).map((item, idx) => {
        return { ...item, order: idx };
      });
    setItems(updater);
  };

  return (
    <Box style={{ width: '100%', maxWidth: 800, bgcolor: "#2C3333", marginLeft: 100, marginTop: 100}}>
      <nav aria-label="secondary mailbox folders">
        
        <List>
          <Container onDrop={onDrop}>
            {items.map(({ id, text }) => (
              <Draggable key={id}>
                <ListItem style={{ border: "solid 1px", background: "#A5C9CA" }}>
                  <ListItemText primary={text} />
                </ListItem>
              </Draggable>
            ))}
          </Container>
        </List>

      </nav>
    </Box>
  );
}