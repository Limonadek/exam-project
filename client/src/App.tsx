import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { ErrorPage } from './pages/ErrorPage'
import { MyApplicationsPage } from './pages/MyApplicationsPage'
import { CreateApplicationPage } from './pages/CreateApplicationPage'
import AuthUser from './components/AuthUser'
import { Header } from './components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { setIsAuth, setUser } from './__redux__/slice/userSlice'
import { useCheckUserQuery } from './__redux__/services/user'
import { LoadingSpinnerPage } from './pages/LoadingSpinnerPage'
import ApplicationDetails from './pages/ApplicationDetail'

function App() {
  const dispatch = useDispatch()
  const { data, isLoading } = useCheckUserQuery({})

  const { isAuth } = useSelector((state) => state.userSlice)

  console.log(isAuth)

  if (isLoading) {
    return <LoadingSpinnerPage />
  }
  if (!isLoading && data) {
    const decodeUser = jwtDecode(data.token)
    console.log(decodeUser)
    dispatch(setUser(decodeUser))
    dispatch(setIsAuth(true))
  }

  return (
    <>
      <BrowserRouter>
        {location.pathname !== '/login' &&
          location.pathname !== '/registration' && <Header />}
        <Routes>
          <Route
            path="/"
            element={
              isAuth ? (
                <Navigate to="/applications" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<AuthUser />} />
          <Route path="/registration" element={<AuthUser />} />
          {isAuth === true && (
            <>
              <Route path="/applications" element={<MyApplicationsPage />} />
              <Route
                path="/applications/create"
                element={<CreateApplicationPage />}
              />
              <Route path="/application/:id" element={<ApplicationDetails />} />
            </>
          )}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
