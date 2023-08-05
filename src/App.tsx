import React, { useRef } from "react";
import "./App.css";
import { useState, useEffect } from "react";
import InputField from "./components/InputField";
import { ToDo } from "./interfacesTS/ToDo";
import ToDoList from "./components/ToDoList";

const App: React.FC = () => {
  const [toDo, setToDo] = useState<string>("");
  const [toDos, setToDos] = useState<Array<ToDo>>([]);

  const handleAddToDo = (e: React.SyntheticEvent<EventTarget>): void => {
    e.preventDefault();
    if (toDo) {
      const newTodo: ToDo = { id: Date.now(), todo: toDo, isDone: false };
      setToDos((prev) => [...prev, newTodo]);
    } else {
      alert("Invalid task");
    }
  };
  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={toDo} setTodo={setToDo} handleAddToDo={handleAddToDo} />
      <ToDoList todos={toDos} setTodos={setToDos} />
    </div>
  );
};

export default App;
