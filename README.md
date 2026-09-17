# Leonor Granados Propiedades

Sitio inmobiliario (Astro + Supabase + Cloudinary), con panel de administración propio en `/admin`.

## Stack

- **Astro** (renderizado híbrido: la home, el catálogo y el detalle de cada propiedad son SSR — se leen de la base en cada visita; `nosotros`, `contacto`, `login` y `admin` son estáticos).
- **Supabase**: base de datos (`propiedades`, `consultas`) y autenticación del panel admin. Ya **no** se usa Supabase Storage.
- **Cloudinary**: almacenamiento y optimización de las fotos de las propiedades.
- **Netlify**: hosting, vía `@astrojs/netlify`.

## Puesta en marcha desde cero (proyecto nuevo)

### 1. Supabase
1. Creá un proyecto nuevo en [supabase.com](https://supabase.com).
2. Abrí **SQL Editor** y corré todo el contenido de [`supabase/schema.sql`](./supabase/schema.sql).
3. En **Authentication > Users**, creá el usuario (email + contraseña) con el que se va a entrar a `/admin`.
4. En **Project Settings > API**, copiá el `Project URL` y la `anon public key`.

### 2. Cloudinary
1. Creá una cuenta gratis en [cloudinary.com](https://cloudinary.com).
2. Copiá el **Cloud name** desde el Dashboard.
3. Andá a **Settings > Upload > Upload presets > Add upload preset**, poné el modo en **Unsigned**, y guardá el nombre del preset.
   - Opcional pero recomendado: limitar el preset a `image` y activar una carpeta fija (ej. `leonor-granados/`) para mantener las fotos organizadas.

### 3. Variables de entorno
Copiá [`.env.example`](./.env.example) y completá los valores reales de los pasos 1 y 2 (Supabase y Cloudinary). Los datos de contacto y redes ya vienen precargados.

- En local: guardalo como `.env` (no se sube a git).
- En producción: cargá las mismas variables en **Netlify > Site configuration > Environment variables**.

### 4. Deploy en Netlify
1. Conectá el repo de GitHub nuevo en Netlify ("Add new site" > "Import an existing project").
2. Build command: `npm run build` — Publish directory: `dist` (ya viene configurado en `netlify.toml`).
3. Cargá las variables de entorno del paso 3.
4. Deploy.

No hace falta ningún Build Hook: los cambios que carga el cliente desde `/admin` (nueva propiedad, foto, precio, etc.) se ven en la web al instante, sin volver a construir el sitio.

## Comandos

| Comando           | Acción                                      |
| ------------------ | -------------------------------------------- |
| `npm install`       | Instala dependencias                         |
| `npm run dev`       | Servidor local en `localhost:4321`           |
| `npm run build`     | Build de producción a `./dist/`              |
| `npm run preview`   | Previsualiza el build antes de deployar      |

## Cómo duplicar esto para el próximo cliente

1. Clonar este repo a uno nuevo (o usarlo como "template repository" en GitHub).
2. Repetir los pasos 1 y 2 de arriba con una cuenta/proyecto nuevo de Supabase y Cloudinary.
3. Reemplazar `public/nosotros-leonor.jpg`, el texto de `src/pages/nosotros.astro` y las variables de `.env`.
4. Ojo con el límite gratuito de Supabase: **2 proyectos activos por organización**, y los proyectos gratis se pausan a los 7 días sin actividad. Para más de un cliente conviene evaluar consolidar en un solo proyecto multi-cliente (columna `cliente_id` + RLS) o pasar a un plan pago por proyecto.
