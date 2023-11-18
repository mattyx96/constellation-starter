import { IDependencies } from './IDependencies'
import { Singleton } from '../misc'

@Singleton
export class DependencyContainer {
  private dependencyMap: IDependencies = {} as IDependencies

  constructor() {}

  public setDependencies(dependencies: IDependencies) {
    this.dependencyMap = { ...this.dependencyMap, ...dependencies }
  }

  public resolve<T extends keyof IDependencies>(
    key: T
  ): ReturnType<IDependencies[T]['resolve']> {
    if (!this.dependencyMap[key]) {
      throw new Error(`Dependency ${key} is not registered.`)
    }
    switch (key) {
      default: {
        return this.dependencyMap[key]?.resolve() as ReturnType<
          IDependencies[T]['resolve']
        >
      }
    }
  }
}
