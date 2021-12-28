import { Button, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { authRemoved } from '@store/slices/auth'
import { useAuthSession } from '@hooks/useAuthSession'
import useLogout from '@hooks/useLogout'

const Home = () => {
  const user = useAuthSession()
  const { token } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const logout = useLogout()
  const handleOnClick = (e) => {
    logout()
  }
  return !user ? null : (
    <>
      <Typography variant="h1">{token?.name}</Typography>
      <Button onClick={handleOnClick}>Logout</Button>
    </>
  )
}

export default Home
