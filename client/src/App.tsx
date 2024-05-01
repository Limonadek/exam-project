import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ErrorPage } from './pages/ErrorPage'
import { MyApplicationsPage } from './pages/MyApplicationsPage'
import { CreateApplicationPage } from './pages/CreateApplicationPage'
import AuthUser from './components/AuthUser'
import { useDispatch } from 'react-redux'
import { setUser } from './__redux__/slice/userSlice'
import { useCheckUserQuery } from './__redux__/services/user'
import { LoadingSpinnerPage } from './pages/LoadingSpinnerPage'
import ApplicationDetails from './pages/ApplicationDetail'
import { MainPage } from './pages/MainPage'

function App() {
  const dispatch = useDispatch()
  const { data, isLoading } = useCheckUserQuery({});

  if (isLoading) {
    return <LoadingSpinnerPage />
  }
  if (!isLoading && data) {
    dispatch(setUser(data.token))
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/login" element={<AuthUser />} />
          <Route path="/registration" element={<AuthUser />} />
          <Route
            path="/"
            element={<MainPage />}
            errorElement={<ErrorPage />}
            children={[
              <Route
                key="my-applications"
                path="/applications"
                element={<MyApplicationsPage />}
              />,
              <Route
                key="create-application"
                path="/applications/create"
                element={<CreateApplicationPage />}
              />,
              <Route
                key="application-details"
                path="/application/:id"
                element={<ApplicationDetails />}
              />,
            ]}
          />
          <Route path="*" element={<ErrorPage notRouting={true} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
