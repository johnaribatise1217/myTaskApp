'use client'
import React from 'react'
import Tasks from "../../components/Tasks/page"
import { UseGlobalState } from '@/app/context/globalProvider'

const page = () => {
  const {incompleteTasks} = UseGlobalState()
  return (
    <Tasks title='Incomplete Tasks' tasks={incompleteTasks}/>
  )
}

export default page