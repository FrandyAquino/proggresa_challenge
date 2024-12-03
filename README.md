# 🌐 News Hub - Aplicación web de noticias personalizable

Bienvenidos a **News Hub**, es una aplicación de noticias diseñada para ofrecer una experiencia de usuario mejorada a través de un enfoque estético y funcional. Se enfoca en implementar características como la persistencia de preferencias del usuario, animaciones y transiciones suaves, además de un diseño responsivo que incluye un menú hamburguesa. Su objetivo es facilitar el acceso a contenido relevante de noticias mientras se mantiene una interfaz atractiva y fácil de usar.

![image](https://github.com/user-attachments/assets/cbe25533-f42f-496c-ada2-4d558cb99f48)


## 🚀 Funcionalidades

- **Interfaz atractiva** 🎨: Diseño responsivo que se adapta a diferentes dispositivos, ofreciendo una experiencia visualmente agradable.
- **Persistencia de preferencias** 💾: Guarda las configuraciones del usuario para personalizar la experiencia en futuras visitas.
- **Filtrado de noticias** 📱: Permite a los usuarios seleccionar categorías específicas para acceder a contenido relevante.
- **Integración de API de noticias** 📰: Acceso a contenido actualizado y relevante de diversas fuentes informativas.

## 📁 Estructura del Proyecto

```plaintext
NewsHub/
├── backend/
|   ├── dist/
|   ├── node_modules/
|   ├── src/
|   |   ├── config/
|   |   ├── controllers/
|   |   ├── interfaces/
|   |   ├── models/
|   |   ├── routes/
|   |   ├── shared/
|   |   ├── validators/
|   ├── app.ts
|   ├── server.ts
|   ├── types/
│   ├── .env
│   └── nodemon.json
├── frontend/
|   ├── node_modules/
|   ├── public/
|   ├── src/
|   |   ├── auth/
|   |   ├── components/
|   ├── App.tsx
|   ├── axiosConfig.ts
|   ├── main.tsx
└── README.md
```

## 📋 Requisitos

### Backend

- Node.js (versión recomendada: 16 o superior)
- Express (versión: ^4.18.2)
- Mongoose (versión: ^6.8.0)
- dotenv (versión: ^16.0.3)
- cors (versión: ^2.8.5)

### Frontend

- React (versión: ^18.3.1)
- React-DOM (versión: ^18.3.1)
- Axios (versión: ^1.7.7)
- AOS (versión: ^2.3.4)
- Framer Motion (versión: ^11.11.9)
- Lucide React (versión: ^0.452.0)
- Vite (versión: ^5.4.8)
- Tailwind CSS (versión: ^3.4.13)
- TypeScript (versión: ^5.5.3)

### DevDependencies

- ESLint (versión: ^9.11.1)
- TypeScript ESLint (versión: ^8.7.0)
- PostCSS (versión: ^8.4.47)
- Autoprefixer (versión: ^10.4.20)
- Vite Plugins (versión: ^4.3.2)

## 🛠️ Instalación

### Clonar el Repositorio

Para clonar este proyecto, sigue los siguientes pasos:

1. **Clona el repositorio**: Dirigete a la terminal de tu sistema

   ```sh
   git clone https://github.com/FrandyAquino/progressa_challenge.git
   cd proggresa_challenge
   ```

2. **Instala las dependencias del backend**: Abre el proyecto en tu editor de código y dirigete hacia:

   ```sh
   cd backend
   npm install
   ```

3. **Instala las dependencias del frontend**: Luego debes ir a la carpeta del frontend para instalar las dependecias.

   ```sh
   cd ../frontend
   npm install
   ```

4. **Crea el archivo .env**: Ahora ve a la carpeta backend y crea un archivo que se llame ".env" y pega estas variables de entorno:
   ```sh
   PORT=5000
   MONGO_URI=mongodb+srv://frandyjavieraquino13:kLgQGxZoR1bGzB7N@proggresa.pfpvc.mongodb.net/proggresa?retryWrites=true&w=majority&appName=proggresa
   NEW_API_TOKEN="f8c4d8121f824794a3ca6c4c09230975"
   ```

### 🎥 Uso de la Aplicación

1. **Ejecuta el fronted**: Para ejecutar el frontend asegurate de estar en el directorio, ej: user~\progressa_challenge\frontend 

   ```sh
   cd frontend
   npm run dev
   ```


2. **Ejecuta el backend**: Para ejecutar el backend dentro de su editor de codigo o proyecto abra otra terminal y siga los pasos:

   ```sh
   cd backend
   npm run dev
   ```

Espere hasta que diga MongoDB connected

3. **Dirigete a**: Una ves ejecutado el backend y el frontend dirigete hacia la ruta para ver el proyecto, puede tardar unos segundos en subir.

   ```sh
   http://localhost:5173/
   ```

4. **Empieza a utilizar la aplicación**: Para poder utilizar los filtros y demás, primero debes registrarte, así que crea tu cuenta.

## 🧾 API Usage

## Endpoints de la API

### Artículos

**GET /api/articles**

- Descripción: Recupera una lista de artículos.
- Middleware: Requiere una sesión activa (`sessionMiddleware`).
- Respuesta: Array JSON de artículos.

### Usuario

**POST /api/user**

- Descripción: Crea una nueva cuenta de usuario.
- Middleware: Valida el cuerpo de la solicitud usando `registerSchema`.
- Cuerpo de la Solicitud: Debe incluir los datos del usuario para el registro.

**GET /api/user**

- Descripción: Recupera una lista de usuarios registrados.
- Respuesta: Array JSON de usuarios.

**GET /api/user/:userId/preferences**

- Descripción: Recupera las preferencias de un usuario específico.
- Parámetros de la Ruta: `userId` (ID del usuario).
- Respuesta: JSON con las preferencias del usuario.

### Inicio de Sesión de Usuario

**POST /api/user/login**

- Descripción: Inicia sesión en la cuenta de usuario.
- Middleware: Valida el cuerpo de la solicitud usando `userLoginSchema`.
- Cuerpo de la Solicitud: Debe incluir las credenciales del usuario.

## Middleware

- `sessionMiddleware`: Verifica que la sesión del usuario esté activa.
- `schemaValidatorMiddleware`: Valida el cuerpo de la solicitud según los esquemas proporcionados (`registerSchema` y `userLoginSchema`).

## 🔧 Configuración de la API de NewsAPI

Para usar la API de NewsAPI en este proyecto, sigue estos pasos:

1. **Regístrate en NewsAPI**: Visita [newsapi.org](https://newsapi.org/) y crea una cuenta para obtener tu clave de API.

2. **Agrega la clave de API a tu archivo .env**: Una vez que tengas la clave, añade una nueva línea en tu archivo `.env` dentro de la carpeta `backend`:
   ```sh
   NEWS_API_KEY="tu_clave_de_api_aquí"


## 📞 Contacto

Si tienes alguna pregunta, no dudes en contactarme:

- [Frandy Aquino](https://github.com/FrandyAquino) 👨🏽
- [Portafolio](https://frandyaquino.netlify.app/) 🖥️

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

