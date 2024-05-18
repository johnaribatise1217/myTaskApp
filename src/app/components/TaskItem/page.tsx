'use client'
import React from 'react'
import { edit, trash } from '@/app/utils/Icons'
import styled from 'styled-components'
import { UseGlobalState } from '@/app/context/globalProvider'
import FormateDate from '@/app/utils/FormatDate'

interface PropTypes{
  title : string
  description : string
  date : string
  isCompleted : boolean
  id : string
}

const TaskItem = ({title, description, date, isCompleted, id} : PropTypes) => {
  const {theme, deleteTask, updateTask} = UseGlobalState()

  return (
    <TaskItemStyled theme={theme}>
      <h1>{title}</h1>
      <p style={{fontSize : "17px", marginBottom : ""}}>{description}</p>
      <p className='date'>{FormateDate(date)}</p>
      <div className="task-footer">
        <button>
          {isCompleted ? (
            <button className='completed'
              onClick={() => {
                const task = {
                  id,
                  isCompleted : !isCompleted
                }
                updateTask(task)
              }}
            >
              Completed
            </button>
          ) : 
          (
            <button className='not-complete'
              onClick={() => {
                const task = {
                  id,
                  isCompleted : !isCompleted
                }
                updateTask(task)
              }}
            >
              Not Completed
            </button>
          )
          }
        </button>
        <button className="edit">{edit}</button>
        <button className="delete" onClick={() => {
          deleteTask(id)
        }}>{trash}</button>
      </div>
    </TaskItemStyled>
  )
}

const TaskItemStyled = styled.div`
  padding : 1rem 1rem;
  background-color : ${(props) => props.theme.colorGrey5};
  border-radius : 1rem;
  box-shadow : ${(props) => props.theme.shadow7};
  border : 0.5px solid ${(props) => props.theme.colorGrey0};

  height : 16rem;
  display : flex;
  flex-direction : column;
  gap : 0.5rem;

  .date{
    margin-top : auto;
  }

  >h1 {
    font-weight : 600;
    font-size : 1.5rem;
    color : ${(props) => props.theme.colorFontPrimary};
  }

  .task-footer{
    display : flex;
    align-items : center;
    gap : 1.5rem;

    button {
      border : none;
      outline : none;
      cursor : pointer;

      i{
        font-size : 1.4rem;
        color : ${(props) => props.theme.colorGrey1};
      }
    }

    .edit {
      margin-left : auto
    }

    .completed{
      display : inline-block;
      padding : 0.4rem 1rem;
      border-radius : 30px;
      background : ${(props) => props.theme.colorGreenDark};
      font-size : 15px;
    }
    
    .not-complete{
      display : inline-block;
      padding : 0.4rem 1rem;
      border-radius : 30px;
      background : ${(props) => props.theme.colorDanger};
      font-size : 15px;
    }
  }

`

export default TaskItem