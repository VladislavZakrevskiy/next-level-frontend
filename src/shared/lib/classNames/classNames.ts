export type Mods = Record<string, boolean | string | undefined>

export const cn = (
    cls: string,
    mods: Mods = {},
    additional: Array<string | undefined> = []
): string => {
    return [
        cls,
        ...additional.filter(Boolean),
        Object.entries(mods)
            .filter(([key, value]) => value)
            .map(([key, value]) => key)
            .join(' '),
    ].join(' ')
}
