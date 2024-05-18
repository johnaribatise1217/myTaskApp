'use client'
import { UseGlobalState } from '@/app/context/globalProvider'
import React from 'react'
import Tasks from '../../components/Tasks/page'

const CompletedPage = () => {
  const {completedTasks} = UseGlobalState()

  return (
    <Tasks title='Completed Tasks' tasks={completedTasks}/>
  )
}

export default CompletedPage