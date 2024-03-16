import React from 'react'
import { Spinner } from 'nebula-ds'
import grid from '@/assets/1548260.svg'
import logo from '@/assets/cosmos-2.svg'
import { AuthDispatcher, LoginCommand } from 'core/features/auth'
import { loginCommandSchema } from 'core/features/auth/useCases/loginUseCase'
import { FormTextInput } from '@/components/molecules/FormTextInput'
import { useForm } from '@/infrastructure/form/useForm'
import { formStore as formStoreAdapter } from '@/infrastructure/store/formStore'
import { useStore } from 'zustand'
import { FieldApi } from '@tanstack/react-form'

function LoginPage() {
  const authDispatcher = new AuthDispatcher()
  const a = FieldApi
  const formStore = useStore(formStoreAdapter)

  const form = useForm<LoginCommand>({
    state: formStore,
    setState: (data) => formStoreAdapter.setState(data),
    onSubmit: async (data) => {
      await authDispatcher.login(data)
    },
    schema: loginCommandSchema
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.changeData({
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await form.submit()
  }

  return (
    <div className="container mx-auto flex min-h-screen w-screen flex-col items-center justify-center p-2">
      <img
        className={'absolute inset-x-0 bottom-0 z-0'}
        src={grid}
        alt="grid"
      />
      <form
        className="relative flex w-full max-w-xs flex-col gap-2 overflow-visible rounded-bl-[7rem] border border-black bg-white p-5 scrollbar-hide"
        onSubmit={handleSubmit}
      >
        <h1 className="absolute -top-12 left-0 font-orbitron text-4xl">
          Login
        </h1>
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
          <label>Remember me:</label>
          <input
            type="checkbox"
            name="rememberMe"
            disabled={form.state.isSubmitting}
            className="checked: peer relative size-4 shrink-0 appearance-none rounded-bl bg-white checked:border checked:border-transparent checked:bg-black"
            checked={form.state.data.rememberMe}
            onChange={(e) =>
              form.changeData({
                rememberMe: e.target.checked
              })
            }
          />
        </div>
        <button
          disabled={form.state.isSubmitting}
          className={`mt-8 flex h-12 items-center justify-center rounded-r-full border border-black bg-cta-2 p-2 font-orbitron hover:bg-cta focus:ring-1 focus:ring-cta-selected disabled:border-disabled disabled:bg-cta-selected/70`}
          type="submit"
        >
          {form.state.isSubmitting ? <Spinner /> : 'Submit'}
        </button>
        <pre className="w-full">{JSON.stringify(form.state, null, 2)}</pre>
      </form>
    </div>
  )
}

export { LoginPage }
