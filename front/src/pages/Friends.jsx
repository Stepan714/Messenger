import React, { useState } from 'react';
import Body from '../components/Body';
import Users from '../components/Users';

import '../css/Friends.css';

function Friends() {
  const [activeTab, setActiveTab] = useState('users');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  return (
    <div className="friends">
      {activeTab === 'users' ? (
        <div>
          <Body props="Users" />

          <div className="body_friend">
            <div className="friend-window">
              <main>
                <Users activeTab={true}/>
              </main>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Body props="Friends" />

          <div className="body_friend">
            <div className="friend-window">
              <main>
                <Users activeTab={false}/>
              </main>
            </div>
          </div>
        </div>
      )}

      <div className="tab-buttons">
        <button className="us" onClick={() => handleTabChange('users')}>
          Users
        </button>
        <button className="fr" onClick={() => handleTabChange('friends')}>
          Friends
        </button>
      </div>
    </div>
  );
}

export default Friends;
