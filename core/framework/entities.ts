import { IResolvedDependencies } from './config/IDependencies'

export interface UseCaseCommand<
  T,
  S extends NonNullable<unknown> | undefined = NonNullable<unknown>
> {
  data: T
  services?: Partial<IResolvedDependencies> & S
}
