import React, {useEffect} from 'react';
import {useSelector, useDispatch } from 'react-redux';
import Profile from '../components/Profile';
import Body from '../components/Body';
import { changeUser } from '../redux/currUser';
import { setUsers } from '../redux/users';
import { setChats } from '../redux/chats';

import '../css/Homepage.css'

const Homepage = () => {
    const dispatch = useDispatch();
    const userToken = useSelector((state) => state.token.info);

    useEffect(() => {
        (async () => {
          const currUser = await (await fetch(`http://127.0.0.1:8001/app/api/idbykey/${userToken.auth_token}/`)).json()
          dispatch(changeUser(currUser[0]))
          console.log(currUser)
          const users = await (await fetch("http://127.0.0.1:8001/app/api/users/")).json()
          console.log(users)
          dispatch(setUsers(users))
          console.log(users)  

          const allchats = await (await fetch("http://127.0.0.1:8001/app/api/dialogs/")).json()
          console.log(allchats.get)
          dispatch(setChats(allchats.get))
        
        })()
      }, [])

    return (
        <div homepage>
            <Body props='MY PROFILE'/>
            <Profile />
        </div>
    );
}

export default Homepage;
