import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";

export const updateTodo = async ( id: string , complete: boolean ) :Promise<Todo> => {
    const body = {complete};

    const todoUpdated =  await fetch (`/api/todos/${id}`,{
        method: 'PUT',
        body : JSON.stringify(body),
        headers : {
            'Content-type': 'application/json'
        }

    }).then(resp => resp.json());

    return todoUpdated;
}

export const createTodo = async ( description : string ) :Promise<Todo> => {
    const body = {description};

    const todoUpdated =  await fetch (`/api/todos/`,{
        method: 'POST',
        body : JSON.stringify(body),
        headers : {
            'Content-type': 'application/json'
        }

    }).then(resp => resp.json());

    return todoUpdated;
}

export const deleteAllCompleted = async () :Promise<string> => {
    

    const deletedTodo =  await fetch (`/api/todos/`,{
        method: 'DELETE',        
        headers : {
            'Content-type': 'application/json'
        }

    }).then(resp => resp.json());

    return deletedTodo;
}