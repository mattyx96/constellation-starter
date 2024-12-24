import { ZodFormattedError } from 'zod';

export interface IFormStatePort<T> {
  data: T;
  errors: ZodFormattedError<T>;
  isValidated: boolean;
  isValid: boolean;
  isSubmitting: boolean;
}

export interface IFormServicePort<T> {
  state: IFormStatePort<T>;
  submit: () => Promise<void>;
  validate: (results: {
    isValidated: boolean;
    errors: ZodFormattedError<T>;
  }) => void;
  changeData: (newPartialData: Partial<T>) => void;
}
