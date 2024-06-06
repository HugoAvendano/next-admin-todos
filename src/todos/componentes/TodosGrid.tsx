'use client';
import React from 'react';
import { Todo } from '@prisma/client';
import { TodoItem } from '..';
import * as apiTodos from '@/todos/helpers/todos';
import { useRouter } from 'next/navigation';


interface Props {
    todos?: Todo[]
}



export const TodosGrid = ( { todos =[] } : Props) => {
  const router = useRouter();

  const toogleTodo = async (id: string, complete: boolean) => {
    const todoUpdated = await apiTodos.updateTodo(id, complete);
    console.log(todoUpdated);
    router.refresh();
    return todoUpdated;
  
  }
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
        {
            todos.map( todo => 
                <TodoItem key = {todo.id} todo = {todo} toogleTodo={ toogleTodo } />
            )
        }
    </div>
  )
}
