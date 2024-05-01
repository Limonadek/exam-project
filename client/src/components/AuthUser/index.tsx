import { Link, TextField, Typography } from '@mui/material'
import { FormContainer, PageContainer } from './style'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  useLoginMutation,
  useRegistrationMutation,
} from '../../__redux__/services/user'
import { setUser } from '../../__redux__/slice/userSlice'
import { LoadingButton } from '@mui/lab'

interface errorsProps {
  login: string,
  fio: string,
  phone: string,
  email: string,
  password: string,
  [key: string]: string
}

const initialErrors = {
  fio: '',
  login: '',
  phone: '',
  email: '',
  password: ''
}

const AuthUser = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isRegistrationForm = location.pathname === '/registration'

  const [login, setLogin] = useState('')
  const [fio, setFio] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState<errorsProps>(initialErrors)

  const dispatch = useDispatch()
  const [registration, { isLoading }] = useRegistrationMutation()
  const [authorization] = useLoginMutation()

  const clearForm = () => {
    setLogin('')
    setFio('')
    setPhone('')
    setEmail('')
    setPassword('')
    setErrors({} as any)
  }

  const validateLogin = (login: string) => {
    if (!login) {
      errors.login = 'Заполните поле'
      setErrors({...errors});
    } else {
      errors.login = '';
      setErrors({...errors});
    }
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      errors.email = 'Введите корректный email адресс';
      setErrors({...errors});
    } else {
      errors.email = '';  
      setErrors({...errors});
    }
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{11}$/
    if (!phoneRegex.test(phone)) {
      errors.phone = 'Введите корректный номер телефона (11 цифр)';
      setErrors({...errors});
    } else {
      errors.phone = '';
      setErrors({...errors});
    }
  }

  const validateFio = (fio: string) => {
    if (fio.trim().split(' ').length != 3) {
      errors.fio = 'Введите ФИО, состоящее из трех слов';
      setErrors({...errors});
    } else {
      errors.fio = '';
      setErrors({...errors});
    }
  }

  const validatePassword = (password: string) => {
    if (!password) {
      errors.password = 'Заполните поле'
      setErrors({...errors})
    } else {
      errors.password = '';
      setErrors({...errors});
    }
  }

  const handleSubmit = () => {
    if (isRegistrationForm) {
      validateLogin(login);
      validatePassword(password);
      validateEmail(email)
      validatePhone(phone)
      validateFio(fio)
    } else {
      validateLogin(login);
      validatePassword(password);
    }

    for (let key in errors) {
      if (errors[key] !== '') {
        return
      }
    }

    if (isRegistrationForm) {
      registration({ login, fio, phone, email, password }).then(
        (response: any) => {
          dispatch(setUser(response.data))
          clearForm()
          navigate('/applications')
        }
      )
    } else {
      authorization({ login, password }).then((response: any) => {
        dispatch(setUser(response.data))
        clearForm()
        navigate('/applications')
      })
    }
  }

  return (
    <PageContainer>
      <FormContainer>
        <Typography sx={{ fontSize: '20px', fontWeight: '450' }}>
          {isRegistrationForm ? 'Регистрация' : 'Вход'}
        </Typography>
        <TextField
          onChange={(event) => setLogin(event.target.value)}
          type="text"
          label="Логин"
          onBlur={(e) => validateLogin(e.target.value)}
          error={!!errors.login}
          helperText={errors.login}
        />
        <TextField
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          label="Пароль"
          onBlur={(e) => validatePassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />
        {isRegistrationForm && (
          <>
            <TextField
                onChange={(event) => setFio(event.target.value)}
                type="text"
                label="ФИО"
                onBlur={(e) => validateFio(e.target.value)}
                error={!!errors.fio}
                helperText={errors.fio}
              />
              <TextField
                onChange={(event) => setPhone(event.target.value)}
                type="text"
                label="Номер телефона"
                onBlur={(e) => validatePhone(e.target.value)}
                error={!!errors.phone}
                helperText={errors.phone}
              />
              <TextField
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                label="Email"
                onBlur={(e) => validateEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
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
            onClick={() => {
              clearForm()
              navigate(isRegistrationForm ? '/login' : '/registration')
            }}
          >
            {isRegistrationForm ? 'Войти' : 'Зарегистрироваться'}
          </Link>
        </Typography>
      </FormContainer>
    </PageContainer>
  )
}

export default AuthUser
