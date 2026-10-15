# Chinatown Wars · Segunda pantalla

Panel local para acompañar Grand Theft Auto: Chinatown Wars en PPSSPP, inspirado en la pantalla inferior de Nintendo DS.

## Funciones

- Mapa con seguimiento de Huang y vista de ciudad completa.
- Dinero, vida, armadura, arma equipada y munición en vivo.
- Iconos originales para las armas identificadas, armadura y algunos lugares.
- Gasolineras, refugios, Pay n Spray y concesionario con filtros.
- Calibración manual del mapa y modo de pantalla completa.

## Cómo ejecutarlo

1. Extrae el proyecto conservando sus carpetas.
2. Abre en PPSSPP **ULES01347, versión 1.01**, y entra en una partida.
3. Habilita el servidor de depuración remota de PPSSPP. El panel necesita su interfaz WebSocket.
4. Abre `panel.html` en un navegador de escritorio, en el mismo equipo que PPSSPP.
5. Indica el puerto del servidor de PPSSPP (el valor inicial es **54877**) y pulsa **Conectar**.
6. Lleva la ventana al segundo monitor y pulsa **Pantalla completa**.

El panel se conecta a `ws://127.0.0.1:PUERTO/debugger` con el protocolo `debugger.ppsspp.org`. No requiere paquetes, compilación ni una instalación de Node para usarlo. El emulador y el juego se obtienen por separado.

## Calibración

La alineación inicial es aproximada. Si el marcador no coincide, pulsa **Alinear posición** y sigue las instrucciones para marcar dos esquinas distintas. La calibración se guarda en el almacenamiento local del navegador; no se transfiere automáticamente a otro equipo. `calibracion.json` y `lugares.json` son archivos de referencia: el panel utiliza los datos incluidos en su JavaScript.

## Estructura

- `panel.html`: interfaz, estilos y lectura de memoria; archivo principal editable.
- `mapa.png`: mapa utilizado por el panel.
- `assets/weapons.png`, `assets/symbols.png`: atlas de iconos utilizados por el panel.
- `calibracion.json`, `lugares.json`: datos de referencia.
- `tests/hud-icons.cjs`: comprobación con datos simulados.

Para ejecutar la comprobación opcional con Node.js, desde la carpeta del proyecto:

```sh
node tests/hud-icons.cjs
```

## Estado y límites

Prototipo comprobado con PPSSPP 1.20.4 y la edición indicada del juego. Las direcciones de memoria son específicas de esa edición. El panel solamente solicita lecturas de memoria.

Vida y armadura convierten el máximo interno de 127 a 100 %. La munición se muestra como reserva fuera del cargador y balas dentro del cargador. Las armas sin icono identificado mantienen su nombre. Los lugares son fijos y aproximados: no indican si están desbloqueados. El reloj, correo y otros controles del PDA no están implementados.

Si no conecta, comprueba el servidor de depuración, el puerto y la edición del juego. Si el navegador bloquea la conexión local, revisa el mensaje de su consola. Este proyecto está pensado para ejecución local junto a PPSSPP; publicarlo en GitHub no lo convierte en un servicio conectado al emulador.

## Recursos y atribución

El mapa procede del GAME.PAK aportado por el usuario y los atlas proceden de sus texturas HUD. Los recursos gráficos del juego conservan los derechos de sus respectivos titulares; este proyecto no concede una licencia para redistribuirlos. No se incluye el juego ni el emulador.

Las ubicaciones se basan en [iGrandTheftAuto](https://www.igrandtheftauto.com/gtacw/maps/points-of-interest), adaptadas al mapa PSP.

## Subir a GitHub

Extrae el ZIP y sube el contenido de esta carpeta a tu repositorio. Antes de hacer público el repositorio, decide qué recursos gráficos tienes permiso para distribuir. No se ha añadido una licencia de software: puedes elegir una al preparar tu publicación.
