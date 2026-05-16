import { z } from "zod";
import { Singleton, sleep } from "@/misc";
import { FeatureClass } from "@/framework";

@Singleton
export class AuthFeature extends FeatureClass {
  login = async (command: LoginCommand) => {
    try {
      await sleep(1000);
      const auth = await this.services.authApiService.login(command);
      await sleep(1000);
      this.services.authStore.saveAuth(auth);
      this.services.toastService.createToast("login-successful", "SUCCESS");
      await this.services.router.navigate("/dashboard", true);
    } catch (e) {
      console.log(e);
      this.services.toastService.createToast("Error: " + e, "ERROR");
    }
  };

  isLogged = async () => {
    const token = this.services.authStore.token;
    const user = this.services.authStore.user;
    return Boolean(token !== "" && user);
  };
}

export const loginCommandSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  rememberMe: z.boolean(),
});

export type LoginCommand = z.infer<typeof loginCommandSchema>;
