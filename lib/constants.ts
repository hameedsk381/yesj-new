export const FORM_CONSTANTS = {
  STEPS: {
    MEMBERSHIP_TOTAL: 3,
    LEADERSHIP_TOTAL: 4,
  },
  VALIDATION: {
    MIN_NAME_LENGTH: 2,
    MIN_AGE: 16,
    MAX_AGE: 35,
    MIN_PHONE_LENGTH: 10,
    MAX_PHONE_LENGTH: 15,
    MIN_ADDRESS_LENGTH: 10,
  },
  DEBOUNCE: {
    AUTO_SAVE_DELAY: 1000,
  },
  STORAGE_KEYS: {
    REGISTRATION_DRAFT: 'registration-draft',
  },
}

export const RATE_LIMIT = {
  REGISTRATION: {
    interval: 60000,
    maxRequests: 3,
  },
  NEWSLETTER: {
    interval: 60000,
    maxRequests: 5,
  },
  CONTACT: {
    interval: 60000,
    maxRequests: 5,
  },
  NOMINATION: {
    interval: 60000,
    maxRequests: 3,
  },
}

export const CAROUSEL = {
  AUTO_PLAY_INTERVAL: 3000,
}

export const ANIMATION = {
  TRANSITION_DURATION: 0.3,
  PAGE_TRANSITION_DELAY: 500,
}

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  MISSION: '/mission',
  PROGRAMS: '/programs',
  EVENTS: '/events',
  NEWS: '/news',
  GALLERY: '/gallery',
  CONTACT: '/contact',
  REGISTER: '/register',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS: '/terms',
  COOKIES: '/cookies',
} as const
