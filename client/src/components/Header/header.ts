import styled from 'styled-components'
import { Tab, Typography } from '@mui/material'

export const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  //border-bottom: 2px solid #e6e8ec;
`

export const LogoTypography = styled(Typography)`
  &.MuiTypography-root {
    font-size: 18px;
    font-weight: 450;
  }
`

export const HeaderTab = styled(Tab)`
  &.MuiButtonBase-root {
    color: #25324b;
  }
`
