# Microservicio WebSocket para Conteo de Usuarios - Taller de Grado UCB

## Descripción General 🚀
Este proyecto implementa un microservicio independiente utilizando **WebSocket** que:
- Se autentica automáticamente con la API del sistema de Taller de Grado
- Obtiene datos de usuarios desde `/cuentas-por-rol/{rol}`
- Proporciona conteos en tiempo real de:
  - Directores (rol 1)
  - Docentes (rol 2)
  - Estudiantes (rol 3)
- Expone un endpoint WebSocket para recibir actualizaciones periódicas

## Tecnologías Utilizadas 💻
- **Node.js** (v18+)
- **WebSocket** (biblioteca `ws`)
- **Axios** para consumo de API REST
- **JWT** para autenticación

## Instalación ⚙️
### Para el backend
```bash
# 1. Clonar repositorio
git clone https://github.com/LEONGO037/BackendTallerDeGrado.git
cd BackendTallerDeGrado

# 2. Instalar dependencias
npm install

# 3. Correr el servidor
npm run dev
```

### Para el microservicio
```bash
# 1. Clonar repositorio
git clone https://github.com/LEONGO037/IntegracionDeMicroservicio.git
cd IntegracionDeMicroservicio

# 2. Instalar dependencias
npm install

# 3. Correr el servidor
cd src
node server.js
```

## Uso 🛠️
- En Postman poner el "Switch request type" en "WebSocket"
- En la URL 
```ws://localhost:8080```
- En el mensaje es necesario poner:
```json
{
    "usuario": "Mollo10084999",
    "contrasenia": "10084999Mollo"
}
```

- Como respuesta se tendra la cantidad de docentes, directores y estudiantes registrados actualmente, se actualiza esta lista cada 10 segundos
```json
{
  "directores": 1,
  "docentes": 3,
  "estudiantes": 8,
  "total": 12,
}
```

## Estructura del Proyecto 📂
```bash
/microservicio-websocket
├── src/
│   ├── services/
│   │   └── websocket.service.js  # Lógica principal WebSocket
│   ├── server.js
├── .gitignore
└── package.json
└── package-look.json
```

- **websocket.service.js** realiza el conteo de los usuarios registrados
- **server.js** inicializa el servidor

## Consideraciones
- El microservicio maneja el inicio de sesion con token JWT

## Pruebas
- Conexión exitosa al WebSocket.
- Validación de actualización automática cada 10 segundos.

## Autor
- **Leonardo Delgado Medrano**