# Decisiones Técnicas
## Edwin Castro
---

## 📋 Información General

- **Nombre del Candidato**: Edwin Arturo Castro Villamar
- **Fecha de Inicio**: [16/12/2025]
- **Fecha de Entrega**: [19/12/2025]
- **Tiempo Dedicado**: [24 horas]

---

## 🛠️ Stack Tecnológico Elegido

### Backend

| Tecnología | Versión | Razón de Elección |
|------------|---------|-------------------|
| Node.js | 24.11.1 | Versión LTS estable, buen soporte de librerías modernas y mejor manejo de async/await. |
| Express | 5.2.1 | Framework ligero, flexible y ampliamente adoptado para APIs REST. |
| Base de Datos | MongoDB | Porque se pueden crear modelos flexibles basado en documentos, ideal para proyectos colaborativos y relaciones dinámicas |
| ORM/ODM | Mongoose | Porque facilita el modelado de esquemas, validaciones y relaciones en MongoDB. |
| Validación | Zod | Use Zod por el tipado fuerte, reutilizable entre backend y frontend y excelente integración con TypeScript |
| Testing | Jest | Use Jest por la configuración sencilla y buena integración con Node.js |

### Frontend

| Tecnología | Versión | Razón de Elección |
|------------|---------|-------------------|
| React | 18.x | [Razón] |
| Build Tool | Vite | Use Vite por el arranque rápido,HMR eficiente y solo requiere configuración mínima para empezar |
| Estado Global | Context | Use Contextt API porque lo considero suficiente para el alcance del proyecto sin añadir complejidad innecesaria |
| Estilos | TailwindCSS | Use TailWindCSS porque es rápido para el maquetado y consistente sin dependencias de liberías pesadas de UI |
| Formularios | react-hook-form + Zod | Esta combinación me ofrecio un excelente rendimiento y validaciones compartidas con backend |

---

## 🏗️ Arquitectura

### Estructura del Backend

```
backend/
├── src/
│ ├── config/ # Configuración (DB, env, swagger)
│ ├── middlewares/ # Auth, permisos, validaciones
│ ├── modules/
│ │ ├── auth/
│ │ ├── users/
│ │ ├── projects/
│ │ ├── tasks/
│ │ └── dashboard/
│ ├── app.ts
│ └── server.ts ...
```

**Razón de esta estructura:**
- Arquitectura modular por dominio
- Facilita escalabilidad y mantenimiento
- Separación clara de responsabilidades

### Estructura del Frontend

```
frontend/
├── src/
│ ├── api/ # Axios y servicios
│ ├── components/ # Componentes reutilizables
│ ├── layouts/ # Layout autenticado y público
│ ├── pages/ # Login, Projects, Dashboard
│ ├── routes/ # Rutas protegidas
│ ├── context/ # AuthContext
│ ├── styles/ # Estilos globales
│ ├── App.tsx
│ └── main.tsx
```

**Razón de esta estructura:**
- Separación entre páginas, lógica y UI
- Escalable para nuevas vistas
- Fácil de testear y mantener

---

## 🗄️ Diseño de Base de Datos

### Elección: MongoDB

**Razones:**
- Porque Mongo es ideal por su esquema flexible para proyectos y tareas
- Ofrece un manejo sencillo de relaciones entre usuarios, proyectos y tareas
- Me ayudo a una mejor adaptación al tiempo limitado de la prueba

### Schema/Modelos

- User: nombre, email, password, proyectos
- Project: nombre, descripción, owner, colaboradores
- Task: título, estado, prioridad, asignado, proyecto

**Decisiones importantes:**
- **Relaciones**: Use mongo por lo tanto las relaciones entre tablas se realizaron mediante ObjectId
- **Índices**: Índices en campos de búsqueda (estado, prioridad), porque ayuda al rendimiento de las busquedas por estado y prioridad y acortan el tiempo de consulta.
---

## 🔐 Seguridad

### Implementaciones de Seguridad

- [ ] **Hash de contraseñas**: Use bcrypt poque es ampliamente probado y seguro
- [ ] **JWT**: expiración corta de 1h para balancear entre seguridad y UX
- [ ] **Validación de inputs**: Zod en requests para evitar inyecciones no deseadas.
- [ ] **CORS**: restringido al dominio del frontend
- [ ] **Headers de seguridad**: helmet
- [ ] **Rate limiting**: middleware para endpoints sensibles por rol y por pertenencia al proyecto.

### Consideraciones Adicionales

Protección contra XSS, validación de ownership en proyectos y tareas, y manejo seguro de errores.

---

## 🎨 Decisiones de UI/UX

### Framework/Librería de UI

**Elegí**:  TailwindCSS

**Razón**: Porque Tailwind tiene mejor documentación que otras herramientas y con la experiencia que tengo con TailWindCSS es mejor en el Responsive debido a que se enfocan en el Mobile-first ayudando a que se vea excelente en diferentes pantallas aparte que Tailwind no necesita dependencias de librerias pesadas lo que ayuda en el rendimiento de la App.

### Patrones de Diseño

- **Responsive Design**: [¿Cómo lo abordaste? Mobile-first?]
- **Loading States**: [¿Cómo manejaste los estados de carga?]
- **Error Handling**: [¿Cómo muestras errores al usuario?]
- **Feedback Visual**: [Toasts, modales, etc.]

### Decisiones de UX

[Explica algunas decisiones importantes de experiencia de usuario que tomaste]

---

## 🧪 Testing

### Estrategia de Testing

**Backend:**
- [Tipo de tests que escribiste]
- [¿Por qué elegiste probar estos endpoints/funciones específicamente?]
- [Herramientas usadas]

**Frontend:**
- [Tipo de tests que escribiste]
- [¿Qué componentes decidiste probar y por qué?]
- [Herramientas usadas]

### Cobertura

- **Backend**: [X%]
- **Frontend**: [X%]

[¿Por qué decidiste este nivel de cobertura dado el tiempo disponible?]

---

## 🐳 Docker

### Implementación

- [ ] Dockerfile backend
- [ ] Dockerfile frontend
- [ ] docker-compose.yml

**Decisiones:**
- [¿Por qué elegiste Alpine/Debian como base?]
- [¿Usaste multi-stage builds? ¿Por qué?]
- [¿Cómo optimizaste el tamaño de las imágenes?]

---

## ⚡ Optimizaciones

### Backend

- Uso de servicios desacoplados
- Queries optimizados con índices

### Frontend

- Componentes reutilizables porque asi se puede evitar la duplicidad de código en nuevas funcionalidades.
- Lazy Loading de paginas 

---

## 🚧 Desafíos y Soluciones

### Desafío 1: Kanban Drag & Drop

**Problema:**
Manejo manual de eventos drag & drop

**Solución:**
Implementación nativa sin librerías externas

**Aprendizaje:**
Mayor control del DOM y eventos

### Desafío 2: [Nombre del desafío]

**Problema:**
[Descripción]

**Solución:**
[Tu solución]

**Aprendizaje:**
[Qué aprendiste]

### Desafío 3: [Nombre del desafío]

**Problema:**
[Descripción]

**Solución:**
[Tu solución]

**Aprendizaje:**
[Qué aprendiste]

---

## 🎯 Trade-offs

### Trade-off 1: Uso de Context API

**Opciones consideradas:**
- Opción A: Redux
- Opción B: Context API

**Elegí**: Context API

**Razón:**
Menor complejidad para el alcance del proyecto

### Trade-off 2: [Decisión]

**Opciones consideradas:**
- [...]

**Elegí**: [...]

**Razón:**
[...]

---

## 🔮 Mejoras Futuras

Si tuviera más tiempo, implementaría:

1. **Drag & Drop avanzado en Kanban**
   - Descripción: Realize algo funcional por el tiempo limitado pero seria una mejora si se pudieran mejorar el código para que el rendimiento sea mejor.
   - Beneficio: Mejora del rendimiento en del Drag & Drop
   - Tiempo estimado: 5h

2. **[Roles Avanzazdos y Permisos]**
   - Descripción: Los roles avanzados y permisos son un potencial para el proyecto debido a que se puede tener un mayor control entre los usuarios.
   - Beneficio: Mayor control de las acciones que puede realizar cada usuario.
   - Tiempo estimado: 7h

3. **Módulo para registrar tiempos en cada tarea**
   - Descripción: Aunque no es muy complejo un módulo para registrar tiempos aumentaria el valor de la aplicación debido a que se puede tener el control de tiempo por tareas.
   - Beneficio: Mejor control del tiempo por tareas y cumplir con los alcances de los proyectos en el tiempo solicitado.
   - Tiempo estimado: 8h

---

## 📚 Recursos Consultados

Lista de recursos que consultaste durante el desarrollo:

- Documentación oficial de TailWindCSS
- Artículo sobre arquitectura limpia para un proyecto de Gestión de 
- Stack Overflow thread sobre el rendimiento de base de datos no relacional vs relacional en una aplicación para gestionar tareas y proyectos.

---

## 🤔 Reflexión Final

### ¿Qué salió bien?

Se propuso una arquitectura clara, un Kanban funcional y UI consistente que esta adaptado para que pueda crecer en un futuro con nuevos esquemas y módulos por la base orientada a los lineamientos SOLID.

### ¿Qué mejorarías?

Mayor cobertura de tests y optimizaciones

### ¿Qué aprendiste?

Mejor manejo de arquitectura fullstack y mejorar mis decisiones técnicas al proponer una solución limpia y clara reutilizable si se desea extender a nuevas funcionalidades.

---

## 📸 Capturas de Pantalla

[Opcional: Agrega capturas de pantalla de tu aplicación]

### Login
![Login](./screenshots/login.png)

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Lista de Proyectos
![Projects](./screenshots/projects.png)

### Detalle de Tareas
![Tasks](./screenshots/tasks.png)

---

**Fecha de última actualización**: [19/12/2025]
