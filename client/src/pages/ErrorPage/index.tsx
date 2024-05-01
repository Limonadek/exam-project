import { Button } from '@mui/material'
import { ErrorPageContainer } from './errorPage.ts'
import { useNavigate } from 'react-router-dom'

export const ErrorPage = ({isAuthError, notRouting}: any) => {
  const navigate = useNavigate();
  return (
    <>
      <ErrorPageContainer>
        <h1>Упс!</h1>
        {notRouting ? (
          <p>Страница не найдена</p>
        ) : (
          <p>{isAuthError ? 'Вы не вошли в аккаунт :(' : 'Что то пошло не так'}</p>
        )}
        <Button variant="contained" onClick={() => {
          notRouting ? navigate('/applications') : 
          isAuthError ? navigate('/login') : location.reload()
        }} color="primary">
          {notRouting ? 'Перейти на главную страницу' : 
            isAuthError ? 'перейти на страницу авторизации' : 'Обновить страницу'
          }
        </Button>
      </ErrorPageContainer>
    </>
  )
}
