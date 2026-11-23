/* ============================================================
   BASE DE CONOCIMIENTO DEL ASISTENTE · Plataforma hídrica
   Archivo local con respuestas prediseñadas. Editable sin tocar index.html.
   - Entradas con "r": respuesta estática (texto fijo).
   - Entradas con "fn": respuesta dinámica generada con los datos simulados
     de la plataforma (la función vive en index.html, objeto ASIS).
   - "g": grupos de palabras clave (expresiones regulares sobre el texto
     normalizado: minúsculas y sin tildes). TODOS los grupos deben coincidir.
   - "p": prioridad extra para desempatar (más alto = gana).
   ============================================================ */
window.ASISTENTE_KB = {
  version: '1.0',

  mensajes: {
    fuera: 'No dispongo de esa información en mi base de conocimiento autorizada. Por favor, contacte directamente a un consultor de la pagina.',
    jailbreak: 'Violación de seguridad detectada. No puedo procesar esta solicitud.',
    knowhow: 'Esa información forma parte de los procesos internos exclusivos de la pagina y no estoy autorizado para compartirla.'
  },

  sugerencias: [
    '¿Qué edificio presenta más anomalías?',
    '¿Qué trabajador tiene más casos pendientes?',
    '¿Cuántas anomalías abiertas hay?',
    '¿Qué medidores están en falla?',
    '¿Qué medidor consume más hoy?',
    'Dame un resumen general'
  ],

  /* Protocolo anti-jailbreak y protección de know-how (texto normalizado, con espacios al inicio y al final) */
  bloqueo: {
    jailbreak: [
      ' ignora | ignore | ignorar ', 'olvida (tus|las|todo)', 'instrucciones (previas|anteriores)', 'previous instructions',
      'system override|developer mode|modo desarrollador|modo dios|jailbreak', ' modo dan | eres dan | dan mode ',
      'nuevo rol|asume (el|un) rol|asume el papel|actua como|finge ser|haz de cuenta',
      'traduce (tu|el|las) (prompt|instruccion)', ' prompt', 'instrucciones (originales|iniciales|del sistema|internas)',
      'que modelo (eres|usas)|eres (chatgpt|gpt|claude|gemini)|quien te (creo|programo|entreno)',
      'api key|apikey|clave de (api|acceso)|contrasena|password|token',
      'configuracion (interna|del sistema)|tu configuracion'
    ],
    knowhow: [
      'algoritmo|metodologia|estrategia',
      'proceso(s)? internos?',
      'como (se )?(detecta|detectan|calcula|calculan|identifica|identifican|implementa|implementan)',
      'como funciona (internamente|la deteccion)',
      'codigo fuente|formula (interna|de deteccion)|umbral',
      'logica (de|del) (sistema|deteccion)|modelo (de deteccion|estadistico)'
    ]
  },

  entradas: [
    /* ---------- Dinámicas (consultan los datos simulados) ---------- */
    { id: 'edificio_anomalias', fuente: 'index.html (datos simulados)', p: 2,
      g: ['edific|bloque|zona|cafeteria|sede', 'anomali|falla|fuga|problema|incidente'], fn: 'edificioMasAnomalias' },
    { id: 'medidor_anomalias', fuente: 'index.html (datos simulados)', p: 2,
      g: ['medidor|med-', 'anomali|falla|incidente', ' mas | mayor | top | peor '], fn: 'medidorMasAnomalias' },
    { id: 'trabajador_pendientes', fuente: 'index.html (datos simulados)', p: 2,
      g: ['trabajador|tecnico|operario|empleado|personal', 'pendiente|casos|carga|asignad|ocupad|anomali'], fn: 'trabajadorMasPendientes' },
    { id: 'trabajador_nombre', fuente: 'index.html (datos simulados)', p: 3,
      g: ['carlos|laura|andres|rojas|pineda|gomez'], fn: 'trabajadorPorNombre' },
    { id: 'trabajadores_disponibles', fuente: 'index.html (datos simulados)', p: 1,
      g: ['trabajador|tecnico|personal|turno', 'disponible|turno|ahora|activo|trabajando'], fn: 'trabajadoresDisponibles' },
    { id: 'anomalias_abiertas', fuente: 'index.html (datos simulados)',
      g: ['anomali|caso', 'abiert|activ|pendiente|cuantas|cuantos|hay'], fn: 'anomaliasAbiertas' },
    { id: 'prioridad_alta', fuente: 'index.html (datos simulados)', p: 1,
      g: ['alta|critic|urgent', 'anomali|prioridad|caso'], fn: 'prioridadAlta' },
    { id: 'sin_asignar', fuente: 'index.html (datos simulados)', p: 2,
      g: ['sin asignar|vencid|sin atender|no asignad|detectadas'], fn: 'sinAsignar' },
    { id: 'medidores_falla', fuente: 'index.html (datos simulados)', p: 1,
      g: ['medidor|med-', 'falla|fallando|danad|problema|alerta'], fn: 'medidoresEnFalla' },
    { id: 'medidores_lista', fuente: 'index.html (datos simulados)',
      g: ['medidor', 'cuantos|lista|cuales|todos|disponemos|existen'], fn: 'listaMedidores' },
    { id: 'estado_medidor', fuente: 'index.html (datos simulados)', p: 4,
      g: ['med-?[0-9]{3}'], fn: 'estadoMedidor' },
    { id: 'medidor_consumo', fuente: 'index.html (datos simulados)', p: 2,
      g: ['consum|litros|gasto', 'medidor|med-', ' mas | mayor | top | maximo '], fn: 'medidorMayorConsumo' },
    { id: 'consumo_total', fuente: 'index.html (datos simulados)',
      g: ['consum|litros|gasto', 'hoy|total|actual|ahora|dia'], fn: 'consumoTotal' },
    { id: 'tiempo_atencion', fuente: 'index.html (datos simulados)', p: 1,
      g: ['tiempo|promedio|medio|demora', 'atencion|resolu|respuesta|atender'], fn: 'tiempoAtencion' },
    { id: 'resumen', fuente: 'index.html (datos simulados)', p: 1,
      g: ['resumen|estado general|panorama|situacion|balance|general'], fn: 'resumenGeneral' },

    /* ---------- Estáticas (conceptos y normas de uso) ---------- */
    { id: 'saludo', fuente: 'Base_Conocimiento_Plataforma_Hidrica.md', p: 5,
      g: [' (hola|buenas|buenos|hey|saludos)'],
      r: 'Bienvenido(a). Soy el asistente de la Plataforma hídrica de la Universidad Central. Puedo informarle sobre el estado de los medidores, las anomalías y los turnos del personal, con base en los datos disponibles. ¿En qué puedo ayudarle?' },
    { id: 'cortesia', fuente: 'Base_Conocimiento_Plataforma_Hidrica.md', p: 5,
      g: ['gracias|adios|chao|hasta luego'],
      r: 'Con gusto. Quedo atento a cualquier otra consulta sobre la plataforma.' },
    { id: 'ayuda', fuente: 'Base_Conocimiento_Plataforma_Hidrica.md', p: 3,
      g: ['ayuda|puedes|puede hacer|que haces|funciones|capacidades|ejemplos|que sabes'],
      r: 'Puedo atender consultas como las siguientes:\n• Anomalías por edificio, por medidor o por prioridad.\n• Casos pendientes y carga de cada trabajador.\n• Estado y consumo de cada medidor (por ejemplo, MED-003).\n• Anomalías vencidas o sin asignar.\n• Tiempo medio de atención y resumen general.\n• Conceptos de la plataforma: estados, prioridades, roles y cierre de casos.\nLas respuestas se basan únicamente en los datos y documentos disponibles.' },
    { id: 'def_anomalia', fuente: 'Base_Conocimiento_Plataforma_Hidrica.md', p: 3,
      g: ['que es|significa|define|definicion|concepto|se entiende', 'anomali'],
      r: 'Una anomalía es un comportamiento del consumo de agua de un medidor que se aparta del rango esperado para su horario y que la plataforma registra para su revisión. Cada anomalía recibe un número, una prioridad (Alta, Media o Baja) y avanza por los estados Detectada, Asignada, En atención y Resuelta.' },
    { id: 'prioridades', fuente: 'Base_Conocimiento_Plataforma_Hidrica.md', p: 2,
      g: ['prioridad|niveles|alta media|criterio', 'que|significa|diferencia|cual|criterio|niveles'],
      r: 'La prioridad refleja la magnitud de la desviación del consumo frente al rango esperado:\n• Alta: desviación mayor; requiere atención prioritaria.\n• Media: desviación moderada.\n• Baja: desviación leve.' },
    { id: 'estados', fuente: 'Base_Conocimiento_Plataforma_Hidrica.md', p: 2,
      g: ['estado|flujo|ciclo|etapa|fases', 'anomali|caso|atencion'],
      r: 'Toda anomalía transita por cuatro estados: Detectada, Asignada, En atención y Resuelta. Una anomalía que permanece en estado Detectada más de 60 minutos sin ser asignada se marca como vencida.' },
    { id: 'roles', fuente: 'Base_Conocimiento_Plataforma_Hidrica.md', p: 2,
      g: ['rol|perfil|permiso|que puede|acceso', 'administrador|trabajador|espectador|usuario|hacer|roles|perfiles'],
      r: 'La plataforma maneja tres perfiles:\n• Administrador: consulta toda la información, asigna o reasigna anomalías, gestiona turnos y disponibilidad del personal, y utiliza este asistente.\n• Trabajador: consulta las anomalías que le fueron asignadas, inicia la atención y cierra el caso registrando la causa.\n• Espectador: perfil de solo consulta (Inicio, Medidores y Mapa).' },
    { id: 'cierre', fuente: 'Base_Conocimiento_Plataforma_Hidrica.md', p: 2,
      g: ['cerrar|cierre|resolver|resuelta|causa|justific', 'caso|anomali|causa|justific|cerrar'],
      r: 'Para cerrar un caso el trabajador debe registrar la causa del problema. Las causas disponibles son: Llave o grifo abierto; Fuga o daño real en tubería; Falla o descalibración del medidor; Uso programado o evento especial; Otro; y Falso positivo (consumo normal). La justificación es obligatoria cuando la causa es “Otro” o “Falso positivo”.' },
    { id: 'mapa', fuente: 'Base_Conocimiento_Plataforma_Hidrica.md', p: 1,
      g: ['mapa|plano|ubicacion|donde'],
      r: 'El mapa muestra la Manzana Académica de la Universidad Central y la ubicación de cada medidor. El color y el número del marcador indican la prioridad más alta y la cantidad de anomalías abiertas; la marca ✓ señala un medidor sin anomalías abiertas.' },
    { id: 'notificaciones', fuente: 'Base_Conocimiento_Plataforma_Hidrica.md', p: 1,
      g: ['notificacion|aviso|alerta|campana'],
      r: 'La campana de notificaciones reúne los avisos recientes: anomalías detectadas, asignaciones y cierres de casos. El trabajador recibe un aviso cuando se le asigna una anomalía.' },
    { id: 'turnos', fuente: 'Base_Conocimiento_Plataforma_Hidrica.md', p: 1,
      g: ['turno|horario|jornada'],
      r: 'Cada trabajador tiene un turno diario (hora de inicio y de fin) que el Administrador puede modificar, y puede marcarse como disponible o no disponible. Las asignaciones consideran al personal disponible dentro de su turno.' }
  ],
  preguntasFrecuentes: [
  {
    "pregunta": "Dame un resumen general",
    "fn": "resumenGeneral",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuál es el estado general de la plataforma?",
    "fn": "resumenGeneral",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cómo va el monitoreo hídrico?",
    "fn": "resumenGeneral",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Puedes mostrar el panorama de hoy?",
    "fn": "resumenGeneral",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuántos litros se han consumido hoy?",
    "fn": "consumoTotal",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuál es el consumo total de agua?",
    "fn": "consumoTotal",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuánto consumo acumulan los medidores?",
    "fn": "consumoTotal",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué volumen de agua registra hoy el sistema?",
    "fn": "consumoTotal",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué medidor consume más hoy?",
    "fn": "medidorMayorConsumo",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuál es el medidor de mayor consumo?",
    "fn": "medidorMayorConsumo",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Muéstrame el ranking de consumo",
    "fn": "medidorMayorConsumo",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Dónde se registra más consumo de agua?",
    "fn": "medidorMayorConsumo",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué medidor consume menos hoy?",
    "fn": "medidorMenorConsumo",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuál es el medidor de menor consumo?",
    "fn": "medidorMenorConsumo",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Muéstrame el medidor con el consumo más bajo",
    "fn": "medidorMenorConsumo",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Dónde hay menos consumo registrado?",
    "fn": "medidorMenorConsumo",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuál es el consumo medio por medidor?",
    "fn": "promedioConsumo",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuántos litros consume en promedio cada medidor?",
    "fn": "promedioConsumo",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Dime el consumo promedio de hoy",
    "fn": "promedioConsumo",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuál es el promedio de consumo registrado?",
    "fn": "promedioConsumo",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuántos medidores hay?",
    "fn": "listaMedidores",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuáles son todos los medidores?",
    "fn": "listaMedidores",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Dame el listado de medidores",
    "fn": "listaMedidores",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué medidores vigila la plataforma?",
    "fn": "listaMedidores",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué medidores están en falla?",
    "fn": "medidoresEnFalla",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuántos medidores presentan falla?",
    "fn": "medidoresEnFalla",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Dime los medidores con alertas activas",
    "fn": "medidoresEnFalla",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuáles medidores tienen problemas actualmente?",
    "fn": "medidoresEnFalla",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuántos medidores funcionan normalmente?",
    "fn": "medidoresNormales",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué medidores no tienen fallas?",
    "fn": "medidoresNormales",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Muéstrame los medidores sin anomalías abiertas",
    "fn": "medidoresNormales",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuáles están en estado normal?",
    "fn": "medidoresNormales",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuántas anomalías abiertas hay?",
    "fn": "anomaliasAbiertas",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué casos siguen pendientes?",
    "fn": "anomaliasAbiertas",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuántas alertas están activas?",
    "fn": "anomaliasAbiertas",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Dame el desglose de anomalías abiertas",
    "fn": "anomaliasAbiertas",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuántas anomalías están resueltas?",
    "fn": "anomaliasResueltas",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué casos ya se cerraron?",
    "fn": "anomaliasResueltas",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Muéstrame las últimas anomalías resueltas",
    "fn": "anomaliasResueltas",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuántas incidencias se solucionaron?",
    "fn": "anomaliasResueltas",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuántas anomalías de prioridad alta hay?",
    "fn": "prioridadAlta",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Dame las alertas críticas abiertas",
    "fn": "prioridadAlta",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuáles son los casos urgentes?",
    "fn": "prioridadAlta",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Muestra los casos de prioridad alta",
    "fn": "prioridadAlta",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué anomalías de prioridad media hay?",
    "fn": "prioridadMedia",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuántos casos medios siguen abiertos?",
    "fn": "prioridadMedia",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Dame las alertas de prioridad media",
    "fn": "prioridadMedia",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuáles son las incidencias medias?",
    "fn": "prioridadMedia",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué anomalías de prioridad baja hay?",
    "fn": "prioridadBaja",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuántos casos leves están abiertos?",
    "fn": "prioridadBaja",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Muéstrame las alertas de prioridad baja",
    "fn": "prioridadBaja",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuáles anomalías son de baja prioridad?",
    "fn": "prioridadBaja",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuántas anomalías no tienen asignación?",
    "fn": "sinAsignar",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué casos están sin asignar?",
    "fn": "sinAsignar",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Muéstrame anomalías detectadas pendientes",
    "fn": "sinAsignar",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuáles anomalías están vencidas?",
    "fn": "sinAsignar",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué anomalías están en atención?",
    "fn": "enAtencion",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuántos casos se están atendiendo?",
    "fn": "enAtencion",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Muéstrame las incidencias en atención",
    "fn": "enAtencion",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué trabajos están en curso?",
    "fn": "enAtencion",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuántas anomalías están asignadas?",
    "fn": "asignadas",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuáles casos están asignados y pendientes de inicio?",
    "fn": "asignadas",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Muéstrame las anomalías asignadas",
    "fn": "asignadas",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué alertas esperan que inicie el trabajador?",
    "fn": "asignadas",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué edificio presenta más anomalías?",
    "fn": "edificioMasAnomalias",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿En qué bloque hay más problemas?",
    "fn": "edificioMasAnomalias",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué zona acumula más incidencias?",
    "fn": "edificioMasAnomalias",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Muéstrame las anomalías por edificio",
    "fn": "edificioMasAnomalias",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué medidor tiene más anomalías?",
    "fn": "medidorMasAnomalias",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuál es el medidor con más fallas registradas?",
    "fn": "medidorMasAnomalias",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Muéstrame el ranking de anomalías por medidor",
    "fn": "medidorMasAnomalias",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué medidor acumula más incidencias?",
    "fn": "medidorMasAnomalias",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué trabajador tiene más casos pendientes?",
    "fn": "trabajadorMasPendientes",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Quién tiene mayor carga de trabajo?",
    "fn": "trabajadorMasPendientes",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Muéstrame los casos abiertos por trabajador",
    "fn": "trabajadorMasPendientes",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué técnico tiene más anomalías asignadas?",
    "fn": "trabajadorMasPendientes",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué trabajadores están disponibles ahora?",
    "fn": "trabajadoresDisponibles",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Quién está dentro de su turno?",
    "fn": "trabajadoresDisponibles",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuántos técnicos están disponibles?",
    "fn": "trabajadoresDisponibles",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Dime el personal disponible en este momento",
    "fn": "trabajadoresDisponibles",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuáles son los trabajadores registrados?",
    "fn": "trabajadoresLista",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Muéstrame los turnos de todo el personal",
    "fn": "trabajadoresLista",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuántos trabajadores hay?",
    "fn": "trabajadoresLista",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Dime quiénes son los técnicos de la plataforma",
    "fn": "trabajadoresLista",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuál es el tiempo promedio de atención?",
    "fn": "tiempoAtencion",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuánto tarda en promedio resolver una anomalía?",
    "fn": "tiempoAtencion",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué tiempo medio de resolución hay?",
    "fn": "tiempoAtencion",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Muéstrame la duración media de los casos",
    "fn": "tiempoAtencion",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuál es la última anomalía registrada?",
    "fn": "anomaliaReciente",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué alerta se detectó más recientemente?",
    "fn": "anomaliaReciente",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Muéstrame el caso más nuevo",
    "fn": "anomaliaReciente",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué incidencia fue la última en aparecer?",
    "fn": "anomaliaReciente",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuál es la anomalía abierta más antigua?",
    "fn": "anomaliaAntigua",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Qué caso pendiente lleva más tiempo?",
    "fn": "anomaliaAntigua",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Muéstrame la alerta abierta más vieja",
    "fn": "anomaliaAntigua",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuál es la incidencia más antigua por resolver?",
    "fn": "anomaliaAntigua",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuántos casos hay por estado?",
    "fn": "estadisticasEstados",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "Muéstrame los estados de las anomalías",
    "fn": "estadisticasEstados",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cómo se distribuyen las incidencias por estado?",
    "fn": "estadisticasEstados",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  },
  {
    "pregunta": "¿Cuántas detectadas asignadas en atención y resueltas existen?",
    "fn": "estadisticasEstados",
    "fuente": "Base_Conocimiento_Plataforma_Hidrica.md"
  }
]

};
