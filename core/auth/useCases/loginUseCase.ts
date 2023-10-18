import { IAuthStorePort } from '../ports/IAuthStorePort'
import { IRouterPort, IToastServicePort } from '../../shared'
import { IAuthApiServicePort } from '../ports/IAuthApiServicePort'

// import { toastService } from '@core/toast';

export interface LoginCommand {
  email: string
  password: string
  rememberMe: boolean
}

export const loginUseCase = async (command: {
  data: LoginCommand
  authStore: IAuthStorePort
  router: IRouterPort
  authApiService: IAuthApiServicePort
  toastService: IToastServicePort
}) => {
  try {
    console.log(command)
    command.authStore.setLoading(true)
    await sleep(1000)
    const auth = await command.authApiService.login(command.data)
    await sleep(1000)
    command.authStore.saveAuth(auth)
    await command.router.navigate('/dashboard', true)
    //router go to dashboard page
  } catch (e) {
    command.toastService.createSuccessToaster(
      e ? e.toString() : 'errore',
      'ERROR'
    )
  } finally {
    command.authStore.setLoading(false)
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
