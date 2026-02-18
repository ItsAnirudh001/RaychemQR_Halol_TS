export type AppState = {
    loading:boolean
}

export type AppStore = AppState & {
    setLoading:(value:boolean) => void
}