import './Chat.css';
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import {useLocation} from 'react-router-dom';

let socket;


// export function Chat({location}){
//     const [room, setRoom] = useState('');
//     const [name, setName] = useState('');
//     const ENDPOINT = 'localhost:5000';

//     useEffect(() =>{
//         const {name,room} = queryString.parse(location.search);
//         socket = io(ENDPOINT);
//         setName(name);
//         setRoom(room);
//         console.log(socket);
//     }, [ENDPOINT, location.search]);
    
//     return(<h1>Chat</h1>)
// }

const Chat = () =>{
    const[name,setName] = useState('');
    const[room,setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';
    socket = io(ENDPOINT,{
        transports:['websocket','polling','flashsocket'],
    });
    const location = useLocation();
    useEffect(() =>{
        const{ name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);
        console.log(socket);
        console.log(name);

        socket.emit('join', { name, room });
    }, [ENDPOINT, location.search]);

    return (
        <h1>Chat</h1>
    )
}

export default Chat;



