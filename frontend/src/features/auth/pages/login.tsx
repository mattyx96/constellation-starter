import React from 'react';
import grid from '@/assets/1548260.svg';
import logo from '@/assets/cosmos-2.svg';
import { FormTextInput } from '@/components/molecules/FormTextInput';
import { useForm } from '@/infrastructure/form/useForm';
import { formStore as formStoreAdapter } from '@/features/auth/infrastructure/store/formStore';
import { Button, Paper, Text } from 'nebula-ds-react-library';
import { useZStore } from '@/hooks/useZStore';
import { auth } from 'core';

function LoginPage() {
  const authFeature = new auth.AuthFeature();

  const formStore = useZStore(formStoreAdapter);

  const form = useForm<auth.LoginCommand>({
    state: formStore,
    setState: (data) => formStore.setZState(data),
    onSubmit: async (data) => await authFeature.login(data),
    schema: auth.loginCommandSchema,
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await form.changeData({
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await form.submit();
  };

  return (
    <div className="container mx-auto flex min-h-screen w-screen flex-col items-center justify-center p-2">
      <img className={'absolute inset-x-0 bottom-0 z-0'} src={grid} alt="grid" />
      <form className="w-full max-w-xs" onSubmit={handleSubmit}>
        <Paper
          className="w-full"
          round="lg"
          title="Login"
          renderActions={
            <Button className="mt-8" rounded="R" size="M" disabled={form.state.isSubmitting} type="submit">
              {form.state.isSubmitting ? '<SpinnerComponent />' : 'Submit'}
            </Button>
          }
        >
          <div className="mb-8 flex items-center justify-center">
            <img className={'flex w-32 justify-center'} src={logo} alt="logo" />
          </div>
          <div className="mt-5 flex w-full flex-col items-center justify-between gap-2">
            <FormTextInput
              name="email"
              label="Email"
              errors={form.state.errors.email?._errors}
              disabled={form.state.isSubmitting}
              value={form.state.data.email}
              onChange={handleChange}
              isRequired
            />
          </div>
          <div className="flex w-full items-center justify-between gap-2">
            <FormTextInput
              type="password"
              name="password"
              label="Password"
              errors={form.state.errors.password?._errors}
              disabled={form.state.isSubmitting}
              value={form.state.data.password}
              onChange={handleChange}
              isRequired
            />
          </div>
          <div className="flex items-center gap-2">
            <label>
              <Text variant="body3">Remember me:</Text>
            </label>
            <input
              type="checkbox"
              name="rememberMe"
              disabled={form.state.isSubmitting}
              className="checked:peer relative size-5 shrink-0 appearance-none rounded-sm rounded-bl border border-background-accent-500 bg-transparent checked:border checked:border-transparent checked:bg-primary-500"
              checked={form.state.data.rememberMe}
              onChange={(e) =>
                form.changeData({
                  rememberMe: e.target.checked,
                })
              }
            />
          </div>
          {/*<pre className="w-full">{JSON.stringify(form.state, null, 2)}</pre>*/}
        </Paper>
      </form>
    </div>
  );
}

export { LoginPage };
