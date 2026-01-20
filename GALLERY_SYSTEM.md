# Sistema de Galerías de Eventos - Euforica

## 📸 Descripción General

Sistema completo de galerías de fotos para eventos con URLs únicas, acceso temporal mediante QR, y funcionalidades de descarga. Diseñado con la estética de lujo de Euforica.

---

## 🎯 Características

- ✅ **URLs únicas por evento** (`/gallery/boda-juan-maria-2026`)
- ✅ **Carrusel elegante** con Embla Carousel
- ✅ **Vista fullscreen** con navegación por teclado (flechas y Escape)
- ✅ **Descarga individual** de fotos en alta calidad
- ✅ **Fecha de expiración** automática
- ✅ **Control de activación** manual (on/off)
- ✅ **Responsive** optimizado para móvil y desktop
- ✅ **Autoplay** con pausa al interactuar
- ✅ **Captions opcionales** por foto
- ✅ **Contador de visitas** (preparado, requiere configuración)

---

## 🗂️ Estructura de Archivos

```
app/
  gallery/
    [eventId]/
      page.tsx           # Página dinámica de cada galería
    expired/
      page.tsx           # Página de galería expirada/no disponible

components/
  gallery/
    gallery-carousel.tsx # Componente del carrusel con fullscreen

sanity/
  schemas/
    gallery.ts           # Schema de Sanity para galerías
  lib/
    queries.ts           # Queries: getGalleryByEventId()
```

---

## 🚀 Cómo Crear una Galería

### 1. Acceder a Sanity Studio
```
http://localhost:3000/studio
# o tu dominio de producción
https://tudominio.com/studio
```

### 2. Crear Nueva Galería

1. Ir a **"Galería de Eventos"** en el menú lateral
2. Clic en **"Create"** 
3. Completar los campos:

#### Campos Obligatorios:

- **Nombre del Evento**: "Boda Juan & María"
- **ID del Evento**: Click "Generate" para crear slug automático (ej: `boda-juan-maria-2026`)
- **Tipo de Evento**: Boda / Cumpleaños / Corporativo / Otro
- **Imagen de Portada**: Foto principal (se muestra en preview)
- **Fotos del Evento**: Subir todas las fotos (hasta 500)
- **Fecha de Expiración**: Seleccionar fecha y hora límite

#### Campos Opcionales:

- **Descripción** (caption) por cada foto
- **Orden** (número) para controlar secuencia
- **Permitir Descargas**: On/Off (default: On)
- **Galería Activa**: On/Off para controlar manualmente (default: On)

### 3. Guardar y Publicar

1. Clic en **"Publish"**
2. La galería estará disponible en: `https://tudominio.com/gallery/[eventId]`

---

## 📱 Generar QR para la Galería

### Opción 1: Generador Online (Recomendado)
```
1. Ir a: https://www.qr-code-generator.com/
2. Pegar URL: https://tudominio.com/gallery/boda-juan-maria-2026
3. Personalizar colores (negro/blanco elegante)
4. Descargar en alta resolución (PNG/SVG)
5. Imprimir para el evento
```

### Opción 2: Usando Node.js (Automatizado)
```bash
npm install qrcode

# Crear script generate-qr.js
node generate-qr.js boda-juan-maria-2026
```

---

## 🔗 URL del Evento

### Formato:
```
https://tudominio.com/gallery/[eventId]
```

### Ejemplos:
```
https://euforica.com/gallery/boda-juan-maria-2026
https://euforica.com/gallery/cumple-sofia-30
https://euforica.com/gallery/evento-empresa-abc
```

### Reglas del eventId:
- Solo minúsculas
- Guiones en lugar de espacios
- Sin caracteres especiales (ñ, á, etc.)
- Único por evento

---

## ⏰ Sistema de Expiración

### Comportamiento:
1. **Antes de expirar**: Galería completamente funcional
2. **Después de expirar**: Redirige automáticamente a `/gallery/expired`
3. **Desactivada manualmente**: Igual que expirada

### Validaciones:
- Se valida en cada request (ISR con 5 min de cache)
- No requiere cron jobs o tareas programadas
- El usuario ve mensaje claro si la galería no está disponible

### Extender Fecha:
1. Entrar a Sanity Studio
2. Editar la galería
3. Cambiar "Fecha de Expiración"
4. Publicar cambios
5. La galería estará disponible nuevamente en ~5 minutos

---

## 🎨 Personalización del Carrusel

### Opciones disponibles en `gallery-carousel.tsx`:

```typescript
// Autoplay delay (milisegundos)
Autoplay({ delay: 4000, stopOnInteraction: true })

// Tamaños del carrusel
'flex-[0_0_100%]'  // Móvil: 100% ancho
'md:flex-[0_0_80%]' // Tablet: 80% ancho  
'lg:flex-[0_0_70%]' // Desktop: 70% ancho

// Aspect ratio de fotos
'aspect-[4/3]' // Cambiar a [16/9] o [1/1] según preferencia
```

### Deshabilitar Autoplay:
```typescript
// Remover de useEmblaCarousel:
// [Autoplay({ delay: 4000, stopOnInteraction: true })]
```

---

## 🔐 Seguridad y Privacidad

### URLs Privadas:
- El eventId es semi-privado (quien tenga el QR accede)
- No hay listado público de galerías
- No indexable por buscadores (añadir noindex si se desea)

### Protección Adicional (Opcional):
```typescript
// Añadir password por galería en schema:
{
  name: 'password',
  type: 'string',
  title: 'Contraseña de Acceso',
}

// Validar en page.tsx antes de mostrar fotos
```

---

## 📊 Contador de Visitas

### Estado Actual:
- Campo `viewCount` existe en el schema
- La función `incrementGalleryViewCount()` está preparada
- **Requiere token de escritura** para funcionar

### Activar Contador:
1. Crear token en Sanity con permisos de escritura
2. Agregar `SANITY_WRITE_TOKEN` a `.env.local`
3. Descomentar código en `sanity/lib/queries.ts`:

```typescript
import { clientWithToken } from './client-write';

export async function incrementGalleryViewCount(galleryId: string) {
  try {
    await clientWithToken
      .patch(galleryId)
      .inc({ viewCount: 1 })
      .commit();
  } catch (error) {
    console.error('Error incrementing view count:', error);
  }
}
```

4. Llamar desde `app/gallery/[eventId]/page.tsx`:
```typescript
await incrementGalleryViewCount(gallery._id);
```

---

## 🎯 Casos de Uso

### 1. Boda con 300 fotos
```
- Subir fotos durante/después del evento
- Generar QR y colocar en la salida del venue
- Invitados escanean y descargan sus favoritas
- Expiración: 30 días después del evento
```

### 2. Evento Corporativo
```
- Solo fotos oficiales (sin permitir descargas si se desea)
- QR en credenciales de asistentes
- Expiración: 7 días (branding temporal)
```

### 3. Cumpleaños Íntimo
```
- Pocas fotos (20-50)
- URL compartida por WhatsApp
- Expiración: 60 días
- Permitir descargas: Sí
```

---

## 🛠️ Troubleshooting

### La galería no aparece:
1. ✅ Verificar que esté **Publicada** en Sanity (no solo guardada)
2. ✅ Confirmar que **isActive** = true
3. ✅ Revisar que **expirationDate** sea futura
4. ✅ El **eventId** en la URL coincide exactamente

### Las fotos no cargan:
1. ✅ Verificar que las imágenes estén subidas a Sanity
2. ✅ Revisar que los assets tengan URL válida
3. ✅ Configuración CORS de Sanity correcta

### Error 404:
1. ✅ Reiniciar dev server: `npm run dev`
2. ✅ Limpiar cache: `rm -rf .next`
3. ✅ Verificar que el archivo `app/gallery/[eventId]/page.tsx` existe

---

## 📈 Próximas Mejoras Sugeridas

- [ ] Sistema de contraseñas por galería
- [ ] Subida de fotos por invitados (UGC)
- [ ] Comentarios en fotos
- [ ] Likes/favoritos
- [ ] Álbumes múltiples por evento
- [ ] Watermark automático
- [ ] Compartir fotos individuales en RRSS
- [ ] Analytics avanzado (tiempo de permanencia, fotos más vistas)

---

## 📞 Soporte

Si tienes problemas con el sistema de galerías:
- Email: contacto@euforica.com
- Revisar logs en consola del navegador (F12)
- Verificar Studio de Sanity: /studio

---

**Última actualización:** Enero 2026  
**Versión:** 1.0.0
