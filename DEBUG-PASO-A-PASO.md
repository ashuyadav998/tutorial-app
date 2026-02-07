# 🔍 DEBUG PASO A PASO - No puedo escribir

## ⚠️ Síntomas
- ❌ No puedo escribir en los campos email/password
- ❌ Los botones no responden
- ✅ La página carga

## 🧪 Pasos de Debug

### PASO 1: Abrir Consola del Navegador
1. Presiona `F12` (o `Ctrl+Shift+I` en Windows, `Cmd+Option+I` en Mac)
2. Ve a la pestaña "Console"
3. Mantén la consola abierta mientras pruebas

### PASO 2: Ir a Login
1. Ve a: `http://localhost:3000/login`
2. Observa la consola

**Deberías ver:**
```
🎨 Login renderizado. Estado: {isLogin: true, email: 0, password: 0}
```

**Si NO ves nada:**
- ❌ React no está cargando
- Solución: Reinicia el frontend

### PASO 3: Hacer Click en Email
1. Haz click en el campo de email
2. Mira la consola

**Deberías ver:**
```
🖱️ Click en email
🎯 Focus en email
```

**Si NO ves nada:**
- ❌ Los eventos no se están capturando
- Problema: CSS bloqueando o JavaScript deshabilitado

### PASO 4: Escribir en Email
1. Escribe "test" en el campo email
2. Mira la consola

**Deberías ver:**
```
✉️ Email: t
✉️ Email: te
✉️ Email: tes
✉️ Email: test
```

**Si NO ves nada:**
- ❌ onChange no funciona
- Problema grave con React

### PASO 5: Test Manual en Consola
Copia y pega esto en la consola:

```javascript
// Test 1: ¿Existe el input?
const emailInput = document.querySelector('input[type="email"]');
console.log('Input encontrado:', emailInput);

// Test 2: ¿Está visible?
console.log('Visible:', emailInput.offsetParent !== null);

// Test 3: ¿Está habilitado?
console.log('Habilitado:', !emailInput.disabled);

// Test 4: ¿Tiene z-index correcto?
console.log('Z-index:', window.getComputedStyle(emailInput).zIndex);

// Test 5: ¿Pointer events habilitado?
console.log('Pointer events:', window.getComputedStyle(emailInput).pointerEvents);

// Test 6: Forzar focus
emailInput.focus();
console.log('Focus forzado');

// Test 7: Forzar valor
emailInput.value = 'test@test.com';
emailInput.dispatchEvent(new Event('input', { bubbles: true }));
console.log('Valor forzado');
```

**Resultados esperados:**
```
Input encontrado: <input type="email"...>
Visible: true
Habilitado: true
Z-index: 1000
Pointer events: auto
Focus forzado
Valor forzado
✉️ Email: test@test.com
```

---

## 🔧 Soluciones Según Resultados

### Problema 1: Input no encontrado
```
Input encontrado: null
```

**Causa:** React no renderizó el componente

**Solución:**
```bash
cd frontend
# Limpiar
rm -rf node_modules .cache build
npm install
npm start
```

### Problema 2: Input no visible
```
Visible: false
```

**Causa:** CSS display: none o visibility: hidden

**Solución:** Inspecciona el elemento (click derecho → Inspect) y busca estilos que lo oculten

### Problema 3: Pointer events none
```
Pointer events: none
```

**Causa:** CSS bloqueando clicks

**Solución en App.css:**
```css
input, textarea, select, button {
  pointer-events: auto !important;
  z-index: 1000 !important;
}
```

### Problema 4: Valor no se actualiza
Forzaste el valor pero no viste el log `✉️ Email: test@test.com`

**Causa:** React no está escuchando eventos

**Solución:**
1. Verifica que React está cargado:
```javascript
console.log('React version:', React.version);
```

2. Si da error "React is not defined":
```bash
cd frontend
npm install react react-dom
npm start
```

---

## 🆘 Solución de Emergencia

Si NADA funciona, usa esta versión ultra-simple:

### Crear: `frontend/src/pages/SimpleLogin.js`

```jsx
import React from 'react';

function SimpleLogin() {
  const [email, setEmail] = React.useState('');
  
  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1>Test Simple</h1>
      <input 
        type="email"
        value={email}
        onChange={(e) => {
          console.log('Cambió:', e.target.value);
          setEmail(e.target.value);
        }}
        style={{
          padding: '1rem',
          fontSize: '1rem',
          width: '300px',
          display: 'block',
          marginBottom: '1rem'
        }}
      />
      <p>Valor: {email}</p>
    </div>
  );
}

export default SimpleLogin;
```

### Actualizar `App.js`:
```jsx
import SimpleLogin from './pages/SimpleLogin';

// En Routes:
<Route path="/test-login" element={<SimpleLogin />} />
```

Ve a: `http://localhost:3000/test-login`

**Si esto funciona:**
- El problema está en el Login.js complejo
- Usa SimpleLogin como base

**Si esto NO funciona:**
- Problema fundamental con React
- Reinstala todo desde cero

---

## 📋 Checklist Final

- [ ] Consola abierta (F12)
- [ ] Veo logs de renderizado
- [ ] Veo logs de click
- [ ] Veo logs de onChange
- [ ] Test manual funcionó
- [ ] Pointer events: auto
- [ ] Z-index alto (>100)
- [ ] Input visible
- [ ] React cargado

Si todos marcados pero sigue sin funcionar:
**Es un problema del sistema operativo o navegador específico.**

Prueba:
1. Otro navegador
2. Modo incógnito
3. Otra computadora

---

## 💡 Causa Más Común

**90% de las veces es:**
1. Cache del navegador (Ctrl+F5 para limpiar)
2. Extensión bloqueando (desactiva todas)
3. CSS con z-index negativo bloqueando

**Solución rápida:**
1. Modo incógnito
2. Ctrl+Shift+Delete (borrar cache)
3. Intentar de nuevo
