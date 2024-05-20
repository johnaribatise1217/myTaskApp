'use client'
import { UseGlobalState } from '@/app/context/globalProvider'
import React from 'react'
import styled from 'styled-components'

type Props = {
  content? : React.ReactNode
}

const Modal : React.FC<Props> = ({content}) => {
  const {closeModal, theme} = UseGlobalState()

  return (
    <ModalStyled theme={theme}>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-content">{content}</div>
    </ModalStyled>
  )
}

const ModalStyled = styled.div`
  position : fixed;
  top :0;
  left : 0;
  height : 100vh;
  width : 100%;
  z-index : 100;

  display : flex;
  align-items : center;
  justify-content : center;

  .modal-overlay {
    position : absolute;
    top : 0;
    left : 0;
    width : 100%;
    height : 100vh;
    background-color : rgba(0,0,0,0.45);
    filter : blur(4px);
  }

  .modal-content{
    padding : 2rem;
    position : relative;
    max-width: 600px; 
    max-height : 710px;
    height : 100%;
    width : 100%;
    z-index : 100;
    box-shadow : 0 0 1rem rgba(0,0,0,0.3);
    border-radius : ${(props) => props.theme.borderRadiusMd2};
    border-radius : 1rem;
    background-color : ${(props) => props.theme.colorBg2};
  }
`

export default Modal