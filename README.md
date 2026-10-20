# Plataforma hídrica UCentral: prototipo

Prototipo interactivo de la plataforma de monitoreo y detección de anomalías en el consumo hídrico de la Manzana Académica, Universidad Central. Es una sola página (`index.html`) sin dependencias ni servidor.

## Cuentas de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | admin@ucentral.edu.co | Admin2026Agua |
| Trabajador | carlos.rojas@ucentral.edu.co | Carlos2026Agua |
| Trabajador | marta.gomez@ucentral.edu.co | Marta2026Agua |
| Trabajador | andres.pardo@ucentral.edu.co | Andres2026Agua |
| Trabajador | laura.mejia@ucentral.edu.co | Laura2026Agua |
| Espectador | ambiental@ucentral.edu.co | Ambiental2026Agua |

Tras 5 intentos fallidos la cuenta se bloquea 15 minutos (RN-15, ERR-AUT-02).

## Cómo funciona

- **Datos guardados:** medidores, anomalías, trabajadores, notificaciones y la sesión se guardan en el `localStorage` del navegador. Al recargar la página todo sigue igual. El enlace de inicio de sesión tiene la opción «Restablecer datos de prueba».
- **Casos nuevos:** cada 10 minutos aparece una anomalía nueva en un medidor sin anomalía abierta. Solo ocurre con la página abierta; si estuvo cerrada, al volver se crean hasta 3 casos pendientes.
- **Gráfica en vivo:** se actualiza cada 30 segundos y agrega un punto nuevo en cada intervalo de 15 minutos.
- **Sin normalizarse:** mientras una anomalía no se marque como atendida, el consumo del medidor se mantiene fuera del rango normal y z sube 0,5 cada 30 minutos (hasta +6), así que la prioridad puede escalar. Al marcarla como atendida, la gráfica vuelve a lo normal desde ese momento.

- **Mapa del campus:** el menú **Mapa** muestra el mapa de evacuación (`mapa-evacuacion.png`) con cada medidor en su edificio. Un símbolo rojo con «!» marca las alertas abiertas y se actualiza solo. El Administrador puede reubicar un medidor tocando el mapa.

## Publicar en GitHub Pages

1. En GitHub, crea un repositorio nuevo (por ejemplo `plataforma-hidrica`).
2. Usa **Add file → Upload files** y sube `index.html`, `mapa-evacuacion.png` y `README.md`. Confirma con **Commit changes**.
3. Entra a **Settings → Pages**. En **Build and deployment**, elige **Deploy from a branch**, la rama `main` y la carpeta `/ (root)`. Guarda.
4. En uno o dos minutos la página queda en `https://TU-USUARIO.github.io/plataforma-hidrica/`.

## Límites del prototipo

- No tiene servidor: los datos viven en cada navegador y no se comparten entre usuarios ni dispositivos. La versión real usa el backend y la base de datos descritos en el documento de diseño.
- Las contraseñas están escritas en el código y son solo de demostración. No uses credenciales reales.
- Los datos de consumo son simulados.
