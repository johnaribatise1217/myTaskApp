'use client'
import { UseGlobalState } from '@/app/context/globalProvider'
import React from 'react'
import styled from 'styled-components'
import CreateContent from '../modal/CreateContent'
import TaskItem from '../TaskItem/page'
import { plus } from '@/app/utils/Icons'
import Modal from '../modal/page'

interface Props{
  title : string,
  tasks : any[]
}

const page = ({title, tasks} : Props) => {
  const {theme, isLoading, openModal, modal} = UseGlobalState()

  return (
    <TaskStyled theme={theme}> 
      {modal && <Modal content={<CreateContent/>}/>}
      <h1>{title}</h1>
      {!isLoading ?
        <div className="tasks grid">
        {tasks.map((task) => (
          <TaskItem 
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            id={task.id}
            isCompleted={task.isCompleted }
          />
        ))}
        <button className="create-task" onClick={openModal}>
          {plus}
          Add New Task
        </button>
      </div> : 
      <div className='tasks-loader w-full h-full flex items-center justify-center '>
        <span className="loader "></span>
      </div>
      }
    </TaskStyled>
  )
}

const TaskStyled = styled.main `
  padding : 2rem;
  width : 100%;
  background-color : ${(props) => props.theme.colorBg2};
  border-color : 2px solid ${(props) => props.theme.borderColor2};
  border-radius : 2rem;
  height : 100%;

  overflow-y : auto;

  &::webskit-scrollbar {
    width : 0.5rem;
  }

  .tasks {
    margin : 3rem 0;
  }

  >h1 {
    font-size : clamp(1.5rem, 2vw, 2rem);
    font-weight : 800;
    position : relative;
    margin-bottom : 1rem;

    &::after {
      content : "";
      position : absolute;
      bottom :-0.5rem;
      left: 0;
      width : 3rem;
      height : 0.2rem;
      border-radius : 0.5rem;
      background-color : ${(props) => props.theme.colorPrimaryGreen};
    }
  }

  .create-task{
    display : flex;
    align-items : center;
    justify-content : center;
    gap : 0.5rem;
    
    height : 16rem;
    border : 3px dashed ${(props) => props.theme.colorGrey5};
    cursor : pointer;
    border-radius : 1rem;
    color : ${(props) => props.theme.colorGrey2};
    font-weight : 600;
    transition : all 0.3s;

    &:hover {
      background-color : ${(props) => props.theme.colorGrey5};
      color : ${(props) => props.theme.colorGrey0};
    }
  }
`

export default page