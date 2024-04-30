import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#4640DE',
    },
    secondary: {
      main: '#25324B',
    },
    // background: {
    //   default: '#fcfcfc',
    // },
  },
  typography: {
    fontFamily: `"Montserrat", sans-serif`,
  },
  // breakpoints: {
  //   values: {
  //     xs: 550,
  //     sm: 1176,
  //     md: 1750,
  //     lg: 1921,
  //     xl: 2049,
  //   },
  // },
})

export default theme
