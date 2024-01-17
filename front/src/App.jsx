import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Entrance from './pages/Entrance';
import Friends from './pages/Friends';
import Messages from './pages/Messages';
import Friend from './components/User_profile';
import Communication from './components/Communication'

function App() {
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<Entrance />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/user/:id" element={<Friend />} />
                <Route path="/dialog/:id" element={<Communication />} />
            </Routes>
        </div>
    );
}

export default App;
