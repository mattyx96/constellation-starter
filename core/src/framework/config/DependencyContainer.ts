import {
  IDependencies,
  IResolvedDependencies,
  IResolvedDependency,
} from "./IDependencies";
import { Singleton } from "../../misc";
import { getTypedObjectKeys } from "../../misc/utils/typescript";

@Singleton
export class DependencyContainer {
  private dependencyMap: IDependencies = {} as IDependencies;

  constructor() {}

  public setDependencies(dependencies: IDependencies) {
    this.dependencyMap = { ...this.dependencyMap, ...dependencies };
  }

  public resolveAll(): IResolvedDependencies {
    const resolvedDependencies = {} as IResolvedDependencies;

    getTypedObjectKeys(this.dependencyMap).forEach((key) => {
      resolvedDependencies[key] = this.resolve(key) as never;
    });

    return resolvedDependencies;
  }

  public mergeDependencies<
    T extends Partial<IResolvedDependencies> | object | undefined,
  >(dependencies: T) {
    return {
      ...this.resolveAll(),
      ...(dependencies || {}),
    };
  }

  public resolve<T extends keyof IDependencies>(
    key: T,
  ): IResolvedDependency<T> {
    if (!this.dependencyMap[key]) {
      throw new Error(`Dependency ${key} is not registered.`);
    } else {
      return this.dependencyMap[key]?.resolve() as IResolvedDependency<T>;
    }
  }
}
