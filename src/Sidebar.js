import React, { useEffect } from 'react'
import './Sidebar.css'
import {Avatar, IconButton} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import RateReviewIcon from '@material-ui/icons/RateReview';
import SidebarChat from './SidebarChat';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db,{auth} from './firebase'
import { useState } from 'react';


function Sidebar() {
    const user =useSelector(selectUser)
    const [chat,setchat]=useState([])

    const addChat=()=>{

        const chatName=prompt('Enter Room name')
        db.collection('chats').add({
            chatName:chatName
        })
    }

    useEffect(() => {
        db.collection('chats').onSnapshot(snapshot=>(
            setchat(snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data()
            })))
        ))
    }, [])
    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <Avatar onClick={()=>auth.signOut()} className='sidebar__avatar' src={user?.photo}/>
                <div className="sidebar__input">
                    <SearchIcon/>
                    <input placeholder='search here'/>
                </div>
                <IconButton variant='outlined' className='sidebar__inputButton'>
                <RateReviewIcon onClick={addChat}/>
                </IconButton>
                
            </div>
            <div className="sidebar__chat">
                {chat.map(({id,data:{chatName}})=>(
                     <SidebarChat key={id} id={id} chatName={chatName}/>
                ))}

            </div>
        </div>
    )
}

export default Sidebar
