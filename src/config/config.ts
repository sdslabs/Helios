const isProduction = true
export const baseURL = isProduction ? 'https://api.quizio.sdslabs.co' : 'http://localhost:4000'
export const ipURL = 'https://api.ipify.org/?format=json'
export const reactAppURL = isProduction ? 'https://quizio.sdslabs.co' : 'http://localhost:3000'
export const googleAuthURL = isProduction
  ? process.env.REACT_APP_GOOGLE_AUTH_URL_PROD
  : process.env.REACT_APP_GOOGLE_AUTH_URL_DEV
export const githubAuthURL = isProduction
  ? process.env.REACT_APP_GITHUB_AUTH_URL_PROD
  : process.env.REACT_APP_GITHUB_AUTH_URL_DEV
