export * from "./config";

import { IDependencies, IResolvedDependencies } from "./config/IDependencies";
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
  private readonly container = new DependencyContainer();
  public readonly services: IResolvedDependencies;

  public constructor(services?: Partial<IResolvedDependencies> & S) {
    const baseServices = this.container.resolveAll();
    const mergedServices = {
      ...baseServices,
      ...(services || {}),
    } as IResolvedDependencies & S;

    this.services = new Proxy(mergedServices, {
      get: (target, prop: string | symbol) => {
        // If the property exists in the merged services (e.g. injected mocks), return it
        if (services && prop in (services as object)) {
          return (services as Record<string | symbol, unknown>)[prop];
        }

        // Otherwise, resolve it live from the container if it's a known dependency
        if (typeof prop === "string") {
          try {
            return this.container.resolve(prop as keyof IDependencies);
          } catch {
            // Ignore error if not in container
          }
        }

        return (target as Record<string | symbol, unknown>)[prop];
      },
    });
  }
}
