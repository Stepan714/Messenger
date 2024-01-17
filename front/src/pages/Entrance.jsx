import React from 'react';
import Main from '../components/Main';
import Button from '../components/Button';
import Image from '../components/Image';
import hippopotamus from '../picture/begemot.png';
import '../css/Entrance.css'

class Entrance extends React.Component {
    render() {
        return (
                <div className="entrance">

                    <main>
                        <Main />
                    </main>   
                    <Button />
                    <div className='image'>
                        <Image image={hippopotamus}/>
                    </div>
                </div>
          );
    }
}

export default Entrance;