import {extendTheme} from 'native-base';

export const theme = extendTheme({
  colors: {
    primary: {
      white: '#ffffff',
      black: '#000000',
      light: '#fff6f2',
      dark: '#130500',
      200: '#ffdacc',
      300: '#ffc7b3',
      400: '#ffb599',
      500: '#ffa280',
      600: '#ff8f66',
      700: '#ff7d4d',
      800: '#ff6a33',
      900: '#ff581a',
    },
    secondary: {
      light: '#e5f8ff',
      dark: '#001319',
      200: '#ccf1ff',
      300: '#b3eaff',
      400: '#99e3ff',
      500: '#80ddff',
      600: '#66d6ff',
      700: '#4dcfff',
      800: '#33c8ff',
      900: '#1ac1ff',
    },
  },
});


export const lnbitsUserUrl = "https://legend.lnbits.com/usermanager/api/v1"
export const lnbitsUrl = "https://legend.lnbits.com/api/v1"
export const lnbitsInvoiceKey = "150a396709934a9ea2d0f6ee8b11b3fa"
export const headers = {"X-Api-Key": lnbitsInvoiceKey}

export const userId = "dee1b3af9cac43ba9980a49a291524a2"
export const userWalletId = "d5a2481cfaea4dd5baafa50d563bbf0d"
export const userAdminKey = "73845e969e1d400c89215dafe2dac682"
export const userInvoiceKey = "a28a9f9ec8a4424783738e06a965bdf5"

const link = "https://legend.lnbits.com/wallet?usr=51b170b5296941d4bfd2c5cb553e117c&wal=58ce3d3b5fb74678935adfb8f35a50b8"