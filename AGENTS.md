# AGENTS.md — Guía para Asistentes IA

## Stack

- **Framework:** Vue 3.2 (Options API + Composition API)
- **Lenguaje:** TypeScript 4.7.4
- **Build:** Vite 8 (rolldown) + vue-tsc
- **CSS:** Bootstrap 5.2 + tema oscuro personalizado (`--default-bgcolor: #0D1117`)
- **Desktop:** Electron 42 + electron-builder
- **Router:** Vue Router 4 (hash-based, `createWebHashHistory`)

## Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run web:dev` | Servidor de desarrollo web |
| `npm run web:build` | Type-check + build web a `dist/` |
| `npm run app:dev` | Build web + compilar Electron + ejecutar |
| `npm run app:build` | Build producción multiplataforma |

## Estructura del Proyecto

```
src/
├── main.ts                    # Entry point Vue
├── App.vue                    # Componente raíz
├── router/index.ts            # Configuración de rutas
├── assets/main.css            # Estilos globales (oscuros)
├── components/
│   ├── HomeComponent.vue      # Temporizador principal
│   ├── SettingsComponent.vue  # Configuración
│   ├── FooterComponent.vue    # Navegación inferior
│   ├── HeaderComponent.vue    # Logo + título
│   ├── InfoComponent.vue      # Modal About
│   └── DownloadComponent.vue  # Placeholder
└── electron/
    ├── main/main.ts           # Proceso principal Electron
    └── preload/preload.ts     # Preload script
```

## Convenciones

- **Import alias:** `@/` → `src/`, `@public/` → `public/`
- **Rutas:** hash-based, 3 rutas (`/`, `/settings`, `/download`)
- **UI sounds:** `./audio/click.wav` (clics), `./audio/alarm_*.mp3` (alarmas)
- **Settings:** persistencia en `localStorage` clave `pomodoro-app-settings`
- **Valores default:** `public/settings.json`
- **Dark theme:** El `<html>` tiene clase `dark`. Body usa `-webkit-app-region: drag` para Electron.
- **Componentes:** Name con PascalCase, export default + setup() function
- **Tipos:** `.vue` files declarados en `shims-vue.d.ts`

## Electron

- Ventana: 250x350, no redimensionable, `titleBarStyle: 'hidden'`
- Siempre al frente (`setAlwaysOnTop(true, 'screen-saver')`)
- Compilación separada: `tsc` para `src/electron/`, Vite para `src/components/`
- `app.dock?.hide()` en macOS (uso de optional chaining)

## Reglas para el Asistente

1. **NO** modifiques `package-lock.json` directamente; usa `npm install <pkg>`.
2. **NO** elimines `"preserveValueImports": false` de `tsconfig.json` (necesario por `module: "commonjs"` para Electron).
3. **SI** agregas una dependencia, verifica compatibilidad con Vite 8 y Vue 3.2.
4. **VERIFICA** que `npm run web:build` pase antes de dar una tarea por terminada.
5. **USA** el alias `@public/` para assets en `public/` (íconos, audio).
6. **EVITA** eliminar el `.catch()` en promesas — el proyecto los usa para errores no fatales.
7. **PREFIERE** `ref` sobre `reactive` para valores primitivos (consistente con el código existente).
8. **USA** `Array.isArray()` al leer settings que puedan ser array o string (ej: `alarm`).
