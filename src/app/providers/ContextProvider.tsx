'use client'
import React, {useEffect, useState } from 'react'
import { GlobalProvider } from '../context/globalProvider'
import { Toaster } from 'react-hot-toast'

interface PropsType { 
  children : React.ReactNode
}

const ContextProvider = ({children} : PropsType) => {
  const [isReady , setIsReady] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true)
    }, 5000)
  }, [])

  if(!isReady){
    return <div className='w-full h-full flex items-center justify-center'>
      <span className='loader'></span>
    </div>
  }

  return (
    <GlobalProvider>
      <Toaster/>
      {children}
    </GlobalProvider>
  )
}

export default ContextProvider