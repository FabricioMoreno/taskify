import React, { useEffect, useRef, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { ToDo } from "../interfacesTS/ToDo";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  todo: ToDo;
  todos: Array<ToDo>;
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
  index:number
}

const SingleTodo: React.FC<Props> = ({index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleDoneToDo = (id: number): void => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDeleteToDo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };
  return (

    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided, snapshot)=>{
          return <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEditTodo(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              className="todos__single--text"
              type=""
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
    
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDeleteToDo(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDoneToDo(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
        }
      }
    
    </Draggable>
  );
};

export default SingleTodo;
