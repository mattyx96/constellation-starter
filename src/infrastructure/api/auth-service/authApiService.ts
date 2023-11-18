import axios, { AxiosResponse } from 'axios'
import { LoginResponseDto } from '@/infrastructure/api/auth-service/dtos/Responses'
import { LoginRequestDto } from '@/infrastructure/api/auth-service/dtos/Requests'
import { fromLoginResponseDTOToAuth } from '@/infrastructure/api/auth-service/adapters/fromLoginResponseDTOToAuth'
import { Singleton } from 'core/misc'
import { Auth, IAuthApiServicePort, LoginCommand } from 'core/features/auth'

@Singleton
export class AuthApiService implements IAuthApiServicePort {
  async login(command: LoginCommand): Promise<Auth> {
    try {
      const response = await axios.post<
        AxiosResponse<LoginResponseDto>,
        AxiosResponse,
        LoginRequestDto
      >('https://dummyjson.com/auth/login', {
        username: command.email,
        password: command.password
      })
      return fromLoginResponseDTOToAuth(response.data)
    } catch (error) {
      throw new Error('error from api: ' + error)
    }
  }

  logout(): Promise<void> {
    return Promise.resolve(undefined)
  }

  signup(command: any): Promise<void> {
    return Promise.resolve(undefined)
  }
}
