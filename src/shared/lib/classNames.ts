type Mods = Record<string, boolean | string>

export const cn = (cls: string, mods: Mods, additional: string[]): string => {
	return [
		cls,
		...additional,
		Object.entries(mods)
			.filter(([key, value]) => value)
			.map(([key, value]) => key),
	].join(' ')
}
