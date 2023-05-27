import { authApiService } from '../../api/authApiService';
import { authRepository } from '../../authRepository';
import { toastService } from '@features/toast';

// import { toastService } from '@features/toast';

export interface LoginCommand {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const loginUseCase = async (command: LoginCommand) => {
  try {
    authRepository.setLoading(true);
    const auth = await authApiService.login(command);
    authRepository.saveAuth(auth);
    //router go to dashboard page
  } catch (e) {
    toastService.createSuccessToaster(e ? e.toString() : 'errore', 'ERROR');
  } finally {
    authRepository.setLoading(false);
  }
};
