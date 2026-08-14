export const API = {

  BASE_URL:'https://khalifaglass-api-b4e6h6dhckaag4hb.centralindia-01.azurewebsites.net/',
  BASE_API_URL: 'https://khalifaglass-api-b4e6h6dhckaag4hb.centralindia-01.azurewebsites.net/api',

  AUTH: {

    LOGIN: '/Auth/google-login',

    REFRESH_TOKEN: '/Auth/refresh-token'

  },
  GALLERTY: {
    GET_ALL:'/Gallery'
  },
  CATEGORY:{
    GET_ALL:'/ProjectCategories'
  },
  PROJECTS:{
    GEL_ALL:'/Projects'
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