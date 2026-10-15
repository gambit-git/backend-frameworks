# Programación Backend con Frameworks

Workspace con un proyecto inicial de JavaScript en la raíz y un gestor de tareas en TypeScript dentro de `task-manager-backend/`.

## Requisitos

- Node.js
- PNPM
- Visual Studio Code
- Git

## Proyecto inicial

Desde la raíz del workspace:

```bash
pnpm start
pnpm dev
```

La aplicación de ejemplo está en `src/index.js`.

## Gestor de tareas

El backend TypeScript es un paquete independiente. Entra en su carpeta antes de ejecutar sus comandos:

```bash
cd task-manager-backend
pnpm install
pnpm dev
```

Comandos disponibles:

```bash
pnpm check
pnpm test
pnpm build
pnpm start
pnpm serve
```

`pnpm start` ejecuta directamente los archivos TypeScript con `tsx`. Para ejecutar la versión compilada, usa primero `pnpm build` y luego `pnpm serve`. El estado actual de las tareas se guarda en memoria.

## Formato

Desde la raíz del workspace:

```bash
pnpm format
pnpm format:check
```
