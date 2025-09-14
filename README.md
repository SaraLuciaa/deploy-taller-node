# Taller Node.js: Plataforma de Galaxias y Planetas

## Descripción del proyecto

Esta es una plataforma colaborativa donde los usuarios pueden registrar galaxias y planetas dentro de las galaxias. Los usuarios pueden crear nuevas galaxias y añadir planetas, incluso en galaxias registradas por otros usuarios, fomentando la interacción y el crecimiento compartido del universo virtual.

Más allá de ser solo una aplicación técnica, esta plataforma está pensada como un **espacio de construcción de conocimiento colectivo**, donde cada galaxia y planeta representa una contribución única de los usuarios, generando un universo en constante evolución. 

## Características principales

* Registro y autenticación de usuarios.
* Gestión de galaxias y planetas.
* Sistema de roles para proteger las operaciones.

## Gestión de usuarios y roles

La plataforma cuenta con un sistema de **roles** que garantiza la seguridad y el control de las operaciones:

* **Administrador (superadmin)**
  * Puede **crear, visualizar, editar y eliminar cualquier galaxia o planeta**, sin importar quién lo haya creado.
  * Puede **registrar, ver, modifcar y eliminar** usuarios según sea necesario.
  * También puede realizar todas las acciones permitidas a los usuarios regulares.

* **Usuario regular**
  * Puede **visualizar todas las galaxias y planetas** del sistema, sin restricciones.
  * Puede **crear sus propias galaxias y planetas**, y también **editar o eliminar** únicamente los que le pertenecen.
  * Puede **ver su propio perfil**.

---

## Prerrequisitos

* **Docker** y **Docker Compose** instalados.
* Puertos disponibles: **3000** (API) y **27017** (MongoDB).

## Configuración (Docker)

1. **Clona el repositorio**

   ```bash
   git clone <URL-del-repositorio>
   cd taller-node-js-SaraLuciaa
   ```

2. **Crea el archivo `.env` en la raíz**

   ```env
   PORT, DB_URI, JWT_SECRET
   ```

## Ejecución (Docker)

```bash
docker compose up --build
```

* API disponible en: `http://localhost:3000`
* Servicios levantados:

  * **MongoDB**: `localhost:27017` (usuario: `admin`, password: `admin123`, DB: `db`)
  * **Express App**: `localhost:3000`

Para detener:

```bash
docker compose down
```

Para limpiar volúmenes (elimina datos de Mongo):

```bash
docker compose down -v
```

## Pruebas

```bash
npm install
npm test
```

## Postman (API & Colección)

1. Abre **Postman**.
2. Importa la colección `TallerNode.postman_collection.json`.
3. Ejecuta la colección completa con **Runner**.

> El orden ya está preparado en la colección: primero creación de usuario/admin, luego login, después operaciones de galaxias y planetas.
