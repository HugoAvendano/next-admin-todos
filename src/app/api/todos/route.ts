import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma';
import * as yup from 'yup'
import { getUserServerSession } from '@/auth/actions/auth-actions';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const skip = Number(searchParams.get('offset') ?? '0');
    const take = Number(searchParams.get('limit') ?? '10');

    if (isNaN(skip)) {
        return NextResponse.json({
            message: 'Invalid argument offset. The parameter offset must be a number '
        },
            { status: 400 });
    }
    if (isNaN(take)) {
        return NextResponse.json({
            message: 'Invalid argument limit. The parameter limit must be a number'
        },
            { status: 400 });
    }
    const todos = await prisma.todo.findMany({ skip,take });
    return NextResponse.json(todos);
}

const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false)
});

export async function POST(request: Request) { 
    const user = await  getUserServerSession();

    if (!user){
        return NextResponse.json('Not Authorized', {status:401})
    }

    try {
        const { description, complete } = await postSchema.validate(await request.json());
        const todo = await prisma.todo.create({ data: { description,complete, UserId:user.id??''}})
        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json( error,{ status:400 } );        
    }
 
}

export async function DELETE(request: Request) {
    const user = await  getUserServerSession();

    if (!user){
        return NextResponse.json('Not Authorized', {status:401})
    }
    
    try {        
        const todoDeleted = await prisma.todo.deleteMany({ where:{complete:true,UserId:user.id}});
        return NextResponse.json("All Todos completed was deleted");
      
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
    
}