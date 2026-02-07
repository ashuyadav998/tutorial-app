const mongoose = require('mongoose');
require('dotenv').config();

// Importar modelos
const User = require('./models/User');
const Category = require('./models/Category');
const Tutorial = require('./models/Tutorial');

const seedData = async () => {
  try {
    // Conectar a MongoDB
    console.log('🔌 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tutorial-platform');
    console.log('✅ Conectado a MongoDB');

    // Limpiar base de datos
    console.log('🗑️  Limpiando base de datos...');
    await User.deleteMany({});
    await Category.deleteMany({});
    await Tutorial.deleteMany({});
    console.log('✅ Base de datos limpiada');

    // Crear usuario admin
    console.log('👤 Creando usuario administrador...');
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@tutoriales.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('✅ Usuario admin creado');

    // Crear categorías
    console.log('📚 Creando categorías...');
    const categories = await Category.insertMany([
      { name: 'JavaScript', slug: 'javascript', description: 'Tutoriales de JavaScript vanilla y ES6+', icon: '⚡', color: '#F7DF1E' },
      { name: 'React', slug: 'react', description: 'Aprende React desde cero', icon: '⚛️', color: '#61DAFB' },
      { name: 'Node.js', slug: 'nodejs', description: 'Backend con Node.js y Express', icon: '🟢', color: '#68A063' },
      { name: 'CSS', slug: 'css', description: 'Estilos y diseño web moderno', icon: '🎨', color: '#264DE4' },
      { name: 'MongoDB', slug: 'mongodb', description: 'Base de datos NoSQL', icon: '🍃', color: '#47A248' },
      { name: 'Python', slug: 'python', description: 'Programación con Python', icon: '🐍', color: '#3776AB' }
    ]);
    console.log(`✅ ${categories.length} categorías creadas`);

    // Crear tutoriales
    console.log('📝 Creando tutoriales...');
    const tutorials = await Tutorial.insertMany([
      {
        title: 'Introducción a JavaScript',
        slug: 'introduccion-a-javascript',
        description: 'Aprende los fundamentos de JavaScript desde cero',
        content: `# Introducción a JavaScript

JavaScript es el lenguaje de programación más popular para desarrollo web.

## Variables

\`\`\`javascript
let nombre = "Juan";
const edad = 25;
\`\`\`

## Funciones

\`\`\`javascript
function saludar(nombre) {
  return \`Hola, \${nombre}!\`;
}
\`\`\`

## Arrays

\`\`\`javascript
let frutas = ["manzana", "banana"];
frutas.map(f => f.toUpperCase());
\`\`\``,
        category: categories[0]._id,
        tags: ['javascript', 'fundamentos'],
        difficulty: 'principiante',
        duration: 20,
        views: 245,
        published: true,
        author: adminUser._id
      },
      {
        title: 'React Hooks Esenciales',
        slug: 'react-hooks-esenciales',
        description: 'Aprende useState y useEffect',
        content: `# React Hooks

## useState

\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\`

## useEffect

\`\`\`jsx
useEffect(() => {
  // código
}, [deps]);
\`\`\``,
        category: categories[1]._id,
        tags: ['react', 'hooks'],
        difficulty: 'intermedio',
        duration: 25,
        views: 189,
        published: true,
        author: adminUser._id
      },
      {
        title: 'API REST con Express',
        slug: 'api-rest-express',
        description: 'Crea APIs con Express',
        content: `# Express API

\`\`\`javascript
const express = require('express');
const app = express();

app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'Juan' }]);
});

app.listen(3000);
\`\`\``,
        category: categories[2]._id,
        tags: ['nodejs', 'express'],
        difficulty: 'intermedio',
        duration: 30,
        views: 167,
        published: true,
        author: adminUser._id
      },
      {
        title: 'CSS Grid Layout',
        slug: 'css-grid-layout',
        description: 'Layouts con CSS Grid',
        content: `# CSS Grid

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}
\`\`\``,
        category: categories[3]._id,
        tags: ['css', 'grid'],
        difficulty: 'intermedio',
        duration: 20,
        views: 134,
        published: true,
        author: adminUser._id
      },
      {
        title: 'MongoDB Básico',
        slug: 'mongodb-basico',
        description: 'Introducción a MongoDB',
        content: `# MongoDB

\`\`\`javascript
db.usuarios.insertOne({
  nombre: "María",
  email: "maria@email.com"
});

db.usuarios.find({ edad: { $gt: 25 } });
\`\`\``,
        category: categories[4]._id,
        tags: ['mongodb', 'database'],
        difficulty: 'principiante',
        duration: 25,
        views: 98,
        published: true,
        author: adminUser._id
      }
    ]);
    console.log(`✅ ${tutorials.length} tutoriales creados`);

    console.log('\n' + '='.repeat(60));
    console.log('✅ SEED COMPLETADO EXITOSAMENTE');
    console.log('='.repeat(60));
    console.log('\n📊 DATOS CREADOS:');
    console.log(`   👤 Email: admin@tutoriales.com`);
    console.log(`   🔑 Password: admin123`);
    console.log(`   📚 Categorías: ${categories.length}`);
    console.log(`   📝 Tutoriales: ${tutorials.length}`);
    console.log('\n🚀 PRÓXIMOS PASOS:');
    console.log('   1. npm run dev (en backend)');
    console.log('   2. npm start (en frontend)');
    console.log('   3. http://localhost:3000');
    console.log('='.repeat(60) + '\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedData();
