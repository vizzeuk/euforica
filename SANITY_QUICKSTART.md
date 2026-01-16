# 🚀 Quick Start - Sanity Integration

## ⚡ Comandos Ejecutados

```bash
# Dependencias instaladas
npm install --legacy-peer-deps sanity next-sanity @sanity/vision @sanity/image-url @portabletext/react
```

## 📋 Checklist de Configuración

- [x] ✅ Dependencias instaladas
- [x] ✅ Estructura de archivos creada
- [x] ✅ Schemas definidos (Post, Author, Category)
- [x] ✅ Cliente de Sanity configurado
- [x] ✅ Queries GROQ implementadas
- [x] ✅ Sanity Studio en `/studio`
- [x] ✅ Portable Text renderer
- [ ] ⏳ Crear proyecto en sanity.io
- [ ] ⏳ Configurar variables de entorno
- [ ] ⏳ Acceder a `/studio` y crear contenido

## 🎯 Próximos Pasos

### 1. Crear Proyecto en Sanity.io (5 min)

```
1. Ve a: https://sanity.io
2. Regístrate/Inicia sesión
3. Click: "Create new project"
4. Nombre: "Euforica Blog"
5. Dataset: "production"
6. Copia tu PROJECT_ID
```

### 2. Configurar Variables de Entorno

```bash
# Copia el template
cp .env.local.template .env.local

# Edita .env.local y reemplaza:
NEXT_PUBLIC_SANITY_PROJECT_ID=TU_PROJECT_ID_AQUI
```

### 3. Reiniciar Servidor

```bash
npm run dev
```

### 4. Acceder al Studio

```
Abre: http://localhost:3000/studio
```

### 5. Crear tu Primer Post

En el Studio:

1. Click en "Post"
2. Click en "Create new"
3. Completa:
   - Título
   - Slug (auto-genera)
   - Imagen
   - Resumen
   - Contenido
4. Click en "Publish"

## 📚 Documentación Completa

Lee **[SANITY_SETUP.md](SANITY_SETUP.md)** para guía detallada.

## 🆘 Solución de Problemas

### Error: Variables de entorno no definidas

```bash
# Verifica que .env.local existe
# Reinicia el servidor
npm run dev
```

### Studio no carga

```bash
# Limpia caché
rm -rf .next
npm run dev
```

## 📦 Archivos Importantes

```
sanity/
├── env.ts                        # ✅ Variables validadas
├── schema.ts                     # ✅ Schemas exportados
├── schemas/
│   ├── post.ts                  # ✅ Blog posts
│   ├── category.ts              # ✅ Categorías
│   └── author.ts                # ✅ Autores
└── lib/
    ├── client.ts                # ✅ Cliente Sanity
    ├── image.ts                 # ✅ Helper imágenes
    ├── queries.ts               # ✅ Queries GROQ
    └── types.ts                 # ✅ TypeScript types

app/studio/[[...index]]/page.tsx  # ✅ Studio embedded
sanity.config.ts                  # ✅ Configuración
components/blog/
└── portable-text-renderer.tsx    # ✅ Renderizador de contenido
```

## ✨ Features

- ✅ Studio embedded en `/studio`
- ✅ ISR (revalidación cada 60s)
- ✅ Imágenes optimizadas con hotspot
- ✅ Portable Text con estilos personalizados
- ✅ TypeScript completamente tipado
- ✅ Schemas validados
- ✅ GROQ queries optimizadas

---

**Todo está listo!** Solo necesitas configurar las variables de entorno y ya puedes usar Sanity 🎉
