'use server';

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = async (seconds : number = 0) => {
  return new Promise( resolve => {
    setTimeout(() => {
      resolve(true);      
    }, seconds * 1000);
  });
}

export const toogleTodo = async ( id: string, complete: boolean) : Promise<Todo> =>  {
    await sleep(3); 
    
    const todo = await prisma.todo.findFirst({where:{id}});
    if (!todo){
      throw `Not found todo with id: ${id}`;
    } 

    const todoUpdated = await prisma.todo.update({
      where:{id},
      data:{complete}
    });

    revalidatePath('dashboard/server-todos');
    return todoUpdated;

}

export const addTodo = async (description: string) => {
  
    try {
      
      const todo = await prisma.todo.create({ data: {description}});
      revalidatePath('dashboard/server-todos');
      return todo
    } catch (error) {
      return {
        message: "Error creating todo"
      };        
    }
 

}

export const deleteCompleted = async () : Promise<void> => {
  const todoDeleted = await prisma.todo.deleteMany({ where:{complete:true}});
  revalidatePath('dashboard/server-todos');
}