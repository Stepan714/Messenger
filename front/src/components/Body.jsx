import React from 'react';
import { Link } from 'react-router-dom'

import my_profile from '../picture/my_profile.png'
import friends from '../picture/friends.png'
import messages from '../picture/messages.png'
import exit from '../picture/exit.png'

import './Body.css'

class Body extends React.Component {
    render() {
        const { props } = this.props;
        return (
            <div className="home">

                <div className='chat'>
                    {props}
                </div>

                <Link to="/home" className="link-button">
                   <button className="button_profile">
                        <img src={my_profile} alt=""/>
                    </button>
                </Link>

                <Link to="/friends" className="link-button">
                    <button className="button_friends">
                        <img src={friends} alt=""/>
                    </button>
                </Link>

                <Link to="/messages" className="link-button">
                    <button className="button_messages">
                        <img src={messages} alt=""/>
                    </button>
                </Link>

                <Link to="/" className="link-button">
                    <button className="button_exit">
                        <img src={exit} alt=""/>
                    </button>
                </Link>

            </div>
        );
    }
}

export default Body;
