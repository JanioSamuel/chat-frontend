import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import ChatScreen from '../../components/ChatScreen';
import SendMessageForm from '../../components/SendMessageForm';
import api from '../../services/api';
import './styles.css';

require('dotenv').config()
const io = socketIOClient(process.env.REACT_APP_SOCKET_SERVER, { transports: ['websocket'] });

export default function Chat({ history }) {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    document.querySelector('.chat').scrollTop = document.querySelector('.chat').scrollHeight
  }, [messages])

  useEffect(() => {
    async function load() {
      const name = localStorage.getItem('x-user');
      setUsername(name);

      io.emit('join', name);

      socketListenerChat();
    }
    load();
  }, []);

  function socketListenerChat() {
    io.on('chat', function (client, msg) {
      const arr = messages;
      const data = { timestamp: +new Date(), client, msg }
      arr.push(data)
      if (arr.length > 50) {
        arr.shift();
      }
      setMessages({ m: arr });
    })
  }

  async function handleLogout() {
    await api.post('/logout');
    localStorage.removeItem('x-token');
    io.emit('leave');
    history.push('/');
  }

  return (
    <>
      <h3>Jobsity Chat</h3>
      <button className="leave" type="button" onClick={handleLogout}>Leave</button>
      <div className="chat-container">
        <ChatScreen messages={messages} username={username} />
        <SendMessageForm io={io} />
      </div>
    </>
  );
}