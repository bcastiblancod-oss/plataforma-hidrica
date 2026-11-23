# Base de conocimiento autorizada — Prototipo Plataforma Hídrica

**Naturaleza:** documento de demostración creado para la aplicación con datos simulados. No representa documentación institucional oficial.

## Plataforma
La plataforma de monitoreo hídrico permite consultar consumo de agua simulado de cinco medidores, anomalías, trabajadores y mapa esquemático.

## Anomalías
Una anomalía representa una desviación del consumo respecto al rango esperado de la simulación. Estados: Detectada, Asignada, En atención y Resuelta. Prioridades: Alta, Media y Baja, como etiquetas de gravedad de la desviación simulada. Una anomalía detectada durante más de 60 minutos sin asignarse se marca como vencida.

## Roles
Administrador: consulta información, asigna o reasigna anomalías, gestiona turnos y disponibilidad y usa el asistente. Trabajador: consulta casos asignados, inicia atención y los cierra registrando la causa. Espectador: consulta Inicio, Medidores y Mapa. Los accesos son demostrativos y no constituyen autenticación segura.

## Cierre de casos
El trabajador asignado puede cerrar un caso en atención registrando la causa: Llave o grifo abierto; Fuga o daño real en tubería; Falla o descalibración del medidor; Uso programado o evento especial; Otro; Falso positivo (consumo normal). En los dos últimos casos se exige justificación.

## Mapa
El mapa esquemático permite seleccionar medidores. El número del marcador indica anomalías abiertas; la marca ✓ significa ausencia de anomalías abiertas. Los colores distinguen prioridad. El gráfico y la ubicación son simulados.

## Notificaciones y turnos
Las notificaciones internas registran detección, asignación y cierre. El intento de enviar correo depende del servicio externo de API configurado en el archivo index.html y no está garantizado localmente. El administrador puede ajustar horario y disponibilidad; la asignación automática solo selecciona personas disponibles dentro de su turno en el prototipo.

## Asistente local
El asistente responde mediante reglas y frases prediseñadas del archivo asistente-base.js y consultas calculadas a los datos simulados en index.html. No emplea un modelo generativo ni hace búsquedas en Internet. Si no se encuentra una respuesta permitida debe usar el texto de fuera de alcance configurado. Muestra un registro de auditoría en pantalla.

## Uso permitido
El contenido de esta base solo describe el prototipo y no proporciona asesoría regulatoria, financiera ni información técnica validada del campus.

## Ampliación: reportes y analítica simulada
La plataforma puede mostrar el consumo total de hoy, el promedio y los medidores con mayor y menor consumo, calculados a partir de los registros simulados que aparecen en pantalla. También puede listar medidores con y sin anomalías abiertas.

Las anomalías se pueden agrupar por prioridad (alta, media y baja), por estado (detectada, asignada, en atención o resuelta), por medidor y por zona. Se pueden consultar la anomalía más reciente, la abierta más antigua, las alertas sin asignar y los casos en atención. La carga de cada trabajador se expresa como cantidad de anomalías abiertas que tiene asignadas.

El asistente admite 100 preguntas sugeridas prediseñadas en `asistente-base.js`, agrupadas en 25 asuntos, además de reglas generales ya existentes. Las respuestas de esos asuntos consultan las variables de la simulación y pueden variar durante la sesión. La espera de 3 segundos es una animación de interfaz, no procesamiento por un modelo de inteligencia artificial.

El botón de informe PDF genera un archivo local con preguntas, respuestas, fecha, estado de auditoría y fuente. No envía la conversación a un servidor. El historial se conserva solo mientras la página permanece abierta; reiniciar o actualizar la página borra esa conversación.

**Fuentes:** el asistente cita este documento de demostración; no son certificaciones institucionales ni mediciones de campo.
