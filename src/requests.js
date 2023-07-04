export const getShowsByKey = async (key) => {
    return fetch(`https://api.tvmaze.com/search/shows?q=${key}`).then(res => res.json());
}

export const getShowById = async (id) => {
    return fetch(`https://api.tvmaze.com/shows/${id}?embed=cast`).then(res => res.json());
}