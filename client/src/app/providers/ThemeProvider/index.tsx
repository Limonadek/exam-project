import { CssBaseline, ThemeProvider as ThemeProviderMui } from '@mui/material'
import { ReactNode } from 'react'
import theme from './theme.ts'

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <ThemeProviderMui theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProviderMui>
  )
}