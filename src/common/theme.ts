import { extendTheme } from '@chakra-ui/react'
import { StepsTheme as Steps } from 'chakra-ui-steps'

const theme = extendTheme({
  colors: {
    brand: '#593C8F',
    v1: '#EBE7F2',
    v6: '#604195',
    accentBlack: '#191919',
    yellowMarkedForReview: '#ffb45c',
    green: '#75c673',
    v5: '#775BA4',
    grey: '#B3B3B3',
    markedForReviewBubbleBorder: '#FF8900',
    answeredBubbleBorder: '#27A624',
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
