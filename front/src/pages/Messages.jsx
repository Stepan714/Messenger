import React from 'react';
import Body from '../components/Body';
import Dialog from '../components/Dialog';

import '../css/Messages.css'

class Messages extends React.Component {
    render() {
        return (
            <div messages>

                <Body props='Messages'/>
                
                <div className='body_messages'>
                    <div className='messages-window'>
                        
                        <main>
                            <Dialog />
                        </main>

                    </div>
                </div>

            </div>
        );
    }
}

export default Messages;
