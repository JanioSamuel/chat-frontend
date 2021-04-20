import React from 'react';
import './styles.css';

export default function ChatScreen({ messages, username }) {
  return (
    <>
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
    </>
  )
}