# 🔧 Solución de Problemas Comunes

## ❌ Error al ejecutar `npm run seed`

### Problema 1: "Cannot find module"
```
Error: Cannot find module 'mongoose'
```

**Solución:**
```bash
cd backend
npm install
```

### Problema 2: "MongooseServerSelectionError"
```
MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solución:** MongoDB no está corriendo
```bash
# Iniciar MongoDB
mongod

# O verificar si está corriendo
# Mac/Linux:
ps aux | grep mongod

# Windows:
tasklist | findstr mongod
```

### Problema 3: "string is too long" o contenido muy largo
✅ **YA CORREGIDO** en la nueva versión del seed.js

---

## 🔘 Botones deshabilitados / No responden

### Problema: Los botones no hacen nada al hacer click

**Causas comunes:**
1. JavaScript deshabilitado en el navegador
2. Errores en la consola del navegador
3. React no cargó correctamente

**Solución:**
```bash
# 1. Limpiar cache y reinstalar
cd frontend
rm -rf node_modules package-lock.json
npm install

# 2. Iniciar de nuevo
npm start

# 3. Abrir consola del navegador (F12)
# Buscar errores en rojo
```

**Verificación:**
- Abre http://localhost:3000
- Presiona F12 (Abrir DevTools)
- Ve a la pestaña "Console"
- NO debe haber errores en rojo

✅ **YA CORREGIDO:** Añadido `type="button"` a todos los botones

---

## 🔍 No aparecen tutoriales

### Problema: La página está vacía o dice "No se encontraron tutoriales"

**Causa:** No ejecutaste el seed

**Solución:**
```bash
cd backend
npm run seed
```

**Deberías ver:**
```
✅ Conectado a MongoDB
✅ Base de datos limpiada
✅ Usuario admin creado
✅ 6 categorías creadas
✅ 5 tutoriales creados
```

---

## 🌐 Error de CORS

### Problema:
```
Access to fetch at 'http://localhost:5000/api/tutorials' from origin 
'http://localhost:3000' has been blocked by CORS policy
```

**Solución 1:** Verificar que el backend está corriendo
```bash
cd backend
npm run dev

# Deberías ver:
# 🌐 Servidor corriendo en puerto 5000
# ✅ Conectado a MongoDB
```

**Solución 2:** Verificar archivo .env del backend
```env
FRONTEND_URL=http://localhost:3000
```

---

## 🔐 No puedo iniciar sesión

### Problema 1: "Usuario no encontrado" o "Credenciales inválidas"

**Causa:** No ejecutaste el seed

**Solución:**
```bash
cd backend
npm run seed
```

**Credenciales correctas:**
- Email: `admin@tutoriales.com`
- Password: `admin123`

### Problema 2: Login se queda cargando infinitamente

**Solución:** Verificar que el backend está corriendo en puerto 5000
```bash
# En otra terminal:
curl http://localhost:5000/
# Debe responder con: {"message":"🚀 API de Tutoriales funcionando"}
```

---

## 📦 Dependencias no instaladas

### Problema: "Module not found"

**Solución completa:**
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 🔴 Backend crashea al iniciar

### Error: "Cannot read property 'PORT' of undefined"

**Solución:** Falta el archivo .env

**Backend (.env):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tutorial-platform
JWT_SECRET=mi_super_secreto_cambiar_en_produccion
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env):**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🎨 El diseño se ve raro / sin estilos

### Problema: CSS no carga

**Solución:**
```bash
cd frontend

# Limpiar cache
rm -rf node_modules/.cache

# Reiniciar
npm start
```

---

## 🚀 Puerto ya en uso

### Error:
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solución:**

**Mac/Linux:**
```bash
# Ver qué proceso usa el puerto 3000
lsof -i :3000

# Matar el proceso
kill -9 <PID>
```

**Windows:**
```bash
# Ver qué usa el puerto
netstat -ano | findstr :3000

# Matar el proceso
taskkill /PID <PID> /F
```

**O cambiar el puerto:**
```bash
# En frontend/.env
PORT=3001

# Iniciar con otro puerto
PORT=3001 npm start
```

---

## 📝 No puedo crear tutoriales en el dashboard

### Problema: "Access denied" o "No autorizado"

**Causa:** El usuario no es administrador

**Solución:** Verificar rol en MongoDB
```javascript
// En MongoDB Compass o mongo shell:
use tutorial-platform
db.users.findOne({ email: "admin@tutoriales.com" })

// Debe mostrar: { role: "admin" }

// Si no, actualizar:
db.users.updateOne(
  { email: "admin@tutoriales.com" },
  { $set: { role: "admin" } }
)
```

---

## 🔄 Cambios en el código no se reflejan

### Frontend

**Solución:**
```bash
# Detener el servidor (Ctrl+C)
# Limpiar cache
rm -rf node_modules/.cache

# Reiniciar
npm start
```

### Backend

**Solución:** Usar nodemon para auto-reload
```bash
npm run dev
# En lugar de npm start
```

---

## 🗄️ MongoDB Atlas (Cloud)

### Conectar a MongoDB Atlas en vez de local

**Paso 1:** Obtén tu connection string de Atlas

**Paso 2:** Actualiza backend/.env
```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/tutorial-platform?retryWrites=true&w=majority
```

**Paso 3:** Ejecuta el seed
```bash
npm run seed
```

---

## ⚡ Checklist General de Depuración

Cuando algo no funcione, sigue estos pasos:

- [ ] ¿MongoDB está corriendo? (`mongod` o MongoDB Compass abierto)
- [ ] ¿Backend está corriendo? (http://localhost:5000 responde)
- [ ] ¿Frontend está corriendo? (http://localhost:3000 abre)
- [ ] ¿Ejecutaste el seed? (`npm run seed` en backend)
- [ ] ¿Archivos .env creados? (backend y frontend)
- [ ] ¿Dependencias instaladas? (`npm install` en ambos)
- [ ] ¿Consola sin errores? (F12 en el navegador)
- [ ] ¿Puertos correctos? (5000 backend, 3000 frontend)

---

## 💬 ¿Aún tienes problemas?

### Información útil para reportar:

1. **Sistema operativo:** Windows / Mac / Linux
2. **Versión de Node:** `node --version`
3. **Error exacto:** Copia el mensaje completo
4. **Paso donde falla:** ¿Instalación? ¿Seed? ¿Ejecución?
5. **Captura de consola:** Errores en terminal y navegador (F12)

### Comandos de diagnóstico:

```bash
# Versiones
node --version
npm --version
mongod --version

# Estado de puertos
# Mac/Linux:
lsof -i :3000
lsof -i :5000

# Windows:
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Logs del backend
cd backend
npm run dev
# Copiar TODO el output

# Logs del navegador
# Abrir http://localhost:3000
# F12 -> Console
# Copiar errores
```

---

## ✅ Instalación Limpia (Reseteo completo)

Si nada funciona, empieza de cero:

```bash
# 1. Eliminar todo
cd tutorial-platform
rm -rf backend/node_modules backend/package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json

# 2. Reinstalar backend
cd backend
npm install
# Crear .env con las variables correctas
npm run seed

# 3. Reinstalar frontend
cd ../frontend
npm install
# Crear .env con REACT_APP_API_URL

# 4. Iniciar (2 terminales)
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
cd frontend && npm start
```

---

**Recuerda:** La mayoría de problemas se solucionan:
1. Ejecutando el seed
2. Verificando que MongoDB está corriendo
3. Confirmando que los .env están creados
