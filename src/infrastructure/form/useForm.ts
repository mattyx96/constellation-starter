import {
  FormService,
  FormServiceOptions,
  FormState
} from '@/infrastructure/form/FormService'
import { useState } from 'react'

type CommonOptions<T> = Omit<FormServiceOptions<T>, 'state' | 'setState'>

type Options<T> =
  | (CommonOptions<T> & { initialData: T; state?: never; setState?: never })
  | (CommonOptions<T> & {
      state: FormService<T>['state']
      setState: FormService<T>['setState']
      initialData?: never
    })

export const useForm = <T extends Record<string, any>>(options: Options<T>) => {
  const [innerState, setInnerState] = useState<FormState<T>>(
    new FormState<T>(options?.initialData || ({} as T))
  )

  const form = new FormService<T>({
    state: options.state || innerState,
    schema: options.schema,
    setState: options.setState || setInnerState,
    onSubmit: options.onSubmit
  })

  return {
    ...form
  }
}
