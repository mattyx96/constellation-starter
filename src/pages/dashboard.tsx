import { useRouter } from '@/infrastructure/router/router'
import { Button } from 'nebula-ds'

export const Dashboard = () => {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-5">
      <h1>Dashboard</h1>
      <Button onClick={() => router.navigate('/login')} variant={'outlined'}>
        go to Login
      </Button>
    </div>
  )
}
