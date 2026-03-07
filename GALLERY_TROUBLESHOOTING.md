# 🔧 Solución de Problemas - Galerías de Eventos

## ❌ Problema: "Expired" o galería no funciona

### Causa Principal

El problema más común es la **comparación incorrecta de fechas** debido a zonas horarias.

Cuando creas una galería con fecha de expiración "10 días en el futuro", el sistema:

1. Guarda la fecha en Sanity (puede tener zona horaria diferente)
2. El servidor Next.js compara con hora actual
3. Si hay desajuste de zona horaria, puede parecer expirada aunque no lo esté

### 🔍 PASO 1: Usa la Página de Debug

**Antes de hacer cualquier cosa, verifica los datos reales:**

```
https://tudominio.cl/gallery/debug/tu-event-id
```

Por ejemplo: `https://euforica.cl/gallery/debug/boda-juan-2026`

Esta página te mostrará:

- ✅ Si la galería existe en Sanity
- ✅ Si está marcada como activa
- ✅ Fecha de expiración en UTC y hora de Chile
- ✅ Cuántos días/horas exactamente faltan (o pasaron)
- ✅ Por qué está fallando la validación

---

## 🛠️ Soluciones

### Solución 1: Verificar con Debug (RECOMENDADO)

1. Accede a `/gallery/debug/tu-event-id`
2. Revisa la sección "Análisis de Expiración"
3. Si dice "EXPIRADA" pero configuraste 10 días, hay problema de zona horaria

**Si la página debug muestra que está expirada:**

- Ve a Sanity Studio
- Edita la galería
- Cambia la fecha a una más lejana (20-30 días)
- **IMPORTANTE:** Asegúrate de seleccionar también la HORA (no solo la fecha)
- Guarda y espera 1-2 minutos

### Solución 2: Configurar Correctamente en Sanity

#### 📅 Al Seleccionar Fecha de Expiración:

**Problema común:** Sanity guarda en UTC, pero tu seleccionas en hora local

**Ejemplo del problema:**

- Seleccionas: 17 de marzo 2026 a las **00:00** (medianoche Chile = UTC-3)
- Sanity guarda: 17 de marzo 2026 a las **03:00 UTC**
- Servidor compara en UTC
- Si estás en las primeras horas del día 17, puede parecer que no ha llegado

**✅ SOLUCIÓN:**

- Cuando selecciones la fecha, pon **hora del mediodía** (12:00 PM)
- O mejor aún, pon la fecha + 1 día extra como margen
- Ejemplo: Si quieres que expire el 17 de marzo, pon 18 de marzo

### Solución 3: Limpiar Cache

**IMPORTANTE:** Revisa estos campos en Sanity Studio:

#### 📅 Fecha de Expiración

- **Por defecto:** Ahora se configura automáticamente a **60 días** en el futuro
- **Verifica:** Que la fecha y hora sean **futuras**
- **⚠️ Zona horaria:** Asegúrate de estar en la zona horaria correcta (Chile: UTC-3/-4)
- **Recomendación:** Pon fechas con margen (30-90 días adelante)

#### ✅ Galería Activa

- Debe estar **activado** (toggle en verde)
- Si lo desactivas manualmente, la galería no se mostrará aunque no haya expirado

#### 🔑 ID del Evento

- Debe ser **único** y sin espacios
- Ejemplo: `boda-juan-maria-2026`
- No uses caracteres especiales ni acentos

---

### 2. Revisar una Galería Existente

En Sanity Studio, ahora verás el estado en tiempo real:

- ✅ **Activa (45 días)** → Funciona correctamente
- ⚠️ **Expira en 3 días** → Alerta, próxima a expirar
- ⏰ **EXPIRADA** → No se muestra, necesitas extender la fecha
- 🔴 **Inactiva** → Desactivada manualmente

Para reactivar una galería expirada:

1. Abre la galería en Sanity Studio
2. Cambia la "Fecha de Expiración" a una fecha **futura**
3. Verifica que "Galería Activa" esté en **true**
4. Guarda los cambios (Publish)
5. Espera 5 minutos (tiempo de cache) o revalida manualmente

---

### 3. Extender Fecha de Expiración

Si una galería ya expiró y necesitas reactivarla:

1. Ve a `/studio` en tu navegador
2. Busca la galería en la lista
3. Verás el estado **⏰ EXPIRADA**
4. Haz clic para editar
5. Cambia "Fecha de Expiración" a una fecha futura (ejemplo: +30 días)
6. Haz clic en **Publish**
7. La galería estará disponible en ~5 minutos

---

## 🎯 Mejores Prácticas

### Configuración Recomendada por Tipo de Evento

| Tipo de Evento | Duración Recomendada |
| -------------- | -------------------- |
| Bodas          | 60-90 días           |
| Cumpleaños     | 30-45 días           |
| Corporativo    | 30-60 días           |
| Eventos Cortos | 15-30 días           |

### Checklist antes de Publicar:

- [ ] Nombre del evento claro y descriptivo
- [ ] ID único y sin espacios (`boda-nombre-2026`)
- [ ] Fecha de expiración **futura** (con margen de días)
- [ ] Galería Activa = **true**
- [ ] Al menos 1 foto subida
- [ ] Imagen de portada seleccionada

---

## 🚨 Mensajes de Error Comunes

### "Esta galería ha expirado"

**Causa:** La fecha de expiración ya pasó
**Solución:** Edita la galería en Sanity y actualiza la fecha a futuro

### "Galería no encontrada"

**Causa:** El ID del evento no existe o tiene un error
**Solución:** Verifica que el ID en la URL coincida con el ID en Sanity

### "Esta galería está desactivada"

**Causa:** El toggle "Galería Activa" está en false
**Solución:** Activa el toggle en Sanity Studio

---

## 🔍 Verificar Estado de una Galería

### En Sanity Studio:

1. Ve a `/studio` → "Galería de Eventos"
2. El estado se muestra en el subtítulo de cada galería:
   - ✅ = Funcionando
   - ⚠️ = Por expirar pronto
   - ⏰ = Expirada
   - 🔴 = Desactivada

### En la Consola del Navegador:

Cuando visitas una galería, revisa la consola (F12):

- `✅ Galería cargada: Nombre (X fotos)` → OK
- `⏰ Galería expirada: ID (expiró el ...)` → Necesita actualización
- `❌ Galería no encontrada: ID` → ID incorrecto
- `🔴 Galería inactiva: ID` → Desactivada manualmente

---

## 🛡️ Validaciones Automáticas (Implementadas)

El sistema ahora incluye:

1. **Fecha por defecto inteligente** → +60 días automáticamente
2. **Validación en tiempo real** → Alerta si pones fecha pasada
3. **Preview mejorado** → Muestra días restantes
4. **Alertas visuales** → Aviso cuando quedan menos de 7 días

---

## 📞 ¿Aún Tienes Problemas?

Si después de revisar todo esto el problema persiste:

1. **Revisa los logs de la consola** (F12 en el navegador)
2. **Verifica que Sanity esté conectado** (ve a `/studio`)
3. **Prueba en modo incógnito** (para descartar cache del navegador)
4. **Espera 5 minutos** después de publicar cambios (revalidación de cache)

---

## 📝 Notas Técnicas

- **Cache de galería:** 5 minutos (300 segundos)
- **Zona horaria:** Las fechas se almacenan en UTC y se convierten localmente
- **Validación:** Se ejecuta en el servidor antes de mostrar la galería
- **Fotos máximas:** 500 por galería
