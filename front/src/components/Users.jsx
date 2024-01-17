import React, {useEffect} from 'react';
import MyProfile from '../picture/my_profile.png';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Users.css';
import { updateUser } from '../redux/currUser';

const Users = ({ activeTab }) => {
    const usersList_ = useSelector((state) => state.users.usersList);
    console.log('Users component usersList:', usersList_);
    const usersDict = useSelector((state) => state.users.usersDict);
    console.log('Users component usersDict:', usersDict);
    const currentUser = useSelector((state) => state.currUser.info);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        (async () => {
          const friendsData = await (await fetch(`http://127.0.0.1:8001/app/api/users/${currentUser.id}/friends/`)).json()
          console.log(friendsData)
          const friendsIds = friendsData.map((friend) => friend.id).flat();
          console.log(friendsIds)
          dispatch(updateUser({friends: friendsIds}));
        })()
      }, [])

    const handleButtonClick = (userId) => {      
        if (Number(userId) === Number(currentUser.id)) {
            navigate('/home');
        } else {
            navigate(`/user/${userId}`);
        }
    };
    console.log(activeTab)
    console.log(currentUser.id)
    const usersList = activeTab ? usersList_ : currentUser.friends

    return (
        <form>
            {usersList && usersList.length > 0 ? (
                usersList.map((userId) => {
                    const user = usersDict[userId];
                    return (
                        <button className='user' key={user.id} onClick={() => handleButtonClick(userId)}>
                            <img src={MyProfile} alt='' />
                            <h3>{user.name}, {user.age}</h3>
                        </button>
                    );
                })
            ) : (
                <div className='user'>
                    <h3>Друзей нет</h3>
                </div>
            )}
        </form>
    );
};

export default Users;
