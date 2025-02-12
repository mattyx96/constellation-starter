export * from "./config";

import { IResolvedDependencies } from "./config/IDependencies";
import { DependencyContainer } from "./config/DependencyContainer";

export interface UseCaseCommand<
  T,
  S extends NonNullable<unknown> | undefined = NonNullable<unknown>,
> {
  data: T;
  services?: Partial<IResolvedDependencies> & S;
}

export abstract class FeatureClass<
  S extends NonNullable<unknown> | undefined = NonNullable<unknown>,
> {
  container = new DependencyContainer();
  services: IResolvedDependencies = this.container.resolveAll();

  public constructor(services?: Partial<IResolvedDependencies> & S) {
    this.services = this.container.mergeDependencies(services);
  }
}
