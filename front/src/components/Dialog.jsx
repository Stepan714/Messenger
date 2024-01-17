import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import My_profile from '../picture/my_profile.png';

import './Dialog.css';

const Dialog = () => {
    const currentUser = useSelector((state) => state.currUser.info);
    const chatsDict = useSelector((state) => state.chats.chatsDict);
    const users = useSelector((state) => state.users.usersDict);

    const navigate = useNavigate();

    const isUserInChat = (chat) => chat.participants.some((participant) => participant === currentUser.id);
    
    const userDialogs = Object.values(chatsDict).filter((chat) => isUserInChat(chat));

    return (
        <div>
            {userDialogs.length > 0 ? (
                userDialogs.map((el) => {
                    const otherUserId = el.participants.find((participant) => participant !== currentUser.id);

                    const otherUserName = users[otherUserId]?.name || 'Неизвестный пользователь';

                    return (
                        <button
                            className="user"
                            key={el.id}
                            onClick={() =>
                                navigate(`/dialog/${el.id}`, {
                                    state: { users: el.participants }
                                })
                            }
                        >
                            <img src={My_profile} alt="" />
                            <h3>{otherUserName}</h3>
                        </button>
                    );
                })
            ) : (
                <div className="user">
                    <h3> </h3>
                </div>
            )}
        </div>
    );
};

export default Dialog;
