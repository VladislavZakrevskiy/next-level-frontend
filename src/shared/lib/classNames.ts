type Mods = Record<string, boolean | string>

export const cn = (cls: string, mods?: Mods, additional?: string[]): string => {
  return [
    cls,
    ...additional.filter(Boolean),
    Object.entries(mods)
      .filter(([key, value]) => value)
      .map(([key, value]) => key)
    ].join(' ')
}
