# 🚀 Plataforma de Tutoriales

Plataforma web completa para publicar tutoriales con sistema de donaciones, panel de administración y diseño neo-brutalist único.

## 📦 Características

### Frontend (React)
- ⚡ Diseño neo-brutalist único y profesional
- 🎨 Paleta de colores personalizada con animaciones
- 📱 Totalmente responsive
- 🔍 Sistema de búsqueda y filtrado
- 📝 Visualización de tutoriales con Markdown
- 💳 Integración con Ko-fi para donaciones
- 🔐 Sistema de autenticación

### Backend (Node.js/Express)
- 🗄️ MongoDB para base de datos
- 🔒 Autenticación JWT
- 📚 CRUD completo de tutoriales
- 🏷️ Sistema de categorías
- 👤 Gestión de usuarios y roles
- 📤 Subida de imágenes
- 🔎 Búsqueda de texto completo

## 🛠️ Tecnologías

**Frontend:**
- React 18
- React Router
- Axios
- React Markdown
- Framer Motion
- Custom CSS (Neo-Brutalist Design)

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT para autenticación
- Bcrypt para encriptación
- Multer para subida de archivos

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- MongoDB (local o Atlas)
- npm o yarn

## 🚀 Instalación

### Método 1: Script Automático (Recomendado)

**Linux/Mac:**
\`\`\`bash
chmod +x setup.sh
./setup.sh
\`\`\`

**Windows:**
\`\`\`bash
setup.bat
\`\`\`

El script instalará todas las dependencias y configurará los archivos .env automáticamente.

### Método 2: Manual

#### 1. Clonar el repositorio
\`\`\`bash
git clone <tu-repositorio>
cd tutorial-platform
\`\`\`

#### 2. Configurar Backend

\`\`\`bash
cd backend
npm install
\`\`\`

Crear archivo `.env` basado en `.env.example`:
\`\`\`env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tutorial-platform
JWT_SECRET=tu_clave_secreta_super_segura_cambiala
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
\`\`\`

#### 3. Configurar Frontend

\`\`\`bash
cd ../frontend
npm install
\`\`\`

Crear archivo `.env` en la raíz del frontend:
\`\`\`env
REACT_APP_API_URL=http://localhost:5000/api
\`\`\`

#### 4. Iniciar MongoDB

Asegúrate de que MongoDB esté corriendo:
\`\`\`bash
# Si usas MongoDB local
mongod
\`\`\`

O configura MongoDB Atlas y actualiza la URI en `.env`

#### 5. Poblar Base de Datos (¡IMPORTANTE!)

**Esto es necesario para que la aplicación funcione correctamente:**

\`\`\`bash
cd backend
npm run seed
\`\`\`

Esto creará:
- ✅ Usuario administrador (admin@tutoriales.com / admin123)
- ✅ 6 categorías de ejemplo
- ✅ 5 tutoriales completos listos para leer

#### 6. Iniciar la aplicación

**Terminal 1 - Backend:**
\`\`\`bash
cd backend
npm run dev
# o
npm start
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
cd frontend
npm start
\`\`\`

La aplicación estará disponible en:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🎯 Primeros Pasos Después de la Instalación

1. ✅ **Ejecuta el seed** (`npm run seed` en backend) - ¡Muy importante!
2. 🌐 Abre http://localhost:3000 en tu navegador
3. 📚 Explora los tutoriales creados automáticamente
4. 🔐 Inicia sesión en http://localhost:3000/login
   - Email: `admin@tutoriales.com`
   - Password: `admin123`
5. 🎨 Accede al dashboard en http://localhost:3000/dashboard
6. ✏️ Crea tu primer tutorial personalizado

## 👤 Crear Usuario Administrador

Si no ejecutaste el seed, puedes crear un usuario manualmente:

1. Regístrate desde `/login`
2. Cambia el rol en MongoDB:

\`\`\`javascript
// En MongoDB
use tutorial-platform
db.users.updateOne(
  { email: "tu@email.com" },
  { $set: { role: "admin" } }
)
\`\`\`

O mejor aún, ejecuta el seed:

## 📚 Estructura del Proyecto

\`\`\`
tutorial-platform/
├── backend/
│   ├── models/          # Modelos de MongoDB
│   ├── routes/          # Rutas de la API
│   ├── middleware/      # Middleware (auth, etc.)
│   ├── controllers/     # Lógica de negocio
│   ├── uploads/         # Archivos subidos
│   ├── server.js        # Punto de entrada
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/  # Componentes reutilizables
    │   ├── pages/       # Páginas/vistas
    │   ├── context/     # Context API (Auth)
    │   ├── styles/      # CSS
    │   ├── utils/       # Utilidades
    │   ├── App.js
    │   └── index.js
    └── package.json
\`\`\`

## 🔑 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual (requiere auth)

### Tutoriales
- `GET /api/tutorials` - Listar tutoriales
- `GET /api/tutorials/:slug` - Obtener tutorial por slug
- `POST /api/tutorials` - Crear tutorial (admin)
- `PUT /api/tutorials/:id` - Actualizar tutorial (admin)
- `DELETE /api/tutorials/:id` - Eliminar tutorial (admin)

### Categorías
- `GET /api/categories` - Listar categorías
- `GET /api/categories/:slug` - Obtener categoría
- `POST /api/categories` - Crear categoría (admin)
- `PUT /api/categories/:id` - Actualizar categoría (admin)
- `DELETE /api/categories/:id` - Eliminar categoría (admin)

## 💰 Configurar Donaciones Ko-fi

1. Crea una cuenta en [Ko-fi](https://ko-fi.com)
2. Obtén tu nombre de usuario de Ko-fi
3. Actualiza los enlaces en:
   - `frontend/src/components/Footer.js`
   - `frontend/src/pages/Home.js`
4. Reemplaza `https://ko-fi.com/tuusuario` con tu URL real

## 🎨 Personalización del Diseño

El diseño utiliza variables CSS en `frontend/src/styles/App.css`:

\`\`\`css
:root {
  --primary: #FF6B35;      /* Color principal */
  --secondary: #F7931E;     /* Color secundario */
  --accent: #00E5FF;        /* Color de acento */
  --dark: #1A1A2E;          /* Fondo oscuro */
  /* ... más variables */
}
\`\`\`

Puedes cambiar estos colores para personalizar toda la plataforma.

## 📝 Crear Tutoriales

Los tutoriales usan Markdown. Ejemplo:

\`\`\`markdown
# Tutorial de React

## Introducción
React es una librería...

## Instalación
\`\`\`bash
npm install react
\`\`\`

## Ejemplo
...
\`\`\`

## 🚀 Deploy

### Backend (Heroku, Railway, Render)
1. Configura las variables de entorno
2. Conecta MongoDB Atlas
3. Deploy desde GitHub o CLI

### Frontend (Vercel, Netlify)
1. Conecta tu repositorio
2. Configura `REACT_APP_API_URL` con tu URL de backend
3. Build command: `npm run build`
4. Publish directory: `build`

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto. Siéntete libre de usarlo y modificarlo.

## 🎯 Próximas Características

- [ ] Editor WYSIWYG para tutoriales
- [ ] Sistema de comentarios
- [ ] Me gusta y guardados
- [ ] Newsletter
- [ ] Modo oscuro/claro
- [ ] Más integraciones de donación (PayPal, etc.)
- [ ] Sistema de búsqueda avanzada
- [ ] Analytics

## 💬 Soporte

Si tienes problemas o preguntas:
1. Revisa la documentación
2. Busca en Issues existentes
3. Crea un nuevo Issue

---

Hecho con 💙 y mucho ☕
\`\`\`
