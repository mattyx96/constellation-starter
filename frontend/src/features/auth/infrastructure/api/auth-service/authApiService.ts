import { AxiosResponse } from 'axios';
import { LoginResponseDto } from '@/features/auth/infrastructure/api/auth-service/dtos/Responses';
import { LoginRequestDto } from '@/features/auth/infrastructure/api/auth-service/dtos/Requests';
import { fromLoginResponseDTOToAuth } from '@/features/auth/infrastructure/api/auth-service/adapters/fromLoginResponseDTOToAuth';
import { HttpClient } from '@/infrastructure/api/HttpClient.ts';
import { Singleton, auth } from 'core';

@Singleton
class AuthApiService implements auth.IAuthApiServicePort {
  async login(command: auth.LoginCommand): Promise<auth.Auth> {
    try {
      const response = await HttpClient.post<AxiosResponse<LoginResponseDto>, AxiosResponse, LoginRequestDto>(
        'https://dummyjson.com/auth/login',
        {
          username: command.email,
          password: command.password,
        },
      );
      return fromLoginResponseDTOToAuth(response.data);
    } catch (error) {
      throw new Error('error from api: ' + error);
    }
  }

  logout(): Promise<void> {
    return Promise.resolve(undefined);
  }

  signup(command: unknown): Promise<void> {
    console.log(command);
    return Promise.resolve(undefined);
  }
}

export { AuthApiService };
