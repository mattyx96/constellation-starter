import React, { useState } from 'react';
import { authActionDispatcher, authStore, LoginCommand } from '@features/auth';
import { useReactFeatureStore } from '@features/shared';
import { Spinner } from 'ui';
import { toastStore } from '@features/toast';

function App() {
  const [loginForm, setLoginForm] = useState<LoginCommand>({
    email: 'kminchelle',
    password: '0lelplR',
    rememberMe: false,
  });

  const auth = useReactFeatureStore(authStore);
  const toast = useReactFeatureStore(toastStore);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    try {
      await authActionDispatcher.login(loginForm);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <div className='flex justify-center items-center'>
        <form
          className='flex flex-col gap-2 p-5 border rounded-xl bg-[#E3DAC5] bg-opacity-20 backdrop-filter backdrop-blur-xl'
          onSubmit={handleOnSubmit}
        >
          <div className='flex gap-2 justify-between items-center'>
            <label>Email:</label>
            <input
              type='text'
              name='email'
              className='rounded border border-black p-1 bg-orange-400 bg-opacity-50 backdrop-filter backdrop-blur-3xl'
              value={loginForm.email}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 justify-between items-center'>
            <label>Password:</label>
            <input
              type='password'
              name='password'
              className='rounded border border-black p-1 bg-[#E3DAC5]/20'
              value={loginForm.password}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 items-center'>
            <label>Remember me:</label>
            <input
              type='checkbox'
              name='rememberMe'
              checked={loginForm.rememberMe}
              onChange={(e) => setLoginForm({ ...loginForm, rememberMe: e.target.checked })}
            />
          </div>
          <button
            disabled={auth.loading}
            className={`mt-5 bg-red-400 h-12 p-2 rounded text-white hover:bg-red-600 disabled:bg-gray-300 flex justify-center items-center`}
            type='submit'
          >
            {auth.loading ? <Spinner /> : 'Submit'}
          </button>
        </form>
      </div>
      <p>is auth: {authActionDispatcher.isLogged() ? 'true' : 'false'}</p>
      <p>loading : {auth.loading ? 'true' : 'false'}</p>
      {JSON.stringify(auth.user)}
      {JSON.stringify(toast.toasters)}
    </>
  );
}

export default App;
