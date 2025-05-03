import { WebSocketServer } from 'ws';
import axios from 'axios';

let wss;
let authCredentials = {}; // Almacena credenciales por conexión

export function initWebSocket(server) {
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('Cliente WebSocket conectado');

    // Esperar el primer mensaje con las credenciales
    ws.once('message', async (message) => {
      try {
        const { usuario, contrasenia } = JSON.parse(message);
        
        if (!usuario || !contrasenia) {
          throw new Error('Credenciales faltantes');
        }

        // Guardar credenciales para esta conexión
        authCredentials[ws.id] = { usuario, contrasenia };
        
        // Enviar conteo inicial
        await sendUserCount(ws);
        
        // Configurar intervalo para actualizaciones
        const interval = setInterval(() => sendUserCount(ws), 10000);

        ws.on('close', () => {
          clearInterval(interval);
          delete authCredentials[ws.id];
          console.log('Cliente desconectado');
        });

      } catch (error) {
        console.error('Error en autenticación:', error.message);
        ws.send(JSON.stringify({ error: 'Autenticación fallida' }));
        ws.close();
      }
    });

    // Agregar ID único a la conexión
    ws.id = Math.random().toString(36).substring(7);
  });
}

async function sendUserCount(ws) {
  try {
    const { usuario, contrasenia } = authCredentials[ws.id] || {};
    if (!usuario || !contrasenia) return;

    const conteo = await contarUsuarios(usuario, contrasenia);
    if (conteo) {
      ws.send(JSON.stringify(conteo));
    }
  } catch (error) {
    console.error('Error al enviar conteo:', error.message);
  }
}

async function contarUsuarios(usuarioo, contrasenia) {
  try {
    // 1. Autenticación
    const loginResponse = await axios.post(`http://localhost:3000/login`, {
      usuario: usuarioo,
      contraseniaUser: contrasenia
    });
    
    const token = loginResponse.data.token;

    // 2. Obtener conteos
    const requests = [1, 2, 3].map(rol => 
      axios.get(`http://localhost:3000/cuentas-por-rol/${rol}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    );

    const [directores, docentes, estudiantes] = await Promise.all(requests);

    return {
      directores: directores.data.count,
      docentes: docentes.data.count,
      estudiantes: estudiantes.data.count,
      total: directores.data.count + docentes.data.count + estudiantes.data.count
    };
  } catch (error) {
    console.error('Error en contarUsuarios:', error.message);
    throw error;
  }
}