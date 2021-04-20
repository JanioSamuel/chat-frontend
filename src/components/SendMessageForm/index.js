import React, { useState } from 'react';
import './styles.css';

export default function SendMessageForm({ io }) {
  const [chatMessage, setChatMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (chatMessage) {
      io.emit('send', chatMessage)
      setChatMessage('');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="chatMessage"
        type="text"
        value={chatMessage}
        onChange={event => setChatMessage(event.target.value)} />
      <button className="btn" type="submit">Send</button>
    </form>
  )
}