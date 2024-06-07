'use client';
import React from 'react';
import { Todo } from '@prisma/client';
import { TodoItem } from '..';

import { useRouter } from 'next/navigation';
import { toogleTodo } from '../actions/todo-actions';


interface Props {
    todos?: Todo[]
}



export const TodosGridServAct = ( { todos =[] } : Props) => {
  const router = useRouter();
  
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