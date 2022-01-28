import React from 'react';
import './styles.css';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';

interface Props{
  todos : Todo[];
  setTodos : React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({todos,setTodos}) => {
  return <div className='todos'>
    {
      todos.map(t => (
        <SingleTodo 
        todo={t} 
        todos={todos}
        setTodos={setTodos}
         key={t.id} />
      ))
    }
  </div>
};

export default TodoList;
