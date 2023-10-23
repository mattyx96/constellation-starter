import React, { useState } from 'react'
import { Spinner } from 'nebula-ds'
import grid from '@/assets/1548260.svg'
import logo from '@/assets/fake_logo.png'
import { useTailwindTheme } from '@/hooks/useTailwindTheme'
import { useStore } from 'zustand'
import { authStore } from '@/infrastructure/store/authStore'
import { toastService } from '@/infrastructure/toast/toastService'
import { authApiService } from '@/infrastructure/api/auth-service/authApiService'
import { Router } from '@/infrastructure/router/router'
import { AuthDispatcher, LoginCommand } from 'core/auth'

function LoginPage() {
  const [loginForm, setLoginForm] = useState<LoginCommand>({
    email: 'kminchelle',
    password: '0lelplR',
    rememberMe: false
  })

  const authDispatcher = new AuthDispatcher({
    authStore: authStore.getState(),
    router: Router,
    authApiService,
    toastService
  })

  const theme = useTailwindTheme()
  const auth = useStore(authStore)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    })
  }
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e)
    try {
      await authDispatcher.login(loginForm)
    } catch (e) {
      alert(e)
    }
  }

  return (
    <>
      <img className={'absolute inset-x-0 bottom-0 z-0'} src={grid} />
      <div className="relative flex flex-col items-start justify-center">
        <h1 className="absolute -top-12 font-orbitron text-4xl">Login</h1>
        <form
          className="flex flex-col gap-2 rounded-bl-[7rem] border border-black bg-white p-5"
          onSubmit={handleOnSubmit}
        >
          <div className="mb-8 flex items-center justify-center">
            <img className={'flex w-44 justify-center'} src={logo} />
          </div>
          <div className="flex items-center justify-between gap-2">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              className="rounded-bl-lg p-1 focus:bg-cta-2/50"
              value={loginForm.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              className="rounded-bl-lg p-1 focus:bg-cta-2/50"
              value={loginForm.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label>Remember me:</label>
            <input
              type="checkbox"
              name="rememberMe"
              className="peer relative h-4 w-4 shrink-0 appearance-none rounded-bl bg-white checked:border-0 checked:bg-black"
              checked={loginForm.rememberMe}
              onChange={(e) =>
                setLoginForm({ ...loginForm, rememberMe: e.target.checked })
              }
            />
          </div>
          <button
            disabled={auth.loading}
            className={`mt-8 flex h-12 items-center justify-center rounded-r-full border border-black bg-cta p-2 font-orbitron hover:bg-cta-selected focus:ring-1 focus:ring-cta-selected disabled:border-disabled disabled:bg-cta-selected/70`}
            type="submit"
          >
            {auth.loading ? <Spinner /> : 'Submit'}
          </button>
        </form>
      </div>
    </>
  )
}

export { LoginPage }
