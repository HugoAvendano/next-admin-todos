'use client';

import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import * as apiTodos from '@/todos/helpers/todos';
import { useRouter } from "next/navigation";



export const NewTodo = () => {
    const [todoDescription , setTodoDescription] = useState('');
    const router = useRouter();
    
    const handleSubmit = async (event : FormEvent) => {
        event.preventDefault();
        const todoCreated = await apiTodos.createTodo(todoDescription);
        router.refresh();
        setTodoDescription('');
    }

    const deleteCompleted = async () => {
        const deleteMsg = await apiTodos.deleteAllCompleted();
        router.refresh();
        alert(deleteMsg);
    }

  return (
    <form  onSubmit={handleSubmit} className='flex w-full'>
      <input type="text"
        onChange={event => setTodoDescription(event.target.value)}
        value={ todoDescription}
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?" />

      <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
        Crear
      </button>
      
      <span className='flex flex-1'></span>

      <button 
        onClick={ () => deleteCompleted() }
        type='button' className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
        <IoTrashOutline />
        <span className="m-1">Delete Completed</span>
      </button>


    </form>
  )
}