import { ZodFormattedError, ZodSchema } from 'zod';
import { formService } from 'core';

export class FormState<T> implements formService.IFormStatePort<T> {
  data: T;
  errors: ZodFormattedError<T>;
  isValidated = false;
  isValid = false;
  isSubmitting: boolean = false;

  constructor(data: T) {
    this.data = data;
    this.errors = { _errors: [] } as ZodFormattedError<T>;
  }
}

export interface FormServiceOptions<T> {
  state: FormService<T>['state'];
  setState: FormService<T>['setState'];
  schema: FormService<T>['schema'];
  onSubmit: FormService<T>['onSubmit'];
}

export class FormService<T> implements formService.IFormServicePort<T> {
  readonly state: FormState<T>;
  private readonly setState: (newState: FormState<T>) => void;
  private readonly onSubmit: (formData: T) => Promise<void>;
  private schema: ZodSchema<T>;

  constructor(options: {
    state: FormService<T>['state'];
    setState: FormService<T>['setState'];
    schema: FormService<T>['schema'];
    onSubmit: FormService<T>['onSubmit'];
  }) {
    this.state = options.state;
    this.setState = options.setState;
    this.schema = options.schema;
    this.onSubmit = options.onSubmit;
  }

  validate = (results: { isValidated: boolean; errors: ZodFormattedError<T> }) => {
    const newState = { ...this.state };
    newState.isValidated = results.isValidated;
    newState.errors = results.errors;
    this.setState(newState);
    return {
      isValidated: results.isValidated,
      errors: results.errors,
    };
  };

  private addValidationToState = (state: FormState<T>): FormState<T> => {
    const newState = { ...state };
    const res = this.schema.safeParse(state.data);
    newState.isValid = res.success;
    newState.isValidated = true;
    if (res.success) {
      newState.errors = { _errors: [] } as ZodFormattedError<T>;
    } else {
      newState.errors = res.error.format();
    }
    return newState;
  };

  public changeData = async (newPartialData: Partial<T>) => {
    const newData = { ...this.state.data, ...newPartialData };
    if (this.state.isValidated) {
      const newState = this.addValidationToState({
        ...this.state,
        data: newData,
      });
      this.setState(newState);
    } else {
      this.setState({ ...this.state, data: newData });
    }
  };

  public submit = async () => {
    const validatedState = this.addValidationToState(this.state);
    this.setState(validatedState);
    if (validatedState.isValid) {
      this.setState({ ...this.state, isSubmitting: true });
      await this.onSubmit(this.state.data);
      this.setState({ ...this.state, isSubmitting: false });
    }
  };
}
