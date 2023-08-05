import React, { useRef } from "react";
import "./App.css";
import { useState, useEffect } from "react";
import InputField from "./components/InputField";
import { ToDo } from "./interfacesTS/ToDo";
import ToDoList from "./components/ToDoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [toDo, setToDo] = useState<string>("");
  const [toDos, setToDos] = useState<Array<ToDo>>([]);
  const [completedTodos, setCompletedTodos] = useState<Array<ToDo>>([]);

  const handleAddToDo = (e: React.SyntheticEvent<EventTarget>): void => {
    e.preventDefault();
    if (toDo) {
      const newTodo: ToDo = { id: Date.now(), todo: toDo, isDone: false };
      setToDos((prev) => [...prev, newTodo]);
    } else {
      alert("Invalid task");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = toDos;
    let complete = completedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setToDos(active);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField
          todo={toDo}
          setTodo={setToDo}
          handleAddToDo={handleAddToDo}
        />
        <ToDoList
          todos={toDos}
          setTodos={setToDos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
