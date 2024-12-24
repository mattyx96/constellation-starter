import { LoginResponseDto } from '@/features/auth/infrastructure/api/auth-service/dtos/Responses';
import { auth } from 'core';

export const fromLoginResponseDTOToAuth = (
  data: LoginResponseDto,
): auth.Auth => {
  return {
    token: data.token,
    user: {
      email: data.email,
      firstName: data.firstName,
      image: data.image,
      lastName: data.lastName,
    },
  };
};
