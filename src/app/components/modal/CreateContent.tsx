'use client'
import { useGlobalState } from '@/app/context/globalProvider'
import axios from 'axios'
import React, {useState} from 'react'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import Button from '../Button/Button'
import { plus } from '@/app/utils/Icons'

const CreateContent = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [important, setImportant] = useState(false)
  const [completed, setCompleted] = useState(false)

  const {theme, getAllTasks, closeModal} = useGlobalState()

  const handleChange = (name : string) => (e : any) => {
    //use switch loop to set the states
    switch(name) {
      case "title" :
        setTitle(e.target.value)
        break;
      case "description" :
        setDescription(e.target.value)
        break;
      case "date" :
        setDate(e.target.value)
        break;
      case "important":
        setImportant(e.target.checked)
        break;
      case "completed" :
        setCompleted(e.target.checked)
        break;
      default :
        break;
    }
  }

  const handleSubmit = async(e : any) => {
    e.preventDefault()
    //set your state values to a task object so will can send it to the POST endpoint
    const task = {title, description, date, important, completed}

    try {
      const res = await axios.post("/api/tasks", task)
      if(res.data.error) {
        toast.error(res.data.error)
      }
      if(!res.data.error){
        toast.success('Task created successfully')
        getAllTasks()
        closeModal()
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }
  }
 
  return (
    <CreateContentStyled theme={theme} onSubmit={handleSubmit}>
      <h1>Create a Task</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input 
          type="text" 
          value={title}
          id='title'
          name= "title"
          placeholder='Enter your title'
          onChange={handleChange("title")}
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          rows={4}
          value={description}
          onChange={handleChange("description")}
          id='description'
          name= "description"
          placeholder='e.g , Next.js is a framework built....'
        ></textarea>
      </div>
      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input 
          type="date" 
          value={date.toString()}
          id='date'
          name= "date"
          onChange={handleChange("date")}
        />
      </div>
      <div className="input-control toggler flex items-center justify-space-between">
        <label className='flex-1' htmlFor="completed">Toggle Completed</label>
        <input 
          type="checkbox" 
          value={completed.toString()}
          id='completed'
          name= "completed"
          onChange={handleChange("completed")}
        />
      </div>
      <div className="input-control toggler flex items-center justify-space-between">
        <label className='flex-1' htmlFor="important">Toggle Important</label>
        <input 
          type="checkbox" 
          value={important.toString()}
          id='important'
          name= "important"
          onChange={handleChange("important")}
        />
      </div>

      <div className="submit-btn flex justify-end">
        <Button
          type='submit'
          name='Create Task'
          icon={plus}
          padding='1.2rem 1.4rem'
          background={theme.colorTask}
          borderRad='0.8rem'
          fw='500'
          fs='1.2rem'
          color={theme.colorGrey1}
        />
      </div>
    </CreateContentStyled>
  )
}

const CreateContentStyled = styled.form`
  > h1 {
    font-size : clamp(1.2rem, 5vw, 1.6rem);
    font-weight : 600;
  } 

  color : ${(props) => props.theme.colorGrey1};

  .input-control {
    position : relative;
    margin : 1rem 0;
    font-weight : 500;

    label{
      margin-bottom : 0.7rem;
      display : inline-block;
      font-size : clamp(0.9rem, 5vw, 1.2rem);

      span {
        color : ${(props) => props.theme.colorGrey3}
      }
    }

    input, textarea {
      width : 100%;
      border : none;
      padding : 1rem;
      resize : none;
      background-color : ${(props) => props.theme.colorGreyDark};
      color : ${(props) => props.theme.colorGrey2};
    }
  }

  .submit-btn button {
    transition : all 0.55s ease-in-out;
    i {
      color : ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      background : ${(props) => props.theme.colorPrimaryGreen} !important;
      color : ${(props) => props.theme.colorWhite} !important;
    }
  }

  .toggler {
    cursor : pointer;

    label {
      flex : 1;
    }

    input {
      width : initial;
    }
  }
`

export default CreateContent