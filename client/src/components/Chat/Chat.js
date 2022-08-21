import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client"; 
import {useLocation} from 'react-router-dom';
import { Location } from "react-router";
// import TextContainer from '../TextContainer/TextContainer';
// import Messages from '../Messages/Messages';
// import InfoBar from '../InfoBar/InfoBar';
// import Input from '../Input/Input';

import './Chat.css';

// const ENDPOINT = 'https://project-chat-application.herokuapp.com/';
const ENDPOINT = 'localhost:5000';

let socket;

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState(''); 
  const location = useLocation();
  // const [users, setUsers] = useState('');
  // const [message, setMessage] = useState('');
  // const [messages, setMessages] = useState([]);

  useEffect(() => {
    
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  return (
    <div className="outerContainer">
      <div className="container">
          {/* <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> */}
      </div>
      {/* <TextContainer users={users}/> */}
    </div>
  );
}

export default Chat;
