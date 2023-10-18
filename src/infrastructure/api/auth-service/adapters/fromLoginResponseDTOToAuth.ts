import { LoginResponseDto } from '@features/auth/api/types/Responses'
import { Auth } from '../../../../../core'

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
