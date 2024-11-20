import { LoginResponseDto } from '@/features/auth/infrastructure/api/auth-service/dtos/Responses'
import { Auth } from 'core/features/auth'

export const fromLoginResponseDTOToAuth = (data: LoginResponseDto): Auth => {
  return {
    token: data.token,
    user: {
      email: data.email,
      firstName: data.firstName,
      image: data.image,
      lastName: data.lastName
    }
  }
}
