import React, { useCallback, useRef, useReducer } from "react";
import "./App.css";
import TodoTemplate from "./TodoTemplate";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({ id: i, text: `할일.. ${i}`, checked: false });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case "INSERT":
      return todos.concat(action.todo);
    case "REMOVE":
      return todos.filter(todo => todo.id !== action.id);
    case "TOGGLE":
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

function App() {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
  const nextId = useRef(4);
  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({ type: "INSERT", todo });
    nextId.current += 1;
  }, []);

  const onRemove = useCallback(id => {
    dispatch({ type: "REMOVE", id });
  }, []);

  const onToggle = useCallback(id => {
    dispatch({ type: "TOGGLE", id });
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}></TodoInsert>
      <TodoList
        todos={todos}
        onRemove={onRemove}
        onToggle={onToggle}
      ></TodoList>
    </TodoTemplate>
  );
}

export default App;
