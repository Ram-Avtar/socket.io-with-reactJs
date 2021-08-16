import React, { useEffect, useState } from 'react';
import io from "socket.io-client";



function App() {

  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [dt, setDt] = useState('');

  // establish socket connection
  useEffect(() => {
    setSocket(io('http://localhost:4000',{transports:["websocket"]}));
    // console.log("establish the socket connection", socket)
  },[]);

  // subscribe to the socket event
  useEffect(() => {
    // console.log("subscribe  the socket event before", socket)
    if (!socket) return;

    socket.on('connect', () => {
      setSocketConnected(socket.connected);

      subscribeToDateEvent();
      // console.log("subscribe  the socket event after", socket)
    });
    socket.on('disconnect', () => {
      setSocketConnected(socket.connected);
    });
   
    socket.on("getDate", data => {
      setDt(data);
    });

  });

  // manage socket connection
  const handleSocketConnection = () => {
    // console.log(socketConnected);
    if (socketConnected)
     return socket.disconnect();
    else {
     return socket.connect();
    }
  }

  // subscribe to socket date event
  const subscribeToDateEvent = (interval = 1000) => {
    socket.emit('subscribeToDateEvent', interval);
  }

  return (
    <div>
      <h2>Welcome to Socket.IO with React JS App</h2>

      <div><b>Connection status:</b> {socketConnected ? 'Connected' : 'Disconnected'}</div>
      <input
        type="button"
        style={{ marginTop: 10 }}
        value={socketConnected ? 'Disconnect' : 'Connect'}
        onClick={handleSocketConnection} 
        />

      <div style={{ marginTop: 20 }}><b>Date: </b> 
      {dt}
      </div>
    </div>
  );
}

export default App;