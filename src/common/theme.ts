import { extendTheme } from '@chakra-ui/react'
import { StepsTheme as Steps } from "chakra-ui-steps";

const theme = extendTheme({
  colors: {
    brand: '#593C8F',
    v1: '#EBE7F2',
    v6: '#604195',
    accentBlack: '#191919',
  },
  fonts: {
    heading: 'Open Sans',
    body: 'Open Sans',
  },
  components: {
    Steps,
  },
})

export default theme
