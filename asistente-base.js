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
  ]
};
