'use client'
import { useGlobalState } from '@/app/context/globalProvider'
import React from 'react'
import Tasks from '../../components/Tasks/page'

const CompletedPage = () => {
  const {completedTasks} = useGlobalState()

  return (
    <Tasks title='Completed Tasks' tasks={completedTasks}/>
  )
}

export default CompletedPage