import { isLoggedUseCase } from '@core/features/auth/useCases/isLoggedUseCase'
import { Singleton } from '@core/misc'
import { sleep } from '@core/misc/utils/typescript'
import { FeatureClass } from '@core/framework'
import { z } from 'zod'

@Singleton
export class AuthFeature extends FeatureClass {
  login = async (command: LoginCommand) => {
    try {
      await sleep(1000)
      const auth = await this.services.authApiService.login(command)
      await sleep(1000)
      this.services.authStore.saveAuth(auth)
      await this.services.router.navigate('/dashboard', true)
    } catch (e) {
      this.services.toastService.createSuccessToaster('Error: ' + e)
    }
  }

  isLogged = async () => {
    return isLoggedUseCase()
  }
}

export const loginCommandSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  rememberMe: z.boolean()
})

export type LoginCommand = z.infer<typeof loginCommandSchema>
