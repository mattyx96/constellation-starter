import React, { HTMLInputTypeAttribute } from 'react'
import { useTailwindTheme } from '@/hooks/useTailwindTheme'

type Props = {
  type?: HTMLInputTypeAttribute
  name: string
  label: string
  errors?: string[]
  value: string
  disabled?: boolean
  isRequired?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const FormTextInput = (props: Props) => {
  const theme = useTailwindTheme()
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col">
        <label className={`${props.errors?.length ? 'text-error' : ''}`}>
          {props.label} {props.isRequired && '*'}
        </label>
        <input
          type={props.type}
          name={props.name}
          className={`rounded-bl-lg p-1 focus:bg-cta-2/50 disabled:opacity-40 ${
            props.errors?.length ? 'border-2 border-error' : ''
          }`}
          disabled={props.disabled}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
      <span
        className={`${
          props.errors?.length ? '' : 'hidden min-h-[1rem]'
        } w-full text-xs text-error`}
      >
        {props.errors?.length ? props.errors.map((e) => e) : ''}
      </span>
    </div>
  )
}
