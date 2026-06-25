# PRD: Pomodoro App

## 1. Resumen Ejecutivo

Aplicación de escritorio multiplataforma (macOS, Windows, Linux) basada en la técnica Pomodoro. Combina un frontend web (Vue 3 + Vite) con un wrapper nativo (Electron) para ofrecer un temporizador minimalista siempre al frente.

## 2. Objetivos del Producto

- Proveer un temporizador Pomodoro simple, rápido y siempre visible.
- Ciclo automático: Pomodoro → Short Break → Long Break.
- Persistencia de configuración en `localStorage`.
- Distribución como app de escritorio nativa (dmg, AppImage, deb, nsis) y web.

## 3. Funcionalidades Principales

### 3.1 Temporizador
- 3 modos: Pomodoro (25min), Short Break (5min), Long Break (15min).
- Botones: START, PAUSE, STOP, MUTE.
- Cambio de modo cíclico mediante botón superior.
- Alarma sonora con auto-stop a los 30 segundos.
- Sonido de clic en cada interacción.

### 3.2 Configuración
- Ajuste de duración (minutos) para cada modo.
- Selección de tipo de alarma (iphone, classic).
- Vista previa de alarma (5 segundos).
- Validación de valores (1-60 min).
- Restaurar valores por defecto.
- Persistencia en `localStorage` (clave `pomodoro-app-settings`).

### 3.3 Electron (Desktop)
- Ventana no redimensionable (250x350).
- Barra de título oculta (`titleBarStyle: 'hidden'`).
- Siempre al frente (`setAlwaysOnTop`).
- Visible en todos los espacios de trabajo.
- Dock oculto en macOS.
- Iconos nativos para cada plataforma.

## 4. Stack Tecnológico

| Componente | Tecnología |
|-----------|-----------|
| Frontend | Vue 3.2 (Options API + Composition API) |
| Lenguaje | TypeScript 4.7 |
| Build | Vite 8 |
| Routing | Vue Router 4 (hash-based) |
| CSS | Bootstrap 5.2 + tema oscuro personalizado |
| Desktop | Electron + electron-builder |
| Linter | ts-standard |

## 5. Arquitectura

```
index.html → src/main.ts → App.vue
                             ├── HeaderComponent
                             ├── <router-view>
                             │   ├── HomeComponent (/) ← FooterComponent
                             │   ├── SettingsComponent (/settings)
                             │   └── DownloadComponent (/download)
                             └── InfoComponent (modal global)
src/electron/
  ├── main/main.ts   → BrowserWindow (250x350, always-on-top)
  └── preload/preload.ts → expone versiones al DOM
```

## 6. Rutas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | HomeComponent | Temporizador principal + footer de navegación |
| `/settings` | SettingsComponent | Configuración de tiempos y alarma |
| `/download` | DownloadComponent | Página placeholder de descarga |

## 7. Datos y Persistencia

- **settings.json** (público): valores por defecto.
- **localStorage** (`pomodoro-app-settings`): valores guardados por el usuario.
- Formato:
  ```json
  {
    "pomodoro": 25,
    "shortBreak": 5,
    "longBreak": 15,
    "longBreakInterval": 4,
    "alarm": "iphone"
  }
  ```

## 8. Scripts

| Script | Comando | Uso |
|--------|---------|-----|
| `web:dev` | `vite` | Servidor de desarrollo web |
| `web:build` | `rimraf dist/ && vue-tsc --noEmit && vite build` | Build web |
| `app:dev` | `npm run web:build && tsc && electron .` | Build + ejecutar Electron |
| `app:build` | `rimraf release/ && npm run web:build && tsc && electron-builder` | Build producción desktop |

## 9. Criterios de Éxito

- Build web exitoso sin errores.
- Build Electron exitoso para las 3 plataformas.
- Timer preciso con intervalos de 1 segundo.
- Persistencia de configuración entre sesiones.
- Sin dependencias rotas ni versiones incompatibles.

## 10. Pendientes / Mejoras Futuras

- Tests unitarios y E2E (vitest, Cypress/Playwright).
- Notificaciones nativas del sistema.
- Página de descarga funcional.
- Estadísticas de sesiones completadas.
- Atajos de teclado.
- Tema claro/oscuro configurable.
