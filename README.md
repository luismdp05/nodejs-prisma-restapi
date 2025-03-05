# Node.js Prisma REST API

Esta es una aplicación de ejemplo que utiliza Node.js, Prisma y una API REST.

## Requisitos

- Node.js
- Prisma
- Base de datos compatible con Prisma

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/luismdp05/nodejs-prisma-restapi
    ```
2. Instala las dependencias:
    ```bash
    cd nodejs-prisma-restapi
    npm install
    ```

## Configuración

1. Configura la base de datos en el archivo `.env`:
    ```env
    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
    ```

2. Ejecuta las migraciones de Prisma:
    ```bash
    npx prisma migrate dev
    ```

## Uso

1. Inicia el servidor:
    ```bash
    npm start
    ```

2. La API estará disponible en `http://localhost:3000`.

## Scripts

- `npm start`: Inicia el servidor.
- `npm run dev`: Inicia el servidor en modo desarrollo.
- `npx prisma migrate dev`: Ejecuta las migraciones de la base de datos.
- `npx prisma studio`: Abre Prisma Studio para gestionar la base de datos.

## Contribuir

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
