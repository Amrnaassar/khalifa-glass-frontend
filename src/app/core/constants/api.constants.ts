export const API = {

  BASE_URL: 'https://localhost:7272/api',

  AUTH: {

    LOGIN: '/Auth/google-login',

    REFRESH_TOKEN: '/Auth/refresh-token'

  },

  QUOTES: {

    CREATE: '/Quotes',

    MY_QUOTES: '/Quotes/my-quotes',

    ALL_QUOTES: '/Quotes'

  },
  USER: {
    ME: "/User/me"
  },
  CONTACT: '/Contact'

} as const;