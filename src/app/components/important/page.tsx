'use client'
import React from 'react'
import Tasks from "../../components/Tasks/page"
import { UseGlobalState } from '@/app/context/globalProvider'

const ImportantPage = () => {
  const {importantTasks} = UseGlobalState()

  return (
    <Tasks title='Important Tasks' tasks={importantTasks}/>
  )
}

export default ImportantPage