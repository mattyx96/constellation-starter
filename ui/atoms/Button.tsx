import React, { PropsWithChildren } from 'react'

interface Props {
  variant: 'cta' | 'cta2' | 'outlined'
  className?: string
}

export const Button = (props: PropsWithChildren<Props>) => {
  const defaultClasses =
    'flex h-16 w-full items-center justify-center border border-black p-2 font-orbitron focus:ring-1 focus:ring-cta-selected disabled:border-disabled active:appearance-none active:border-cta-selected'

  const derivedClasses: { [K in Props['variant']]: string } = {
    cta: 'bg-cta rounded-r-full min-w-[10rem]',
    cta2: 'bg-cta-2',
    outlined: ''
  }

  return (
    <button
      className={`
        ${defaultClasses} 
        ${derivedClasses[props.variant]}
    `}
    >
      {props.children}
    </button>
  )
}
