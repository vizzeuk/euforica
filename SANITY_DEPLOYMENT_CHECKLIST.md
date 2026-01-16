# ✅ Checklist de Deployment de Sanity

## 🔐 Configuración en sanity.io/manage

### 1. CORS Origins
**Path:** API → CORS Origins

Agregar estas URLs:
- ✅ `https://tu-dominio.vercel.app`
- ✅ `https://www.tu-dominio.com` (si tienes dominio custom)
- ✅ `http://localhost:3000` (para desarrollo)

**Importante:** Marcar "Allow credentials" en cada una

---

### 2. Dataset Configuration
**Path:** API → Datasets → production

- ✅ Visibility: **Public** (no authentication required)
- ✅ Mode: **Public**

---

### 3. Studio Hosts
**Path:** Datasets → production → Studio hosts

Agregar:
- ✅ `https://tu-dominio.vercel.app`

O simplemente:
- Ir a `https://tu-dominio.vercel.app/studio`
- Click en **"Register studio"** cuando aparezca el mensaje
- Confirmar la URL

---

## 🚀 Variables de Entorno en Vercel

**Path:** Settings → Environment Variables

Agregar estas 3 variables para **todos los ambientes** (Production, Preview, Development):

```
NEXT_PUBLIC_SANITY_PROJECT_ID = tly90wjj
NEXT_PUBLIC_SANITY_DATASET = production
NEXT_PUBLIC_SANITY_API_VERSION = 2024-01-01
```

**Después de agregar/cambiar variables:**
- ⚠️ Hacer **Redeploy** del proyecto (no basta con guardar)

---

## 🧪 Testing

### Test 1: API Directa
Abre la consola del navegador (F12) en tu sitio y ejecuta:

```javascript
fetch('https://tly90wjj.api.sanity.io/v2024-01-01/data/query/production?query=*[_type=="post"]')
  .then(r => r.json())
  .then(data => {
    console.log('✅ Posts encontrados:', data.result.length);
    console.log(data.result);
  })
  .catch(err => console.error('❌ Error:', err));
```

**Resultado esperado:** Array con tus posts

---

### Test 2: Studio Access
1. Ir a `https://tu-dominio.vercel.app/studio`
2. ✅ Debe cargar el Studio sin mensaje de "not registered"
3. ✅ Debes poder ver y editar posts

---

### Test 3: Blog en el Frontend
1. Ir a `https://tu-dominio.vercel.app/blog`
2. ✅ Deben aparecer los posts (reales o de ejemplo)
3. ✅ Click en un post debe abrir el detalle

---

## 🐛 Troubleshooting

### Problema: "Studio is not registered"
**Solución:**
1. En la pantalla del Studio, click **"Register studio"**
2. O manualmente: sanity.io/manage → Datasets → Studio hosts → Add host

---

### Problema: CORS error en consola
```
Access to fetch at 'https://tly90wjj.api.sanity.io/...' has been blocked by CORS
```

**Solución:**
1. sanity.io/manage → API → CORS Origins
2. Agregar tu dominio con "Allow credentials" ✅
3. Esperar 1-2 minutos para propagación

---

### Problema: 404 en queries o "Empty response"
**Causas posibles:**
- Dataset no es público → API → Datasets → Public
- No hay posts publicados → Crear al menos 1 post en Studio
- Variables de entorno incorrectas → Verificar en Vercel

---

### Problema: Posts no se actualizan en producción
**Solución:**
- Verificar que `useCdn: false` en `sanity/lib/client.ts`
- El cache de Vercel puede tomar hasta 60 segundos (ISR)
- Forzar refresh: Ctrl+Shift+R o Cmd+Shift+R

---

## 📝 Orden de Setup Recomendado

1. ✅ Configurar CORS en Sanity
2. ✅ Hacer Dataset público
3. ✅ Agregar variables de entorno en Vercel
4. ✅ Deploy del código
5. ✅ Ir a /studio y registrar el Studio
6. ✅ Crear primer post de prueba
7. ✅ Verificar en /blog que aparece

---

**Última actualización:** 16 Enero 2026
**Project ID:** tly90wjj
**Dataset:** production
