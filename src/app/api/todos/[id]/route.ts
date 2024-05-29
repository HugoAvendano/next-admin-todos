import prisma from '@/lib/prisma'
import { Todo } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup'

interface Segments {
    params:{
        id: string
    }
}

const getTodo = async (id: string ) : Promise<Todo | null> => {
    const todo = await prisma.todo.findFirst({ where: { id } });   
    return todo
}

export async function GET(request: Request, {params}: Segments) {    

    const { id } = params;
    const todo = getTodo(id);
    if(!todo){
        return NextResponse.json({message: `Not found todo with id: ${id}`}, {status:404})
    }

    return NextResponse.json(todo);
}

const putSchema = yup.object({
    description: yup.string().optional(),
    complete: yup.boolean().optional()
});

export async function PUT(request: Request,{params}: Segments ) { 
    const {id} = params;
    const todo = await getTodo(id);
    
    if(!todo){
        return NextResponse.json({message: `Not found todo with id: ${id}`}, {status:404})
    }    
    
    try {
        const { description, complete} = await putSchema.validate(await request.json());
        const updatedTodo = await prisma.todo.update(
            {
                where:{id},
                data: {description,complete}
            }
        );

        return NextResponse.json(updatedTodo);
      
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}