import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";

import "./Chat.css";

const ENDPOINT = 'localhost:5000';
let socket;

const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  //Request to connect user to server 
  useEffect(() => {
    
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);
    console.log(socket);
    
    //Action requested from (emitted to) the server, server has corresponding "io.on('join')" to
    //receive and act on this request.
    socket.emit("join", { name, room }, (error) => {
      console.log('hi');
      if (error) {
        alert(error);
      }
    });
    return () => {
      // socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]); //this parameter enforces updating only when "location" changes, I think

  //Request for a user to send a message
  useEffect(() => {
    
    socket.on("message", (message) => {
      //add all new messages to array of messages w/o 
      //mutating state (adding message traditionally, like messages[length] = newMessage)
      setMessages([...messages, message]); 
    });
  }, [messages]); //this parameter enforces using useEffect only when 'messages' changes

  //Event handler written as an anonymous function for sending messages
  const sendMessage = (event) => {
    //preventDefault prevents full page refresh on keypress events
    event.preventDefault();

    if (message) {
      //final argument is callback to clear input box once msg is sent
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  //messages below contain nothing and are perhaps 
  //being sent nothing by server
  console.log(message, messages);
  
  return (
    <div className="outerContainer">
      <div className="container">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
      </div>
      
    </div>
  );
};

export default Chat;
