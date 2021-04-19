import './App.css';
import socketIOClient from 'socket.io-client';
import { useEffect } from 'react';
import api from './services/api';
import Routes from './routes';
const SERVER = 'http://localhost:3002';

function App() {
  // useEffect(() => {
  //   async function load() {
  //     const socket = socketIOClient(SERVER, { transports: ['websocket'] });
  //     socket.emit('join', 'Janio Samuel');
  //     socket.on('update', function (msg) {
  //       console.log(msg);
  //     })
  //   }
  //   load();

  // }, []);
  return (
    <div className="container">
      <Routes />
    </div>
  );
}

export default App;
