# Pomodoro App

![GitHub issues](https://img.shields.io/github/issues/geduma/pomodoro)
![GitHub contributors](https://img.shields.io/github/contributors/geduma/pomodoro)

Temporizador Pomodoro minimalista. App web + desktop nativa (Electron).

## Requisitos

- Node.js >= 18
- npm >= 9

## Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run web:dev` | Servidor de desarrollo web (Vite) |
| `npm run web:build` | Type-check + build web → `dist/` |
| `npm run app:dev` | Build web + compilar Electron + ejecutar |
| `npm run app:build` | Build producción → `release/{version}/` |

## Documentación

- [PRD.md](./PRD.md) — Requisitos del producto, arquitectura, detalles de scripts y artefactos
- [AGENTS.md](./AGENTS.md) — Guía para asistentes IA (convenciones, stack, reglas)

<p align="center">By <a href="https://geduma.com">@geduma</a> &#9749;</p>
