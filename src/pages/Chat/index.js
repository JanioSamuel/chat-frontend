import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import './styles.css';

require('dotenv').config()
const io = socketIOClient(process.env.REACT_APP_SOCKET_SERVER, { transports: ['websocket'] });

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState('');
  const [username, setUsername] = useState('');
  useEffect(() => {
    document.querySelector('.chat').scrollTop = document.querySelector('.chat').scrollHeight
  }, [messages])

  useEffect(() => {
    async function load() {
      const name = await localStorage.getItem('x-user');
      setUsername(name);
      io.emit('join', name);
      io.on('update', function (msg) {
        console.log(msg);
      })

      io.on('chat', function (client, msg) {
        const arr = messages;
        const data = {
          timestamp: +new Date(),
          client,
          msg
        }
        arr.push(data)
        if (arr.length > 50) {
          arr.shift();
        }
        console.log(arr)
        setMessages({ m: arr });
      })
    }
    load();
  }, [io]);

  function handleSubmit(event) {
    event.preventDefault();
    io.emit('send', chatMessage)
    setChatMessage('');
  }
  return (
    <>
      <h3>Jobsity Chat</h3>
      <div className="chat-container">
        <div className="chat">
          <ul>
            {
              messages.m ? messages.m.map(message => (
                <li key={message.timestamp}>
                  <div className={username === message.client ? "message user" : "message"}>
                    <label className="time">{message.timestamp}</label>
                    <span className="client-title">{username === message.client ? '' : `${message.client}:`} </span>
                    <span className="message-span">{message.msg}</span>
                  </div>
                </li>
              )) : ''}

          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            id="chatMessage"
            type="text"
            value={chatMessage}
            onChange={event => setChatMessage(event.target.value)} />
          <button className="btn" type="submit">Send</button>
        </form>
      </div>
    </>
  );
}