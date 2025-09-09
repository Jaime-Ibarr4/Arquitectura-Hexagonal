const showMessage = (text, isSuccess) => {
  const msg = document.getElementById('message');
  msg.textContent = text;
  msg.className = isSuccess ? 'message success' : 'message error';
};

const clearMessage = () => {
  const msg = document.getElementById('message');
  msg.textContent = '';
  msg.className = '';
};

// Toggle entre formularios
const loginForm    = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
document.getElementById('showRegister').addEventListener('click', e => {
  e.preventDefault();
  clearMessage();
  loginForm.classList.remove('active');
  registerForm.classList.add('active');
});
document.getElementById('showLogin').addEventListener('click', e => {
  e.preventDefault();
  clearMessage();
  registerForm.classList.remove('active');
  loginForm.classList.add('active');
});

// Registrar usuario
registerForm.addEventListener('submit', async e => {
  e.preventDefault();
  clearMessage();

  const username = document.getElementById('regUsername').value.trim();
  const password = document.getElementById('regPassword').value;

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    showMessage(`Usuario registrado: ${data.data.username}`, true);
  } catch (err) {
    showMessage(err.message, false);
  }
});

// Iniciar sesión
loginForm.addEventListener('submit', async e => {
  e.preventDefault();
  clearMessage();

  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    showMessage(`Bienvenido, ${data.data.username}`, true);
  } catch (err) {
    showMessage(err.message, false);
  }
});