const isProduction = process.env.REACT_APP_NODE_ENV === 'production'

export const baseURL = isProduction
  ? process.env.REACT_APP_BASE_URL_PROD
  : process.env.REACT_APP_BASE_URL_DEV

export const ipURL = 'https://api.ipify.org/?format=json'

export const reactAppURL = isProduction
  ? process.env.REACT_APP_URL_PROD
  : process.env.REACT_APP_URL_DEV

export const googleAuthURL = isProduction
  ? process.env.REACT_APP_GOOGLE_AUTH_URL_PROD
  : process.env.REACT_APP_GOOGLE_AUTH_URL_DEV

export const githubAuthURL = isProduction
  ? process.env.REACT_APP_GITHUB_AUTH_URL_PROD
  : process.env.REACT_APP_GITHUB_AUTH_URL_DEV
