import React, { useState } from 'react';
import profile from '../picture/profile.jpg'
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/currUser';

import './Profile.css'



const Profile = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.currUser.info);
    const [newName, setNewName] = useState(user.name)
    const [newAge, setNewAge] = useState(user.age)
    const [newTelephon, setNewTelephon] = useState(user.telephon)
    const [newCity, setNewCity] = useState(user.city)
    const [newAboutme, setNewAboutme] = useState(user.aboutme)
    

    const handleSumbit = async (event) => {
        event.preventDefault()
        const name = event.target[0].value
        const age = event.target[1].value
        const telephon = event.target[2].value
        const city = event.target[3].value
        const aboutme = event.target[4].value

        dispatch(updateUser({ name, age, telephon, city, aboutme }))

        await fetch(`http://127.0.0.1:8001/app/api/users/`, {
            method: "PUT",
            body: JSON.stringify({
                ...user, 
                name, 
                age,
                telephon,
                city,
                aboutme
            }),
            headers: {"Content-Type": "application/json"}
        })
    }

    return (
        <form class="form_profile" onSubmit={handleSumbit}>

            <img className='photo' src={profile} alt=''/>

            <input type="text" id="full-name" name="full-name" value={newName} onChange={(e) => setNewName(e.target.value)}/>

            <input type="text" id="age" name="age"  value={newAge} onChange={(e) => setNewAge(e.target.value)}/>

            <input type="text" id="telephon" name="telephon"  value={newTelephon} onChange={(e) => setNewTelephon(e.target.value)}/>

            <input type="text" id="city" name="city"  value={newCity} onChange={(e) => setNewCity(e.target.value)}/>

            <input type="text" id="about_you" name="about_you"  value={newAboutme} onChange={(e) => setNewAboutme(e.target.value)}/>

            <button className='save'>Сохранить</button>

        </form>  
    );


}


export default Profile;