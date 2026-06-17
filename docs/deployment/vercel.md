# Despliegue en Vercel

## Estado actual

El scaffold inicial de Next.js de Sikim POS ya esta desplegado en Vercel.

La aplicacion de produccion actual muestra solo una pantalla placeholder inicial. Todavia no hay modulos POS de produccion ni integraciones operativas conectadas.

## URL de producción

La URL de produccion es:

https://sikim-pos.vercel.app

## Configuración esperada

La configuracion esperada del proyecto en Vercel es:

- Framework preset: Next.js
- Root directory: `.`
- Install command: valor por defecto de Vercel para npm o `npm install`
- Build command: `npm run build`
- Production branch: `main`
- Preview deployments para ramas de pull request

No se debe asumir que existe un archivo de configuracion custom de Vercel en este repositorio.

## Variables de entorno

Actualmente no se requieren variables de entorno para el despliegue porque Supabase todavia no esta conectado.

Cuando empiece la integracion con Supabase, las variables se deben configurar en los settings del proyecto en Vercel y no se deben commitear en el repositorio.

Variables futuras posibles:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Estas variables son placeholders futuros y no quedan configuradas por este PR. No se deben incluir claves reales en la documentacion ni en archivos del repositorio.

## Flujo de despliegue

El flujo esperado de despliegue es:

- mergear a `main` dispara un despliegue de produccion;
- las ramas de pull request generan preview deployments;
- el build de Vercel debe pasar antes de mergear;
- si el build falla, se deben revisar los logs de despliegue antes de continuar.

## Checks recomendados antes de mergear

Antes de mergear cambios de aplicacion, ejecutar:

```bash
npm ci
npm run lint
npm run build
```

El desarrollo local debe usar Node.js 20.x, alineado con `.nvmrc` y `package.json`.

## Node.js

El proyecto apunta a Node.js 20.x.

El desarrollo local debe hacerse con Node.js 20.x. Se observo un warning local al usar Node `v24.15.0`, pero `npm run lint` y `npm run build` pasaron.

Si aparece un problema de instalacion, lint, build o runtime, la reproduccion y el debugging deben priorizar Node.js 20.x.

## Limitaciones actuales

Limitaciones actuales del despliegue:

- no hay conexion con Supabase todavia;
- no hay autenticacion todavia;
- no hay modulos POS todavia;
- no hay pagos;
- no hay impresion;
- no hay logica fiscal;
- no hay integracion de cocina/barra.

## Próximos pasos

1. Mantener actualizada la documentacion de despliegue.
2. Decidir integracion Supabase staging vs. produccion compartida.
3. Anadir variables de entorno solo cuando empiece la integracion con Supabase.
4. Construir los modulos POS en PRs pequenos.
