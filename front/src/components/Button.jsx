import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useDispatch } from 'react-redux';
import { changeToken } from '../redux/token';

import './Button.css';

export const login = async (name, password) => {
    try {
      const response = await fetch(`http://127.0.0.1:8001/app/auth/token/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: password, username: name }),
      });
      
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  

export const register = async (name, email, password, file) => {
  try {

    const response = await fetch(`http://127.0.0.1:8001/app/api/auth/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: password, username: name, email:email }),
      });


    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

const Button = () => {
  const [modalActive, setModalActive] = useState(false);
  const [modalActive_reg, setModalActive_reg] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
      const tokenData = await login(email, password);
      dispatch(changeToken(tokenData));
      console.log('Token:', tokenData);
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSubmit_regist = async (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];

    try {
        const registrationData = await register(name, email, password, file);
        
        console.log(registrationData)

        const response_log = await fetch(`http://127.0.0.1:8001/app/auth/token/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: password, username: name }),
        });
        const tokenData = await response_log.json();
        
        dispatch(changeToken(tokenData));
        console.log('New access token:', tokenData.access_token);
        console.log({ name: name, aboutme: '', telephon: '', city: '', age: 0, friends: [], key: tokenData.auth_token })
        const response = await fetch(`http://127.0.0.1:8001/app/api/users/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, aboutme: '_', telephon: '_', city: '_', age: 0, friends: [], key: tokenData.auth_token }),
        });

        console.log(response)

        navigate('/home');
    } catch (error) {
        console.error('Registration error:', error);
    }
  };

  return (
    <div className="Button">
      <button className="log_button" onClick={() => setModalActive(true)}>
        Войти
      </button>
      <button className="reg_button" onClick={() => setModalActive_reg(true)}>
        Зарегистрироваться
      </button>

      <Modal active={modalActive} setActive={setModalActive}>
        <div className="popup__title">Вход</div>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="login">Логин:</label>
          <input type="text" id="login" name="login" placeholder="login" />

          <label htmlFor="password">Пароль:</label>
          <input type="password" id="password" name="password" placeholder="password" />
          <button className="but_in">Войти</button>
        </form>
      </Modal>

      <Modal active={modalActive_reg} setActive={setModalActive_reg}>
        <div className="popup__title">Регистрация</div>
        <form className="form" onSubmit={handleSubmit_regist}>
          <input type="text" placeholder="nickname" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: 'none' }} type="file" id="file" />
          <label htmlFor="file">
            <img alt="" />
            <span>Add an avatar</span>
          </label>
          <button className="but_in">Зарегистрироваться</button>
        </form>
      </Modal>
    </div>
  );
};

export default Button;
