# Developmet
Pasos para levantar la app en desarrollo.
1. Levantar la base de datos
```
docker compose up -d
```
2. Renombrar el archivo .env.template a .env
3. Reemplazar las variables de entorno
4. Ejecutar el comando ``` npm install ```
5. Ejecutar el comando ``` npm run dev ```
6. Ejecutar los siguientes comandos de prisma 
``` 
npx prisma migrate dev
npx prisma generate
```
7. Ejecutar el SEED [para crear la base de datos local](localhost:3000/api/seed)

## NOTA:
__usuario:__ test1@gmail.com
__pasword:__ 123456

# Prisma Command
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```