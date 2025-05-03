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
- **dotenv** para gestión de variables de entorno
- **JWT** para autenticación

## Instalación ⚙️
# Para el backend
```bash
# 1. Clonar repositorio
git clone https://github.com/LEONGO037/BackendTallerDeGrado.git
cd BackendTallerDeGrado

# 2. Instalar dependencias
npm install

# 3. Correr el servidor
npm run dev
```

# Para el microservicio
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

## 