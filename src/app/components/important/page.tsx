'use client'
import React from 'react'
import Tasks from "../../components/Tasks/page"
import { useGlobalState } from '@/app/context/globalProvider'

const ImportantPage = () => {
  const {importantTasks} = useGlobalState()

  return (
    <Tasks title='Important Tasks' tasks={importantTasks}/>
  )
}

export default ImportantPage