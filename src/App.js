import React, { useState } from "react";
//import "./style.css";


export const App = () => {
  // todoリスト
  const [todoText, setTodoText] = useState("");
  const [todoList, setNewTodoList] = React.useState([]);
  const [filteredTodoList, setFilteredTodoList] = React.useState([]);
  const [radio, setRadio] = React.useState('all');

  // ラジオボタン更新
  const handleChange = (event) => {
    setRadio(event.target.value);
    if (event.target.value === "incomplete") {
      const incompleteTodoList = [...todoList].filter((todo) => todo.status === "作業中");
      setFilteredTodoList(incompleteTodoList);
    } else if (event.target.value === "complete") {
      const completeTodoList = [...todoList].filter((todo) => todo.status === "完了");
      setFilteredTodoList(completeTodoList);
    } return
  }

  // インプットフォームの状態を管理
  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };

  // 追加ボタンを押すとタスクがToDoリストに追加される
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodo = {
      comment: todoText,
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

  return (
    <>
      <div className="complete-area">
        <label>
          <input type="radio" value="all" onChange={handleChange} checked={radio === 'all'} />
          すべて
        </label>

        <label>
          <input type="radio" value="incomplete" onChange={handleChange} checked={radio === 'incomplete'} />
          作業中
        </label>

        <label>
          <input type="radio" value="complete" onChange={handleChange} checked={radio === 'complete'} />
          完了
        </label>


        <h1>ToDoリスト</h1>
        <table>
          <thead>
            <tr>
              <td >ID</td>
              <td>コメント</td>
              <td>状態</td>
            </tr>
          </thead>

            {
              radio === "all"?
              <tbody id="todo-body">  
              {todoList.map((todo, index) => (
                <tr>
                  <td>{index}</td>
                  <td>{todo.comment}</td>
                  <td><button onClick={() => onClickSwitch(index)}>{todo.status}</button></td>
                  <td><button onClick={() => onClickDelete(index)}>削除</button></td>
                </tr>
              ))}
              </tbody>
              :
              <tbody id="todo-body">  
              {filteredTodoList.map((todo, index) => (
                <tr>
                  <td>{index}</td>
                  <td>{todo.comment}</td>
                  <td><button onClick={() => onClickSwitch(index)}>{todo.status}</button></td>
                  <td><button onClick={() => onClickDelete(index)}>削除</button></td>
                </tr>
              ))}
              </tbody>
            }        

        </table>
      </div>

      <h2>新規タスクの追加</h2>
      <div className="add-todo">
        <input value={todoText} onChange={onChangeTodoText} />
        <button onClick={onClickAdd}>追加</button>
      </div>

    </>

  );
}