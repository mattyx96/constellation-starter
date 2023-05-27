import {IApiPort, LoginCommand} from "../core";
import {Auth} from "../core";
import axios, {AxiosResponse} from "axios"
import {LoginResponseDto} from "./types/Responses";
import {LoginRequestDto} from "./types/Requests";
import {fromLoginResponseDTOToAuth} from "./adapters/fromLoginResponseDTOToAuth";
import {Singleton} from "@features/shared";

@Singleton
class AuthApiService implements IApiPort {
  async login(command: LoginCommand): Promise<Auth> {
    try {
      const response = await axios.post<AxiosResponse<LoginResponseDto>, AxiosResponse, LoginRequestDto>(
        "https://dummyjson.com/auth/login",
        {username: command.email, password: command.password}
      );
      return fromLoginResponseDTOToAuth(response.data);
    } catch (error) {
      throw new Error('error from api: ' + error);
    }
  }

  logout(): Promise<void> {
    return Promise.resolve(undefined);
  }

  signup(command: any): Promise<void> {
    return Promise.resolve(undefined);
  }

}

export const authApiService = new AuthApiService()
