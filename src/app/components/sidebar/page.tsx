'use client'
import React from 'react'
import styled from 'styled-components'
import {UseGlobalState} from '@/app/context/globalProvider'
import Image from 'next/image'
import profile from '../../images/profile.jpeg'
import menu from '@/app/utils/menu'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { arrowLeft, bars, logout } from '@/app/utils/Icons'
import Button from '../Button/Button'
import { UserButton, useClerk, useUser } from '@clerk/nextjs'

const SideBar = () => {
  const {theme, collapsed, collapseSidebar} = UseGlobalState()
  const router = useRouter()
  const pathname = usePathname()
  const {signOut} = useClerk()

  const {user} = useUser()
  console.log(user)
  //destructure user's firstname and lastname
  const {firstName, lastName, imageUrl} = user || {firstName : "", lastName : "", imageUrl: ""}

  const handleClickLink = (link : string) => {
    router.push(link)
  }
  
  return (
    <SideBarStyles theme={theme} collapsed={collapsed}>
      <button className="toggle-nav" onClick={collapseSidebar}>
        {collapsed ? bars : arrowLeft}
      </button>
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          <Image height={70} width={70} alt='profile avatar' src={imageUrl}/>
        </div>
        <div className="user-btn absolute w-full top-0 z-20 h-full">
          <UserButton/>
        </div>
        <h1 className='capitalize'>
          {firstName} {lastName}
        </h1>
      </div>
      <ul className="nav-items">
        {menu.map((item) => {
          const link = item.link
          return (
            <li key={item.id} className={`nav-item ${pathname === link ? "active" : ""}`} onClick={() => {
              handleClickLink(item.link)
            }}>
              {item.icon}
              <Link href={item.link}>
                {item.title}
              </Link>
            </li>
          )
        })}
      </ul>
      <div className="sign-out relative mb-6">
        <Button
          name={'Sign Out'}
          type={'submit'}
          padding={"0.4rem 0.8rem"}
          borderRad={'0.8rem'}
          fw={'500'}
          fs={'1.2rem'}
          icon={logout}
          click={() => {
            signOut(() => router.push("/signin"))
          }}
          color=''
        />
      </div>
    </SideBarStyles>
  )
}

const SideBarStyles = styled.nav<{collapsed : boolean}>`
  position : relative;
  width : ${(props) => props.theme.sidebarWidth};
  background-color : ${(props) => props.theme.colorBg2};
  border : 2px solid ${(props) => props.theme.borderColor2};
  border-radius : 1rem;
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content : space-between;
  color : ${(props) => props.theme.colorGrey3};

  @media screen and (max-width : 768px) {
    position : fixed;
    height : calc(100vh - 3rem);
    z-index : 100;

    transition : all o.3s cubic-bezier(0.53, 0.21, 0, 1);
    transform : ${(props) => props.collapsed ? "translateX(-107%)" : "translateX(0%)"};

    .toggle-nav {
      display : block !important;
    }
  }

  .toggle-nav{
    display : none;
    padding : 0.8rem 0.9rem;
    position : absolute;
    right : -60px;
    top : 1.8rem;

    border-top-right-radius : 1rem;
    border-bottom-right-radius : 1rem;
    border-right : 2px solid ${(props) => props.theme.borderColor2};
    border-top : 2px solid ${(props) => props.theme.borderColor2};
    border-bottom : 2px solid ${(props) => props.theme.borderColor2};
    background-color : ${(props) => props.theme.colorBg2};
  }

  .user-btn{
    .cl-rootBox{
      width: 100%;
      height : 100%;

      .cl-userButtonBox{
        width : 100%;
        height : 100%;

        .cl-userButtonTrigger{
          width : 100%;
          height : 100%;
          display : flex;
          opacity : 0; 
        }
      }
    }
  }

  .profile {
    margin : 1rem;
    padding : 1rem 0.8rem;
    position : relative;
    border-radius : 1rem;
    cursor : pointer;
    font-weight : 500;
    color : ${(props) => props.theme.colorGrey0};
    display : flex;
    align-items : center;

    .profile-overlay {
      position : absolute;
      top : 0;
      left : 0;
      width : 100%;
      height : 100%;
      backdrop-filter : blur(10px);
      z-index : 0;
      background : ${(props) => props.theme.colorBg3};
      transition : all 0.55s linear;
      border-radius : 1rem;
      opacity : 0.2;
    }

    h1 {
      font-size : 1.2rem;
      display : flex;
      flex-direction : column;
      line-height : 1rem
    }

    .image, h1 {
      position : relative;
      z-index : 1;
    }

    .image {
      flex-shrink : 0;
      display : inline-block;
      overflow : hidden;
      transition : all 0.55s ease;
      border-radius : 100%;

      width : 70px;
      height : 70px;

      img {
        border-radius : 100%;
        transition : all 0.55s linear;
      }
    }

    > h1 {
      margin-left : 1rem;
      font-size : clamp(1.2rem , 4vw, 1.4rem);
      line-height : 100%;
    }

    &:hover {
      .profile-overlay {
        opacity : 1;
        border : 2px solid ${(props) => props.theme.borderColor2};
      }

      img {
        transform : scale(1.1);
      }
    }
  }

  .nav-item {
    position : relative;
    padding: 0.7rem 1rem 0.7rem 2.1rem;
    margin : 0.3rem 0;
    display : grid;
    grid-template-columns : 40px 1fr;
    align-items : center;
    cursor : pointer;
    
    &::after {
      position : absolute;
      content : "";
      left : 0;
      top : 0;
      width : 0;
      height : 100%;
      background-color : ${(props) => props.theme.activeNavLinkHover};
      z-index : 1;
      transition : all 0.3s ease-in-out;
    }

    &::before {
      position : absolute;
      content : "";
      right : 0;
      top : 0;
      width : 0%;
      height : 100%;
      background-color : ${(props) => props.theme.colorGreenDark};

      border-bottom-left-radius : 5px;
      border-top-left-radius : 5px; 
    }

    a {
      font-weight : 500;
      z-index : 2;
      transition : all 0.3s ease-in-out;
      line-height : 0;
    }

    i {
      display : flex;
      align-items : center;
      color : ${(props) => props.theme.colorIcons};
    }

    &:hover {
      &::after {
        width : 100%;
      }
    }
  }

  .active {
    background-color : ${(props) => props.theme.activeNavLinkHover};

    i {
      color : ${(props) => props.theme.colorIcons2};
    }
  }

  .active::before {
    width: 0.3rem;
  }

  > button {
    margin: 1.5rem;
  } 
`

export default SideBar