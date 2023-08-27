export const getQueryParams = (
    params: OptionalRecord<string, string>
) => {
    const searchParams = new URLSearchParams(
        location.search
    )
    Object.entries(params).forEach(([param, value]) => {
        if (value !== undefined) {
            searchParams.set(param, value)
        }
    })

    return searchParams
}

export const addQueryParams = (
    params: OptionalRecord<string, string>
) => {
    const searchParams = getQueryParams(params)
    window.history.pushState(
        null,
        '',
        `?${searchParams.toString()}`
    )
}
