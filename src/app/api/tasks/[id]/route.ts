import prisma from "@/app/utils/client"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export const DELETE = async(req: Request, {params} : {params : {id : string}}) => {
  try {
    //get the userId from auth()
    const {userId} = auth()
    const taskId = params.id

    //if there's no userId , then don't authorize the task
    if(!userId){
      return NextResponse.json({error : "Unauthorized", status : 401})
    }

    //delete the task with that id
    const task = await prisma.task.delete({
      where : {id : taskId}
    })

    console.log("TASK DELETED", task)
    return NextResponse.json(task)
  } catch (error) {
    console.log("ERROR DELETING TASK: ", error)
    return NextResponse.json({error : "Error deleting task", status : 500})
  }
}