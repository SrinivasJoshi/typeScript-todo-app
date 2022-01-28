import React , {useRef, useState,useEffect} from 'react';
import './styles.css';
import { Todo } from '../model';
import { AiFillEdit ,AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

interface Props{
    todo : Todo;
    todos : Todo[];
    setTodos : React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({todo,todos,setTodos}) => {
    // state
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    // functions
    const handleEdit = (id:number) =>{
        setTodos(todos.map(todo =>(
            todo.id === id ? {...todo,todo:editTodo}:todo
        )));
        setEdit(false);
    }

    const handleDelete = (id:number) =>{
        setTodos(todos.filter(todo => todo.id !==id));
    }

    const handleDone = (id:number)=>{
        setTodos(todos.map(todo =>todo.id===id?{...todo,isDone:!todo.isDone}:todo))
    }
    // ref
    const inputRef = useRef<HTMLInputElement>(null);

    // useEffect
    useEffect(() => {
        inputRef.current?.focus()
    }, [edit]);
    
    // return 
  return <form className='todos__single' onSubmit={(e) =>{
      e.preventDefault();
      handleEdit(todo.id);
        }}>
      {
          edit  ? (
              <input 
              ref={inputRef}
              value={editTodo} 
              onChange={(e) =>setEditTodo(e.target.value)} 
              className='todos__single--text'
              />
          ):(
                todo.isDone ?
                (<s className='todos__single--text'>{todo.todo}</s>):
                (<span className='todos__single--text'>{todo.todo}</span>)
          )
      }
      
      
      <div>
            <span className="icon" onClick={()=>{
                if(!edit&& !todo.isDone)
                {
                    setEdit(!edit);
                }
            }}>
                <AiFillEdit />
            </span>
            <span className="icon" onClick={()=>handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={()=>handleDone(todo.id)}>
              <MdDone />
            </span>
      </div>
  </form>;
};

export default SingleTodo;
