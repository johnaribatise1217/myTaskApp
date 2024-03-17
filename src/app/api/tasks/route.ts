import prisma from "@/app/utils/client"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

//POST METHOD
export const POST = async(req : Request) => {
  try {
    //get the userId from auth()
    const {userId} = auth()
    //if there's no userId , return Unauthorized
    if(!userId){
      return NextResponse.json({error : "Unauthorized", status : 401})
    }

    const {title, description, date, completed, important} = await req.json()

    //authentication to post a task
    if(!title || !description || !date){
      return NextResponse.json({
        error : "Missing fields required",
        status : 401
      })
    }

    if(title.length < 3) {
      return NextResponse.json({
        error : "Title must be at least 3 characters long.",
        status : 400
      })
    }

    //prisma posts our data into the database
    const task = await prisma.task.create({
      data : {
        title : title,
        description : description,
        date : date,
        isCompleted : completed,
        isImportant : important,
        userId : userId
      },
    })

    console.log("Task created :", task)

    return  NextResponse.json({task, status : 200})
  } catch (error) {
    console.log("ERROR CREATING TASK: ", error)
    return NextResponse.json({error : "Error creating Task", status : 500})
  }
}

//GET METHOD
export const GET = async(req : Request) => {
  try {
    //get the userId from auth
    const {userId} = auth()
    if(!userId){
      return NextResponse.json({error : "Unauthorized", status : 401})
    }

    //get all the tasks
    const tasks = await prisma.task.findMany({
      where :{
        userId,
      }
    })

    return NextResponse.json(tasks)
    
  } catch (error) {
    console.log("ERROR GETTING TASK: ", error)
    return NextResponse.json({error : "Error getting Task", status : 500})
  }
}

//PUT METHOD
export const PUT = async(req : Request) => {
  try {
    const {userId} = auth()
    const {isCompleted, id} = await req.json()

    if(!userId){
      return NextResponse.json({error : "Unauthorized", status : 401})
    }

    const task = await prisma.task.update({
      where : {
        id
      },
      data : {
        isCompleted
      }
    })

    return NextResponse.json(task)
  } catch (error) {
    console.log("ERROR UPDATING TASK: ", error)
    return NextResponse.json({error : "Error updating Task", status : 500})
  }
}