'use client'
import React from 'react'
import Tasks from "../../components/Tasks/page"
import { useGlobalState } from '@/app/context/globalProvider'

const page = () => {
  const {incompleteTasks} = useGlobalState()
  return (
    <Tasks title='Incomplete Tasks' tasks={incompleteTasks}/>
  )
}

export default page