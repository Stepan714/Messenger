import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Body from './Body';
import My_profile from '../picture/my_profile.png';
import { updateUser } from '../redux/currUser';
import { setChats } from '../redux/chats';

const Friend = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usersDict = useSelector((state) => state.users.usersDict);
  const currentUser = useSelector((state) => state.currUser.info);
  const chatsDict = useSelector((state) => state.chats.chatsDict);
  const currUser = useSelector((state) => state.currUser.info);

  if (!usersDict || !usersDict[id]) {
    return <div>Пользователь не найден</div>;
  }

  const user = usersDict[id];

  const isFriend = currentUser && currentUser.friends.some((friendId) => friendId === Number(id));

  const handleFriendButtonClick = async () => {
    const updatedFriends = isFriend
      ? currentUser.friends.filter((friendId) => friendId !== Number(id))
      : [...currentUser.friends, Number(id)];

    try {
      const response = await fetch(`http://127.0.0.1:8001/app/api/users/${currentUser.id}/friends/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friends: updatedFriends }),
      });

      if (response.ok) {
        dispatch(updateUser({ friends: updatedFriends }));
      } else {
        console.error('Failed to update friends on the server');
      }
    } catch (error) {
      console.error('Error during the update:', error);
    }
  };

  const dialogIdsWithcurrUser = Object.values(chatsDict).filter((dialog) => dialog.participants.includes(currUser.id)).map((dialog) => dialog.id);
  const dialogIdsWithUser = Object.values(chatsDict).filter((dialog) => dialog.participants.includes(Number(id))).map((dialog) => dialog.id);
  const Iddialog = dialogIdsWithcurrUser.filter((id) => dialogIdsWithUser.includes(id));
  const result = Iddialog.length > 0 ? Iddialog[0] : 0;

  const handleWriteButtonClick = async () => {
    if (result === 0) {
        const response = await fetch('http://127.0.0.1:8001/app/api/dialogs/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              participants: [currentUser.id, Number(id)],
            }),
        });

        console.log(response)
        const allchats = await (await fetch("http://127.0.0.1:8001/app/api/dialogs/")).json()
        console.log(allchats.get)
        dispatch(setChats(allchats.get))
        navigate(`/dialog/${allchats.get.pop().id}`);
    } else {
        navigate(`/dialog/${result}`);
    }


  };

  return (
    <div homepage>
      <Body props={isFriend ? `FRIEND PROFILE - ${user.name}` : `USER PROFILE - ${user.name}`} />

      <div className="form_profile">
        <img className="photo" src={My_profile} alt="" />
        <input type="text" id="full-name" name="full-name" value={user.name} />
        <input type="text" id="age" name="age" value={user.age} />
        <input type="text" id="telephon" name="telephon" value={user.telephon} />
        <input type="text" id="city" name="city" value={user.city} />
        <input type="text" id="about_you" name="about_you" value={user.aboutme} />

        <button
          style={{ backgroundColor: isFriend ? 'red' : 'green' }}
          onClick={handleFriendButtonClick}
        >
          {isFriend ? 'Удалить' : 'Добавить'}
        </button>

        <button onClick={handleWriteButtonClick}>Написать</button>
      </div>
    </div>
  );
};

export default Friend;
