import { TranslationKeys } from './en'

export const es: TranslationKeys = {
  common: {
    back: 'Volver',
    login: 'Iniciar sesión',
    logout: 'Salir',
    loading: 'Cargando...',
    cancel: 'Cancelar',
    save: 'Guardar',
    delete: 'Eliminar',
    edit: 'Editar',
  },

  home: {
    title: '📚 Recursos JLPT',
    subtitle: 'Vocabulario, Kanji, Gramática y más',
    selectLevel: 'Selecciona tu nivel',
    footer: '¡がんばって！💪',
  },

  levels: {
    n5: {
      name: 'N5',
      badge: 'Principiante',
      description: 'Nivel básico · ~800 palabras · Kanji básicos',
    },
    n4: {
      name: 'N4',
      badge: 'Elemental',
      description: 'Conversación básica · ~1,500 palabras',
    },
    n3: {
      name: 'N3',
      badge: 'Intermedio',
      description: 'Conversación cotidiana · ~3,700 palabras',
    },
    n2: {
      name: 'N2',
      badge: 'Avanzado',
      description: 'Contextos formales · ~6,000 palabras',
    },
    n1: {
      name: 'N1',
      badge: 'Experto',
      description: 'Nivel nativo · ~10,000 palabras',
    },
  },

  categories: {
    vocabulary: {
      name: 'Vocabulario',
      description: 'Palabras esenciales',
    },
    kanji: {
      name: 'Kanji',
      description: 'Caracteres',
    },
    grammar: {
      name: 'Gramática',
      description: 'Estructuras gramaticales',
    },
    reading: {
      name: 'Reading',
      description: 'Comprensión lectora',
    },
    listening: {
      name: 'Listening',
      description: 'Comprensión auditiva',
    },
    comingSoon: 'Próximamente',
  },

  auth: {
    loginTitle: 'Iniciar Sesión',
    loginSubtitle: 'Accede a tu cuenta JLPT',
    email: 'Email',
    password: 'Contraseña',
    emailPlaceholder: 'tu@email.com',
    passwordPlaceholder: '••••••••',
    loginButton: 'Entrar',
    loggingIn: 'Entrando...',
    noAccount: '¿No tienes cuenta?',
    register: 'Regístrate',
    mockModeTitle: '🧪 Modo Demo (Mock)',
    mockModeInfo: 'Cualquier email/password funciona',
    mockModePremium: 'Para contenido premium, usa:',
  },

  premium: {
    title: 'Obtener Premium',
    subtitle: 'Desbloquea todo el contenido',
    heroTitle: 'Acceso completo a todos los niveles JLPT',
    heroSubtitle: 'Todo el vocabulario, kanji, gramática y ejercicios',
    pricePerMonth: '/mes',
    features: {
      allLevels: 'Acceso a todos los niveles (N5-N1)',
      vocabulary: '+10,000 palabras de vocabulario',
      kanji: '+2,000 kanji con ejemplos',
      grammar: 'Ejercicios de gramática ilimitados',
      comprehension: 'Comprensión auditiva y lectora',
      progress: 'Seguimiento de progreso',
      noAds: 'Sin anuncios',
      offline: 'Acceso offline',
    },
    subscribeButton: '🚀 Suscribirse ahora',
    trial: '7 días de prueba gratis · Cancela cuando quieras',
    demoNote: 'Modo Demo',
    demoInfo: 'Esta página es de demostración. La integración con Stripe u otro procesador de pagos se añadirá cuando tengas el backend listo.',
  },

  vocabulary: {
    title: 'Vocabulario',
    wordsCount: 'palabras',
    freeVersion: '🔒 Versión Gratuita',
    viewing: 'Viendo',
    of: 'de',
    unlockAll: 'Desbloquear todo →',
    example: 'Ejemplo:',
    premiumBadge: 'Premium',
    upgradeFooter: '¿Quieres acceder a las',
    remainingWords: 'palabras restantes?',
    getPremium: 'Obtener Premium',
  },

  errors: {
    loginError: 'Error al iniciar sesión',
    connectionError: 'Error de conexión',
    unauthorized: 'No autorizado',
    notFound: 'No encontrado',
    serverError: 'Error del servidor',
  },
}

