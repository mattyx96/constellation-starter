import { DependencyContainer } from '../../../framework/config/DependencyContainer'
import { z } from 'zod'
import { UseCaseCommand } from '../../../framework/entities'

export const loginCommandSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  rememberMe: z.boolean()
})

export type LoginCommand = z.infer<typeof loginCommandSchema>

const container = new DependencyContainer()

export const loginUseCase = async (command: UseCaseCommand<LoginCommand>) => {
  console.log('resolving loginUseCase Dependencies')

  const { authStore, router, toastService, authApiService } =
    container.mergeDependencies(command.services)

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
