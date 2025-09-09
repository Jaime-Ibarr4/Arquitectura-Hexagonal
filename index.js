const express = require('express');
const path = require('path');

// Adaptadores de salida
const InMemoryUserRepository = require('./adapters/out/persistence/in-memory-user.repository');

// Adaptadores de entrada
const AuthController        = require('./adapters/in/web/auth.controller');
const createAuthRoutes      = require('./adapters/in/web/auth.routes');

// Casos de uso
const RegisterUserUseCase   = require('./application/use-case/register-user.use-case');
const LoginUserUseCase      = require('./application/use-case/login-user.use-case');

// Servicio de dominio
const AuthService           = require('./domain/services/auth.service');

const app  = express();
const port = process.env.PORT || 3000;

// 1) Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// 2) Parsear JSON
app.use(express.json());

// 3) Montar rutas de autenticación
const userRepo    = new InMemoryUserRepository();
const authService = new AuthService();
const registerUC  = new RegisterUserUseCase(userRepo);
const loginUC     = new LoginUserUseCase(userRepo, authService);
const authCtrl    = new AuthController(registerUC, loginUC);

app.use('/api/auth', createAuthRoutes(authCtrl));

// 4) Handler para la raíz (GET /)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// 5) Manejador global de errores
app.use((err, req, res, next) => {
  res.status(400).json({ success: false, message: err.message });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});