/**
 * Cast Source to Target
 * @param {S} source
 * @returns {T extends S} - the casted source to S
 */
export const cast = <S, T extends S>(source: S) => {
  return { ...source } as T
}
