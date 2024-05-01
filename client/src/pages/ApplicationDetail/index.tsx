import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  useGetAllQuery,
  useGetByUserQuery,
} from '../../__redux__/services/application.ts'
import { userSelector } from '../../__redux__/selectors/userSelectors.ts'

function ApplicationDetails() {
  const { id } = useParams()
  const user = useSelector(userSelector)

  const { data } =
    user.role === 'USER' ? useGetByUserQuery(user.id) : useGetAllQuery({})
  let application
  if (data) {
    application = data.application.find((app: any) => app.id.toString() === id)
  }

  return (
    <div>
      {application ? (
        <div>
          <h1>Детали заявления</h1>
          <p>Номер автомобиля: {application.carNumber}</p>
          <p style={{ overflowWrap: 'anywhere' }}>Описание: {application.description}</p>
          <p>Статус: {application.status}</p>
        </div>
      ) : (
        <p>Заявление не найдено.</p>
      )}
    </div>
  )
}

export default ApplicationDetails
