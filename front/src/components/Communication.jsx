import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/currChat';
import { useParams } from 'react-router-dom';
import Body from '../components/Body';

import './Communication.css';

const Communication = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentUser = useSelector((state) => state.currUser.info);
  const messageList = useSelector((state) => state.currChat.messagesList);
  const messageDict = useSelector((state) => state.currChat.messagesDict);

  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dialogData = await fetch(`http://127.0.0.1:8001/app/api/dialog/${id}/`);
        const jsonData = await dialogData.json();
        const extractedMessageIds = jsonData.dialog.map((message) => message.id);

        dispatch(setMessages({ id, data: jsonData.dialog, messageIds: extractedMessageIds }));
      } catch (error) {
        console.error('Error fetching dialog data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [dispatch, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newMessageObj = {
        id: messageList.length + 1,
        text: newMessage,
        sender: currentUser.id,
        dialog: id,
        time: new Date().toISOString(),
        is_read: false,
      };
      console.log(newMessageObj)

      const updatedMessagesList = [...messageList, newMessageObj.id];
      console.log(updatedMessagesList)

      const dialogData = await fetch(`http://127.0.0.1:8001/app/api/dialog/${id}/`);
      const jsonData = await dialogData.json();
      
      const updatedDialog = [...jsonData.dialog, newMessageObj];

      console.log(jsonData.dialog)
      console.log(updatedDialog)
      dispatch(setMessages({ id, data: updatedDialog, messageIds: updatedMessagesList }));

      setNewMessage('');

      await fetch(`http://127.0.0.1:8001/app/api/dialog/${id}/`, {
        method: 'POST',
        body: JSON.stringify({
          text: newMessage,
          sender: currentUser.id,
          time: new Date().toISOString(),
          is_read: false,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      

    } catch (error) {
      console.error('Error updating chat:', error);
    }
  };

  return (
    <div>
      <Body props='MESSAGES' />
      <div className='communication-container'>
        <div className='messages-container'>
          {messageList &&
            messageList.map((messageId) => {
              const message = messageDict[messageId];
              return (
                <div
                  key={message.id}
                  className={`message ${message.sender === currentUser.id ? 'me' : 'other'}`}
                >
                  {message.text}
                </div>
              );
            })}
        </div>
        <form onSubmit={handleSubmit} className='input-form'>
          <input
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder='Type your message'
          />
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Communication;
