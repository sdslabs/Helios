import { extendTheme } from '@chakra-ui/react'
import { StepsTheme as Steps } from 'chakra-ui-steps'

const theme = extendTheme({
  colors: {
    brand: '#593C8F',
    v1: '#EBE7F2',
    v6: '#604195',
    n6: '#939393',
    accentBlack: '#191919',
    yellowMarkedForReview: '#ffb45c',
    green: '#75c673',
    v5: '#775BA4',
    grey: '#B3B3B3',
    markedForReviewBubbleBorder: '#FF8900',
    answeredBubbleBorder: '#27A624',
    N6: '#939393',
    labelColor: '#27A624',
    lableBgColor: '#E5F4E5',
    unanswered: '#AD9EC9',
    answered: '#22C35E',
    markedForReview: '#ECC94B',
    answeredAndMarkedForReview: '#1DA1F2',
    gridColor: '#EFECF4',
    listItemColor1: '#F9F8FB',
    listItemColor2: '#FEFEFE',
  },
  fonts: {
    heading: 'Open Sans',
    body: 'Open Sans',
  },
  components: {
    Steps
  },
  shadows: {
    depth: 'inset 0 4px 4px 0 rgba(0,0,0,0.1)',
  },
})

export default theme
