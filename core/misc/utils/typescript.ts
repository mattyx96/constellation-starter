export const getTypedObjectKeys = <T extends object>(obj: T) => {
  return Object.keys(obj) as Array<keyof T>
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
