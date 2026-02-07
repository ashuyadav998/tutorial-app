# ⚡ GUÍA RÁPIDA VISUAL - 3 Pasos

## 🎯 Objetivo
Tener tu plataforma de tutoriales funcionando en **menos de 5 minutos**.

---

## 📦 PASO 1: Instalar (1 minuto)

### Opción A: Automático ⭐ RECOMENDADO

**Linux/Mac:**
```bash
./setup.sh
```

**Windows:**
```bash
setup.bat
```

### Opción B: Manual

```bash
# Backend
cd backend
npm install

# Frontend  
cd ../frontend
npm install
```

---

## 🗄️ PASO 2: Poblar Base de Datos (30 segundos)

**¡MUY IMPORTANTE! Sin esto la app estará vacía.**

```bash
cd backend
npm run seed
```

Esto crea automáticamente:
- ✅ Usuario admin (admin@tutoriales.com / admin123)
- ✅ 6 categorías (JavaScript, React, Node.js, CSS, MongoDB, Python)
- ✅ 5 tutoriales completos con contenido real

**Salida esperada:**
```
✅ Conectado a MongoDB
✅ Base de datos limpiada
✅ Usuario admin creado
✅ 6 categorías creadas
✅ 5 tutoriales creados

📊 DATOS CREADOS:
   👤 Usuario administrador:
      Email: admin@tutoriales.com
      Password: admin123
   📚 Categorías: 6
   📝 Tutoriales: 5
```

---

## 🚀 PASO 3: Iniciar Aplicación (30 segundos)

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

**Deberías ver:**
```
🌐 Servidor corriendo en puerto 5000
✅ Conectado a MongoDB
```

### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

**Se abrirá automáticamente en:** http://localhost:3000

---

## 🎉 ¡LISTO! Ahora puedes:

### 1️⃣ Explorar la Landing Page
```
http://localhost:3000
```
Verás:
- Hero section con diseño neo-brutalist
- 3 tutoriales destacados
- Secciones de características
- Botón de donación Ko-fi

### 2️⃣ Ver Todos los Tutoriales
```
http://localhost:3000/tutoriales
```
Verás:
- 5 tutoriales listos para leer
- Filtros por categoría
- Filtros por dificultad
- Búsqueda de texto

### 3️⃣ Leer un Tutorial
Click en cualquier tutorial para ver:
- Contenido completo en Markdown
- Syntax highlighting en código
- Metadata (duración, dificultad, vistas)
- Diseño limpio y profesional

### 4️⃣ Iniciar Sesión como Admin
```
http://localhost:3000/login

Email: admin@tutoriales.com
Password: admin123
```

### 5️⃣ Acceder al Dashboard
```
http://localhost:3000/dashboard
```
Desde aquí podrás:
- ✅ Ver todos tus tutoriales
- ✅ Crear nuevos tutoriales
- ✅ Editar tutoriales existentes
- ✅ Gestionar categorías
- ✅ Eliminar contenido

---

## 🎨 Personalizar

### Cambiar Colores
Edita `frontend/src/styles/App.css`:

```css
:root {
  --primary: #FF6B35;    /* Cambia este */
  --accent: #00E5FF;     /* Y este */
}
```

### Configurar Ko-fi para Donaciones
Busca y reemplaza en:
- `frontend/src/components/Footer.js`
- `frontend/src/pages/Home.js`

```javascript
// Cambia esto:
href="https://ko-fi.com/tuusuario"

// Por tu URL real de Ko-fi:
href="https://ko-fi.com/TUNOMBRE"
```

---

## 🐛 Solución de Problemas

### "Cannot GET /api/tutorials"
❌ **Problema:** El backend no está corriendo
✅ **Solución:** 
```bash
cd backend
npm run dev
```

### "Cannot connect to MongoDB"
❌ **Problema:** MongoDB no está corriendo
✅ **Solución:**
```bash
# Iniciar MongoDB
mongod

# O verificar si está corriendo
pgrep mongod
```

### "No tutorials found"
❌ **Problema:** No ejecutaste el seed
✅ **Solución:**
```bash
cd backend
npm run seed
```

### "Module not found"
❌ **Problema:** Dependencias no instaladas
✅ **Solución:**
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

---

## 📊 Estructura de lo que se Crea

Cuando ejecutas `npm run seed`, se crea:

```
📚 Categorías:
├── ⚡ JavaScript
├── ⚛️ React
├── 🟢 Node.js
├── 🎨 CSS
├── 🍃 MongoDB
└── 🐍 Python

📝 Tutoriales:
├── Introducción a JavaScript (Principiante, 20 min)
├── React Hooks: useState y useEffect (Intermedio, 25 min)
├── Crear una API REST con Express (Intermedio, 30 min)
├── CSS Grid: Layout Moderno (Intermedio, 20 min)
└── MongoDB Básico: Primeros Pasos (Principiante, 25 min)

👤 Usuario:
└── Admin (admin@tutoriales.com / admin123)
```

Cada tutorial tiene:
- ✅ Título y descripción
- ✅ Contenido completo en Markdown
- ✅ Código con syntax highlighting
- ✅ Tags y categoría
- ✅ Nivel de dificultad
- ✅ Duración estimada
- ✅ Contador de vistas

---

## 🎯 Checklist de Verificación

Marca cada paso:

- [ ] Node.js y npm instalados
- [ ] MongoDB instalado y corriendo
- [ ] Dependencias instaladas (`npm install`)
- [ ] Archivo `.env` creado en backend
- [ ] Archivo `.env` creado en frontend
- [ ] Seed ejecutado (`npm run seed`)
- [ ] Backend corriendo en puerto 5000
- [ ] Frontend corriendo en puerto 3000
- [ ] Puedes ver tutoriales en http://localhost:3000
- [ ] Puedes iniciar sesión
- [ ] Puedes acceder al dashboard

Si todos están marcados: **¡Felicidades! 🎉**

---

## 💡 Próximos Pasos

1. **Crea tu primer tutorial**
   - Ve al dashboard
   - Click en "Crear Tutorial"
   - Escribe en Markdown
   - Publica

2. **Personaliza el diseño**
   - Cambia colores en CSS variables
   - Modifica el logo
   - Ajusta tipografías

3. **Configura donaciones**
   - Crea cuenta en Ko-fi
   - Actualiza los enlaces

4. **Deploy a producción**
   - Backend: Railway, Render, Heroku
   - Frontend: Vercel, Netlify
   - Database: MongoDB Atlas

---

**¿Necesitas ayuda?** Revisa el README.md completo o ESTRUCTURA.md para más detalles.
