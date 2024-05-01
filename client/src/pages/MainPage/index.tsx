import { Outlet } from "react-router-dom"
import { Header } from "../../components/Header"
import { MainContainer } from "./style"
import { useSelector } from "react-redux"
import { userSelector } from "../../__redux__/selectors/userSelectors"
import { ErrorPage } from "../ErrorPage"

export const MainPage = () => {
  const { isAuth } = useSelector(userSelector)

  return (
    <div>
      <Header />
      <MainContainer>
        {isAuth ? <Outlet /> : <ErrorPage isAuthError={!isAuth} />}
      </MainContainer>
    </div>
  )
}
