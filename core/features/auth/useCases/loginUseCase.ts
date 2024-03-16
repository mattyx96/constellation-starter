import { DependencyContainer } from '../../../config/DependencyContainer'
import { z } from 'zod'

export const loginCommandSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  rememberMe: z.boolean()
})

export type LoginCommand = z.infer<typeof loginCommandSchema>

export const loginUseCase = async (command: { data: LoginCommand }) => {
  console.log('resolving loginUseCase Dependencies')
  const container = new DependencyContainer()
  const authStore = container.resolve('authStore')
  const router = container.resolve('router')
  const toastService = container.resolve('toastService')
  const authApiService = container.resolve('authApiService')

  try {
    console.log(command)
    await sleep(1000)
    const auth = await authApiService.login(command.data)
    await sleep(1000)
    authStore.saveAuth(auth)
    await router.navigate('/dashboard', true)
    //router go to dashboard page
  } catch (e) {
    toastService.createSuccessToaster(e ? e.toString() : 'errore', 'ERROR')
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
