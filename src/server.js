// server.js
import http from 'http';
import express from 'express';
import { initWebSocket } from './services/websocket.service.js'; 

const app = express();
const server = http.createServer(app);

// Servir el cliente WebSocket para pruebas
app.use(express.static('.')); // sirve client.html desde el root

// Iniciar WebSocket
initWebSocket(server);

// Iniciar el servidor
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor HTTP y WebSocket escuchando en http://localhost:${PORT}`);
});
