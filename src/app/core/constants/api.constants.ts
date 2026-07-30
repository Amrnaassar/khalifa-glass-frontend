export const API = {

  BASE_URL:'https://localhost:7272/',
  BASE_API_URL: 'https://localhost:7272/api',

  AUTH: {

    LOGIN: '/Auth/google-login',

    REFRESH_TOKEN: '/Auth/refresh-token'

  },

  QUOTES: {

    CREATE: '/Quotes',

    MY_QUOTES: '/Quotes/my-quotes',

    GET_ALL: '/Quotes',

    UPDATE_STATUS: '/Quotes',

    DELETE: '/Quotes'


  },
  USER: {
    ME: "/User/me"
  },
  CONTACT: '/Contact'

} as const;