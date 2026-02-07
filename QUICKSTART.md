# 🚀 Guía de Inicio Rápido

## Instalación en 5 minutos

### 1️⃣ Instalar dependencias

**Backend:**
\`\`\`bash
cd backend
npm install
\`\`\`

**Frontend:**
\`\`\`bash
cd frontend
npm install
\`\`\`

### 2️⃣ Configurar variables de entorno

**Backend** - Crea `backend/.env`:
\`\`\`env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tutorial-platform
JWT_SECRET=mi_super_secreto_cambiar_en_produccion
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
\`\`\`

**Frontend** - Crea `frontend/.env`:
\`\`\`env
REACT_APP_API_URL=http://localhost:5000/api
\`\`\`

### 3️⃣ Iniciar MongoDB

Asegúrate de tener MongoDB corriendo:
\`\`\`bash
# Linux/Mac
mongod

# O si usas MongoDB como servicio
sudo systemctl start mongod
\`\`\`

**Usando MongoDB Atlas (Cloud):**
1. Crea cuenta en https://www.mongodb.com/cloud/atlas
2. Crea un cluster gratuito
3. Obtén tu connection string
4. Actualiza `MONGODB_URI` en `.env`

### 4️⃣ Poblar base de datos (Opcional pero recomendado)

\`\`\`bash
cd backend
node seed.js
\`\`\`

Esto creará:
- Usuario admin: `admin@tutoriales.com` / `admin123`
- 5 categorías de ejemplo
- 3 tutoriales de ejemplo

### 5️⃣ Iniciar la aplicación

**Terminal 1 - Backend:**
\`\`\`bash
cd backend
npm run dev
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
cd frontend
npm start
\`\`\`

### 6️⃣ Acceder a la aplicación

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Login:** http://localhost:3000/login

---

## 🎯 Primeros Pasos

1. **Explora la landing page** en http://localhost:3000
2. **Inicia sesión** con las credenciales del admin
3. **Accede al Dashboard** en http://localhost:3000/dashboard
4. **Crea tu primer tutorial** desde el dashboard
5. **Personaliza el diseño** editando las variables CSS
6. **Configura Ko-fi** para recibir donaciones

---

## 🔧 Solución de Problemas

### MongoDB no conecta
- Verifica que MongoDB esté corriendo: `mongod --version`
- Revisa la URI en `.env`
- Si usas Atlas, verifica que tu IP esté en la whitelist

### Puerto ya en uso
- Backend: Cambia `PORT` en `backend/.env`
- Frontend: Cambia en `frontend/.env` y actualiza CORS en backend

### Error de CORS
- Verifica que `FRONTEND_URL` en backend `.env` coincida con tu URL de frontend

### Módulos no encontrados
\`\`\`bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
\`\`\`

---

## 📚 Próximos Pasos

✅ **Configuración Básica Completa**

Ahora puedes:
1. Personalizar el diseño en `frontend/src/styles/App.css`
2. Añadir más categorías desde el dashboard
3. Crear tutoriales con contenido markdown
4. Configurar tu cuenta de Ko-fi para donaciones
5. Desplegar en producción (ver README.md)

---

## 💡 Tips

- Usa `npm run dev` en backend para auto-reload con nodemon
- Los tutoriales soportan Markdown completo con syntax highlighting
- Las imágenes de tutoriales se guardan en `backend/uploads/`
- Cambia los colores en CSS variables para personalizar el tema

---

¿Necesitas ayuda? Revisa el README.md completo o crea un Issue en GitHub.
