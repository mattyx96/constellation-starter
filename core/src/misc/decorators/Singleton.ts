/* eslint-disable @typescript-eslint/no-explicit-any */
const instances = new WeakMap<new (...args: any[]) => any, any>();

export function Singleton<T extends new (...args: any[]) => any>(ctr: T): T {
  return new Proxy(ctr, {
    construct(target, args) {
      if (!instances.has(target)) {
        instances.set(target, Reflect.construct(target, args));
      }
      return instances.get(target);
    },
  }) as T;
}
