import React from 'react'
import { ToDo } from '../interfacesTS/ToDo'
import SingleTodo from './SingleTodo'
interface Props{
    todos:Array<ToDo>
    setTodos:React.Dispatch<React.SetStateAction<ToDo[]>>
}

const ToDoList:React.FC<Props> =({todos,setTodos}) => {
  return (
    <div className='todos'>
        {todos.map(todo=>{
            return <SingleTodo todo={todo} key={todo.id} todos={todos} setTodos={setTodos}/>
        })}

    </div>
  )
}

export default ToDoList