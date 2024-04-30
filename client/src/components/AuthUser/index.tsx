import { Link, TextField, Typography } from '@mui/material'
import { FormContainer, PageContainer } from './style'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  useLoginMutation,
  useRegistrationMutation,
} from '../../__redux__/services/user'
import { setIsAuth, setUser } from '../../__redux__/slice/userSlice'
import { jwtDecode } from 'jwt-decode'
import { LoadingButton } from '@mui/lab'

const AuthUser = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isRegistrationForm = location.pathname === '/registration'

  const [login, setLogin] = useState('')
  const [fio, setFio] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const [registration, { isLoading }] = useRegistrationMutation()
  const [authorization] = useLoginMutation()

  const clearForm = () => {
    setLogin('')
    setFio('')
    setPhone('')
    setEmail('')
    setPassword('')
  }

  const handleSubmit = () => {
    if (isRegistrationForm) {
      registration({ login, fio, phone, email, password }).then(
        (response: any) => {
          const user = jwtDecode(response.data)
          console.log('registration', user)
          dispatch(setUser(user))
          dispatch(setIsAuth(true))
          clearForm()
          navigate('/applications')
        }
      )
    } else {
      authorization({ login, password }).then((response: any) => {
        const user = jwtDecode(response.data)
        console.log('registration', user)
        dispatch(setUser(user))
        dispatch(setIsAuth(true))
        clearForm()
        navigate('/applications')
        console.log(user)
      })
    }
  }

  return (
    <PageContainer>
      <FormContainer>
        <Typography sx={{ fontSize: '20px', fontWeight: '450' }}>
          {isRegistrationForm ? 'Регистрация' : 'Вход'}
        </Typography>
        {isRegistrationForm && (
          <>
            <TextField
              onChange={(event) => setLogin(event.target.value)}
              type="text"
              label="Логин"
            />
            <TextField
              onChange={(event) => setFio(event.target.value)}
              type="text"
              label="ФИО"
            />
            <TextField
              onChange={(event) => setPhone(event.target.value)}
              type="text"
              label="Номер телефона"
            />
            <TextField
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              label="Email"
            />
            <TextField
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              label="Пароль"
            />
          </>
        )}
        {!isRegistrationForm && (
          <>
            <TextField
              onChange={(event) => setLogin(event.target.value)}
              type="text"
              label="Логин"
            />
            <TextField
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              label="Пароль"
            />
          </>
        )}
        <LoadingButton
          loading={isLoading}
          onClick={handleSubmit}
          variant="contained"
          sx={{ p: '8px 16px' }}
        >
          {isRegistrationForm ? 'Зарегистрироваться' : 'Войти'}
        </LoadingButton>
        <Typography>
          {isRegistrationForm ? 'Уже есть аккаунт? ' : 'Нет аккаунта? '}
          <Link
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              navigate(isRegistrationForm ? '/login' : '/registration')
            }
          >
            {isRegistrationForm ? 'Войти' : 'Зарегистрироваться'}
          </Link>
        </Typography>
      </FormContainer>
    </PageContainer>
  )
}

export default AuthUser
