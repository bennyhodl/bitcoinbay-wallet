type Store = {
    id: number
    title: string,
    description: string,
    latitude: number,
    longitude: number
}

export const stores: Store[] = [
    {
        id: 1,
        title: "Blind Tiger",
        description: "Buy coffee with Bitcoin",
        latitude: 27.93442,
        longitude: -82.48281
    },
    {
        id: 2,
        title: "Bungalow Beach",
        description: "Beachfront vacation paid in Bitcoin",
        latitude: 27.476550,
        longitude: -82.702700
    }
]