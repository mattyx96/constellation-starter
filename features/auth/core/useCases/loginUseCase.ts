import { authApiService } from '../../api/authApiService';
import { authRepository } from '../../authRepository';
import { toastService } from '../../../shared/toast';
import { useRouter } from '@/infrastructure/router/router';

// import { toastService } from '@features/toast';

export interface LoginCommand {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const loginUseCase = async (command: LoginCommand) => {
  const router = useRouter();
  try {
    authRepository.setLoading(true);
    await sleep(1000);
    const auth = await authApiService.login(command);
    await sleep(1000);
    authRepository.saveAuth(auth);
    await router.navigate('/dashboard', true);
    //router go to dashboard page
  } catch (e) {
    toastService.createSuccessToaster(e ? e.toString() : 'errore', 'ERROR');
  } finally {
    authRepository.setLoading(false);
  }
};


function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
