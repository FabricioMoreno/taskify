import React from "react";
import { ToDo } from "../interfacesTS/ToDo";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
interface Props {
  todos: Array<ToDo>;
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
  completedTodos: Array<ToDo>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const ToDoList: React.FC<Props> = ({ todos, setTodos,completedTodos,setCompletedTodos }) => {
  return (
    // <div className='todos'>
    //     {todos.map(todo=>{
    //         return <SingleTodo todo={todo} key={todo.id} todos={todos} setTodos={setTodos}/>
    //     })}

    // </div>

    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided,snapshot) => {
          return (
            <div
              className={`todos ${snapshot.isDraggingOver?"dragactive":""}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">Active tasks</span>
              {todos.map((todo, index) => {
                return (
                  <SingleTodo
                    index={index}
                    todo={todo}
                    key={todo.id}
                    todos={todos}
                    setTodos={setTodos}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>

      <Droppable droppableId="TodosRemove">
        {(provided,snapshot) => {
          return (
            <div
            className={`todos ${snapshot.isDraggingOver?"dragcomplete":"remove"}`}
            ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">Completed tasks</span>
              {completedTodos.map((todo, index) => {
                return (
                  <SingleTodo
                    index={index}
                    todo={todo}
                    key={todo.id}
                    todos={todos}
                    setTodos={setCompletedTodos}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default ToDoList;
