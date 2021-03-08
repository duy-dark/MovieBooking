import React from 'react'
import socketio from "socket.io-client";

const SocketEndpoint = 'https://servermoviebooking.herokuapp.com';
// const socket = socketio(SocketEndpoint, {
//   transports: ['websocket']
// });

export const socket = socketio(SocketEndpoint, {
    transports: ['websocket']
  });
export const SocketContext = React.createContext();